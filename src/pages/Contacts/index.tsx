import { useState, useEffect } from 'react';
import { FaSearch, FaEllipsisV, FaComments, FaUsers, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { ConversationItem } from '@/components/ConversationItem';
import { OptionsMenu } from '@/components/OptionsMenu';
import { Container, Title, SearchGroup, ConversationsList, MenuButton, FloatingButton } from '@/pages/Contacts/styles';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { GetContact } from '@/models/Contact';
import { contactService } from '@/services/contact-service';
import { Loader, LoaderContainer } from '@/components/Loader';
import { theme } from '@/styles/theme';
import { BackButton, EmptyMessage } from '@/styles/GlobalStyles';
import { HiOutlineEmojiSad } from 'react-icons/hi';

export function Contacts() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
    const [contacts, setContacts] = useState<GetContact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await contactService.get();

                setContacts(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchContacts();
        }
    }, [token]);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isMultipleSelected = selectedContacts.length > 1;

    const handleSelectContact = (id: number) => {
        setSelectedContacts(prev =>
            prev.includes(id) ? prev.filter(contactId => contactId !== id) : [...prev, id]
        );

        navigate(`/chat/${id}`);
    };

    return (
        <Container>
            <Title>Escolha um Contato</Title>
            <BackButton onClick={() => navigate("/")}>
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
                    {contacts.length === 0 ?
                        <EmptyMessage>
                            <HiOutlineEmojiSad />
                            Nenhum contato disponível.
                        </EmptyMessage>
                        :
                        <ConversationsList>
                            {filteredContacts.map((contact, index) => (
                                <ConversationItem
                                    key={`${contact.id}-${index}`}
                                    image={contact.image}
                                    name={contact.name}
                                    lastMessage=""
                                    isRead={false}
                                    onClick={() => handleSelectContact(contact.id)}
                                    selected={selectedContacts.includes(contact.id)}
                                />
                            ))}
                        </ConversationsList>
                    }
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
