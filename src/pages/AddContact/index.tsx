import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Title, SubmitButton } from '@/pages/AddContact/styles';
import { contactService } from '@/services/contact-service';
import { Loader } from '@/components/Loader';
import { BackButton } from '@/styles/GlobalStyles';
import { FaArrowLeft } from 'react-icons/fa';
import { chatService } from '@/services/chat-service';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Forms/Input';
import { FormRoot } from '@/components/Forms/FormRoot';
import { keepOnlyNumbers } from '@/utils';

const contactSchema = z.object({
    nickname: z.string().min(1, "Campo obrigatório"),
    phone: z.string().min(15, "Telefone inválido").transform(keepOnlyNumbers),
});

type ContactData = z.infer<typeof contactSchema>;

export function AddContact() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState<ContactData>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const handleDefaultValues = async () => {
                try {
                    const response = await chatService.getById(Number(id));

                    setDefaultValues({ nickname: response.users.nickname, phone: response.users.phone });
                } catch (error) {
                    console.error(error);
                }
            }
            handleDefaultValues();
        }
    }, [id]);

    const form = useForm<ContactData>({
        resolver: zodResolver(contactSchema),
        defaultValues,
    });

    const handleSubmit = async (data: ContactData) => {
        try {
            setLoading(true);

            if (id) {
                await contactService.update(data);
            } else {
                await contactService.create(data);
            }
            navigate(-1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate("/contacts")}>
                <FaArrowLeft />
            </BackButton>

            <Title>Adicionar Contato</Title>
            <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit)}>
                <Input type="text" name='nickname' />

                <Input type="tel" name='number' mask='phone' />

                <SubmitButton>{loading ? <Loader /> : "Adicionar Contato"}</SubmitButton>
            </FormRoot>
        </Container>
    );
}
