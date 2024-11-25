import { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { messageService } from '@/services/message-service';
import { GetMessage } from '@/models/Message';
import { Container, Header, Input, InputContainer, Message, MessagesContainer, SendButton, UserStatus } from './styles';
import { Loader, LoaderContainer } from '@/components/Loader';
import { theme } from '@/styles/theme';

export function Chat() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [messages, setMessages] = useState<GetMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await messageService.get();

                setMessages(response);
            } catch (error) {
                console.error(error);
                setMessages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputMessage.trim() === '') return;

        const newMessage = {
            text: inputMessage,
            isSent: true,
        };

        try {
            const response = await messageService.create(newMessage);
            setMessages([...messages, { id: response.id, ...newMessage }]);
            setInputMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Container>
            <Header>
                <FaArrowLeft style={{ cursor: "pointer" }} onClick={() => navigate('/contacts')} />
                <UserStatus>
                    <img src="user-avatar-url" alt="User Avatar" />
                    <div className="status">Online</div>
                </UserStatus>
            </Header>
            <MessagesContainer>
                {loading ?
                    <LoaderContainer>
                        <Loader size={50} color={theme.colors.primary} />
                    </LoaderContainer>
                    :
                    <>
                        {messages && messages.map((message) => (
                            <Message key={message.id} $isSent={message.isSent}>
                                {message.text}
                            </Message>
                        ))}
                    </>
                }
            </MessagesContainer>
            <InputContainer onSubmit={handleSendMessage}>
                <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <SendButton type="submit">Enviar</SendButton>
            </InputContainer>
        </Container>
    );
};
