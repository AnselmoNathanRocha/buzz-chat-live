import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { contactService } from '@/services/contact-service';
import { Loader } from '@/components/Loader';
import { ButtonBack, Container, Header, Span, Title } from '@/styles/GlobalStyles';
import { FaArrowLeft } from 'react-icons/fa';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Forms/Input';
import { FormRoot } from '@/components/Forms/FormRoot';
import { keepOnlyNumbers } from '@/utils';
import { ContainerInput, SubmitButton } from './styles';

const contactSchema = z.object({
    nickname: z.string().min(1, "Campo obrigatório"),
    phone: z.string().min(15, "Telefone inválido").transform(keepOnlyNumbers),
});

type ContactData = z.infer<typeof contactSchema>;

export function AddContact() {
    const location = useLocation();
    const defaultValues = location.state?.defaultValues || { nickname: "", phone: "" };
    const form = useForm<ContactData>({
        resolver: zodResolver(contactSchema),
        defaultValues,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data: ContactData) => {
        try {
            setLoading(true);

            if (defaultValues.nickname !== "") {
                await contactService.update(data);
            } else {
                console.log("Data: ", data);
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
            <Header $background='#F5F7FA' $borderHide >
                <ButtonBack onClick={() => navigate(-1)}>
                    <FaArrowLeft color='#4A90E2' />
                </ButtonBack>

                <Title $color='#4A90E2'>Adicionar Contato</Title>
                <Span />
            </Header>
            
            <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit)}>
                <ContainerInput>
                    <Input type="text" name='nickname' floatingLabel='Nome' />

                    <Input type="tel" name='phone' mask='phone' floatingLabel='Telefone' />

                    <SubmitButton>{loading ? <Loader /> : "Adicionar Contato"}</SubmitButton>
                </ContainerInput>
            </FormRoot>
        </Container>
    );
}
