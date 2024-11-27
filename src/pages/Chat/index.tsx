import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { messageService } from '@/services/message-service';
import { GetMessage } from '@/models/Message';
import {
    Container,
    Header,
    Input,
    InputContainer,
    Message,
    MessagesContainer,
    SendButton,
    UserStatus,
} from './styles';
import { Loader, LoaderContainer } from '@/components/Loader';
import { theme } from '@/styles/theme';
import { jwtDecode } from 'jwt-decode';
import { FormRoot } from '@/components/Forms/FormRoot';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageDefault from "@/assets/image-profile-default.jpg";
import { userService } from '@/services/user-service';
import { GetUser } from '@/models/User';
import { toastService } from '@/services/toast-service';

const chatSchema = z.object({
    message: z.string().optional(),
});

type ChatData = z.infer<typeof chatSchema>;

interface JwtPayload {
    id: number;
    exp?: number;
}

export function Chat() {
    const form = useForm<ChatData>({
        resolver: zodResolver(chatSchema),
    });
    const { contactId } = useParams<{ contactId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<GetMessage[]>([]);
    const [user, setUser] = useState<GetUser>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const getUserIdFromToken = (): number | null => {
        const token = localStorage.getItem('authToken');
        if (!token) return null;

        try {
            const decoded: JwtPayload = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    };

    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await messageService.getById(Number(contactId));
                const responseUser = await userService.get();
                setMessages(response);
                setUser(responseUser);
            } catch (error) {
                console.error(error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        if (user) {
            // const API_SOCKET_BASE_URL = 'ws://localhost:5000/';
            const API_SOCKET_BASE_URL = 'wss://total-track-52852a7cf2b1.herokuapp.com/';
            const ws = new WebSocket(`${API_SOCKET_BASE_URL}`, [String(user.id)]);

            ws.onopen = () => {
                console.log("WebSocket conectado");
                toastService.info("WebSocket conectado!");
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (message.type === "newMessage") {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            message.payload,
                        ]);
                    }
                } catch (error) {
                    console.error("Erro ao processar mensagem do WebSocket:", error);
                }
            };

            ws.onerror = (error) => {
                console.error("Erro no WebSocket:", error);
            };

            ws.onclose = () => {
                console.log("WebSocket desconectado");
            };

            return () => {
                ws.close();
            };
        }
    }, [user]);

    const handleSendMessage = async (data: ChatData) => {
        if (!data.message?.trim()) return;

        try {
            const response = await messageService.create({
                message: data.message,
                receiverId: Number(contactId),
            });

            setMessages([
                ...messages,
                {
                    id: response.id,
                    senderId: userId!,
                    receiverId: 2,
                    message: data.message,
                    sentAt: new Date().toISOString(),
                },
            ]);
            form.setValue("message", "");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Container>
            <Header>
                <FaArrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                <UserStatus>
                    <img src={user && user.photo !== "" ? user.photo : imageDefault} alt="User Avatar" />
                    <div>
                        <div>{user && user.name}</div>
                        <div className="status">Online</div>
                    </div>
                </UserStatus>
            </Header>
            <MessagesContainer>
                {loading ? (
                    <LoaderContainer>
                        <Loader size={50} color={theme.colors.primary} />
                    </LoaderContainer>
                ) : (
                    messages.map((message) => (
                        <Message key={message.id} $isSent={message.senderId === userId}>
                            {message.message}
                        </Message>
                    ))
                )}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <FormRoot form={form} onSubmit={form.handleSubmit(handleSendMessage)}>
                <InputContainer>
                    <Controller
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="Digite sua mensagem..."
                            />
                        )}
                    />
                    <SendButton type="submit">Enviar</SendButton>
                </InputContainer>
            </FormRoot>
        </Container>
    );
}
