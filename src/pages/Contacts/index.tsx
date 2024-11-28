import { useState, useEffect } from 'react';
import { FaSearch, FaEllipsisV, FaComments, FaUsers, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { ConversationItem } from '@/components/ConversationItem';
import { OptionsMenu } from '@/components/OptionsMenu';
import { Loader, LoaderContainer } from '@/components/Loader';
import { useAuth } from '@/context/auth';
import { contactService } from '@/services/contact-service';

import { Container, Title, SearchGroup, ConversationsList, MenuButton, FloatingButton } from '@/pages/Contacts/styles';
import { BackButton, EmptyMessage } from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';
import { GetContact } from '@/models/Contact';

export function Contacts() {
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const selectedContacts = [];
    const [contacts, setContacts] = useState<GetContact[]>([]);
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                if (token) {
                    const response = await contactService.get();
                    setContacts(response);
                }
            } catch (error) {
                console.error('Erro ao buscar contatos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [token]);

    const filteredContacts = contacts ? contacts.filter(contact =>
        contact.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const isMultipleSelected = selectedContacts.length > 1;

    return (
        <Container>
            <Title>Escolha um Contato</Title>

            <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft />
            </BackButton>

            <MenuButton onClick={() => setMenuOpen(prev => !prev)}>
                <FaEllipsisV />
            </MenuButton>

            {menuOpen && <OptionsMenu onClose={() => setMenuOpen(false)} isOpen={menuOpen} />}

            <SearchGroup>
                <FaSearch />
                <input
                    type="text"
                    placeholder="Pesquisar contatos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </SearchGroup>

            {loading ? (
                <LoaderContainer>
                    <Loader size={50} color={theme.colors.primary} />
                </LoaderContainer>
            ) : (
                <>
                    {contacts.length === 0 ? (
                        <EmptyMessage>
                            <HiOutlineEmojiSad />
                            Nenhum contato disponível.
                        </EmptyMessage>
                    ) : (
                        <ConversationsList>
                            {filteredContacts.map((contact, index) => (
                                <ConversationItem
                                    key={`${contact.contactId}-${index}`}
                                    data={{
                                        id: contact.contactId,
                                        name: contact.nickname,
                                        photo: contact.photo,
                                        statusMessage: contact.statusMessage
                                    }}
                                    onClick={() => navigate(`/chat/${contact.chatId}`)}
                                />
                            ))}
                        </ConversationsList>
                    )}
                </>
            )}

            {selectedContacts.length > 0 && (
                <FloatingButton>
                    {isMultipleSelected ? <FaUsers /> : <FaComments />}
                </FloatingButton>
            )}

            <FloatingButton onClick={() => navigate('/add-contact')}>
                <FaPlus />
            </FloatingButton>
        </Container>
    );
}
