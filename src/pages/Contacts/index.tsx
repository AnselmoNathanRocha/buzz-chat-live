import { useState, useEffect } from 'react';
import { FaArrowLeft, FaPlus, FaSearch } from 'react-icons/fa';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { ConversationItem } from '@/components/ConversationItem';
import { OptionsMenu } from '@/components/OptionsMenu';
import { Loader, LoaderContainer } from '@/components/Loader';
import { useAuth } from '@/context/auth';
import { contactService } from '@/services/contact-service';

import { FloatingButton, TextDetailed } from '@/pages/Contacts/styles';
import { ButtonBack, Container, ContainerFirst, ConversationsList, EmptyMessage, Header, SearchBox, Title } from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';
import { GetContact } from '@/models/Contact';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRoot } from '@/components/Forms/FormRoot';
import { Input } from '@/components/Forms/Input';

const contactSchema = z.object({
    search: z.string().optional(),
});

type SearchData = z.infer<typeof contactSchema>;

export function Contacts() {
    const form = useForm<SearchData>({
        resolver: zodResolver(contactSchema),
    });
    const search = form.watch("search");
    const [contacts, setContacts] = useState<GetContact[]>([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await contactService.get();
                setContacts(response);
            } catch (error) {
                console.error('Erro ao buscar contatos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const filteredContacts = Array.isArray(contacts)
        ? contacts.filter(contact =>
            contact.nickname.toLowerCase().includes(search!.toLowerCase())
        )
        : [];

    return (
        <Container>
            <Header>
                <ContainerFirst>
                    <ButtonBack onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </ButtonBack>

                    <div>
                        <Title>Contatos</Title>
                        <TextDetailed>{contacts.length} contatos</TextDetailed>
                    </div>
                </ContainerFirst>

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

            <FloatingButton onClick={() => navigate("/add-contact")}>
                <FaPlus size={18} />
            </FloatingButton>

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
        </Container>
    );
}
