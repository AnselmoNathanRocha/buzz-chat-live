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

export function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
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
            conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                <FaSearch />
                <input
                    type="text"
                    placeholder="Pesquisar conversas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                            {filteredConversations.map(conversation => (
                                <ConversationItem
                                    key={conversation.id}
                                    image={conversation.image}
                                    name={conversation.name}
                                    lastMessage={conversation.lastMessage}
                                    isRead={conversation.isRead}
                                    onClick={() => navigate(`/chat/${conversation.id}`)}
                                />
                            ))}
                        </ConversationsList>
                    }
                </>
            )}
        </Container>
    );
}
