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
import { FormRoot } from '@/components/Forms/FormRoot';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageDefault from "@/assets/image-profile-default.jpg";
import { toastService } from '@/services/toast-service';
import { chatService } from '@/services/chat-service';
import { GetChat } from '@/models/Chat';

const chatSchema = z.object({
    message: z.string().optional(),
});

type ChatData = z.infer<typeof chatSchema>;

export function Chat() {
    const form = useForm<ChatData>({
        resolver: zodResolver(chatSchema),
    });
    const { contactId } = useParams<{ contactId: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<GetMessage[]>([]);
    const [chat, SetChat] = useState<GetChat>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const userId = 1;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log("contactId: ", contactId);
                const responseChat = await chatService.getById(Number(contactId));
                const response = await messageService.getById(Number(contactId));

                SetChat(responseChat);
                setMessages(response);

            } catch (error) {
                console.error(error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [contactId]);

    useEffect(() => {
        if (chat) {
            const API_SOCKET_BASE_URL = import.meta.env.VITE_API_BASE_URL || "wss://buzz-chat-f70b79635e3e.herokuapp.com/";
            const ws = new WebSocket(`${API_SOCKET_BASE_URL}`, [String(chat.users.userId)]);

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
                        console.log("Nova mensagem recebida: ", message.payload);
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
    }, [chat]);

    const handleSendMessage = async (data: ChatData) => {
        if (!data.message?.trim()) return;

        try {
            const response = await messageService.create({
                content: data.message,
                chatId: Number(contactId),
            });

            setMessages([
                ...messages,
                {
                    id: response.id,
                    senderId: userId!,
                    content: data.message,
                    sentAt: new Date().toISOString(),
                    isSender: true
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
                    <img src={chat && chat.users.photo !== "" ? chat.users.photo : imageDefault} alt="chat Avatar" />
                    <div>
                        <div>{chat && chat.users.nickname}</div>
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
                        <Message key={message.id} $isSent={message.isSender}>
                            {message.content}
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