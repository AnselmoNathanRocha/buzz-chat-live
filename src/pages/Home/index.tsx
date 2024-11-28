import { useState, useEffect } from 'react';
import { FaSearch, FaComments, FaEllipsisV } from 'react-icons/fa';
import { ConversationItem } from '@/components/ConversationItem';
import { OptionsMenu } from '@/components/OptionsMenu';
import { Container, Title, SearchGroup, Button, ConversationsList, MenuButton } from '@/pages/Home/styles';
import { useNavigate } from 'react-router-dom';
import { chatService } from '@/services/chat-service';
import { GetChat } from '@/models/Chat';
import { Loader, LoaderContainer } from '@/components/Loader';
import { theme } from '@/styles/theme';
import { EmptyMessage } from '@/styles/GlobalStyles';
import { HiOutlineEmojiSad } from "react-icons/hi";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Forms/Input';
import { FormRoot } from '@/components/Forms/FormRoot';

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
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [conversations, setConversations] = useState<GetChat[]>([]);
    const navigate = useNavigate();

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
            conversation.users.name.toLowerCase().includes(search!.toLowerCase())
        )
        : [];

    return (
        <Container>
            <Title>Bem-vindo ao Chat</Title>
            <MenuButton onClick={() => setMenuOpen(prev => !prev)}>
                <FaEllipsisV />
            </MenuButton>
            {menuOpen && <OptionsMenu onClose={() => setMenuOpen(false)} isOpen={menuOpen} />}
            <SearchGroup>
                <FormRoot form={form}>
                    <Input type='text' name='search' placeholder='Pesquisar conversas...' leftIcon={<FaSearch />} />
                </FormRoot>
            </SearchGroup>
            <Button onClick={() => navigate("/contacts")}>
                <FaComments style={{ marginRight: '8px' }} />
                Iniciar Nova Conversa
            </Button>

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
                                        statusMessage: conversation.lastMessage.content
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
