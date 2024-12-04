import { useState, useEffect } from 'react';
import { ConversationItem } from '@/components/ConversationItem';
import { useNavigate } from 'react-router-dom';
import { chatService } from '@/services/chat-service';
import { GetChat } from '@/models/Chat';
import { Loader, LoaderContainer } from '@/components/Loader';
import { theme } from '@/styles/theme';
import { Container, ConversationsList, EmptyMessage, Header, SearchBox, Title } from '@/styles/GlobalStyles';
import { HiOutlineEmojiSad } from "react-icons/hi";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OptionsMenu } from '@/components/OptionsMenu';
import { useAuth } from '@/context/auth';
import { FormRoot } from '@/components/Forms/FormRoot';
import { Input } from '@/components/Forms/Input';
import { FaSearch } from 'react-icons/fa';
import { FloatingButton } from '../Contacts/styles';
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const homeSchema = z.object({
    search: z.string().optional(),
});

type SearchData = z.infer<typeof homeSchema>;

export function Home() {
    const form = useForm<SearchData>({
        resolver: zodResolver(homeSchema),
    });
    const search = form.watch("search");
    const [loading, setLoading] = useState<boolean>(true);
    const [conversations, setConversations] = useState<GetChat[]>([]);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await chatService.get();
                setConversations(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const filteredConversations = Array.isArray(conversations)
        ? conversations.filter(conversation =>
            conversation.users.nickname.toLowerCase().includes(search!.toLowerCase())
        )
        : [];

    return (
        <Container>
            <Header>
                <Title>BuzzChat</Title>

                <OptionsMenu options={[
                    { label: "Novo grupo", onClick: () => console.log("Novo grupo") },
                    { label: "Nova mensagem", onClick: () => navigate("/contacts") },
                    { label: "Mensagens favoritas", onClick: () => console.log("Mensagens favoritas") },
                    { label: "Configurações", onClick: () => console.log("Configurações") },
                    { label: "Sair", onClick: () => logout() }
                ]} />
            </Header>

            <SearchBox>
                <FormRoot form={form}>
                    <Input
                        type='text'
                        name='search'
                        placeholder='Pesquisar conversas...'
                        leftIcon={<FaSearch />}
                        borderStyle='2px solid #E0E0E0'
                        borderRadius='20px'
                    />
                </FormRoot>
            </SearchBox>

            <FloatingButton onClick={() => navigate("/contacts")}>
                <BiSolidMessageSquareAdd size={22} />
            </FloatingButton>

            {loading ? (
                <LoaderContainer>
                    <Loader size={50} color={theme.colors.primary} />
                </LoaderContainer>
            ) : (
                <>
                    {conversations.length === 0 ?
                        <EmptyMessage>
                            <HiOutlineEmojiSad />
                            Nenhuma conversa disponível.
                        </EmptyMessage>
                        :
                        <ConversationsList>
                            {filteredConversations.map((conversation, index) => (
                                <ConversationItem
                                    key={`${conversation.chatId}-${index}`}
                                    data={{
                                        id: conversation.users.userId,
                                        name: conversation.users.nickname,
                                        photo: conversation.users.photo,
                                        statusMessage: conversation.lastMessage ? conversation.lastMessage.content : "",
                                        timestamp: conversation.lastMessage.timestamp
                                    }}
                                    onClick={() => navigate(`/chat/${conversation.chatId}`)}
                                />
                            ))}
                        </ConversationsList>
                    }
                </>
            )}
        </Container>
    );
}
