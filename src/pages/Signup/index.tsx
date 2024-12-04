/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FaUser, FaPhone, FaCalendarAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { Button, ContainerLogin, FormBox, LinkCustom, TextLink, Title } from '@/styles/GlobalStyles';
import { userService } from '@/services/user-service';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/context/auth';
import { FormRoot } from '@/components/Forms/FormRoot';
import { z } from 'zod';
import { zodDateSchema } from '@/utils/zod-utils';
import { keepOnlyNumbers } from '@/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Forms/Input';
import { InputPass } from '@/components/Forms/InputPass';
import dayjs from 'dayjs';

const signupSchema = z
    .object({
        name: z.string().min(5, "Nome precisa ter no mínimo 5 caracteres"),
        phone: z.string().min(15, "Telefone inválido").transform(keepOnlyNumbers),
        dateOfBirth: zodDateSchema("YYYY-MM-DD"),
        email: z.string().email("Email inválido"),
        password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "A senha e confirmação não conferem",
    });

type SignupData = z.infer<typeof signupSchema>;

export function Signup() {
    const form = useForm<SignupData>({
        resolver: zodResolver(signupSchema),
    });
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const onSubmit = async (data: SignupData) => {
        try {
            setError(undefined);
            setLoading(true);
            const response = await userService.create({
                name: data.name,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                email: data.email,
                password: data.password
            });

            if (response) {
                const responseAuth = await userService.authentication({ email: data.email, password: data.password });
                const { token, expiresAt } = responseAuth.data;

                login(token, expiresAt);
            }
        } catch (error: any) {
            if (error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerLogin>
            <FormBox>
                <Title>Cadastro de Usuário</Title>
                <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)}>
                    <Input type="text" floatingLabel='Nome' name='name' leftIcon={<FaUser />} />

                    <Input type="text" mask="phone" floatingLabel='Número de telefone' name='phone' leftIcon={<FaPhone />} />

                    <Input type="date" max={dayjs().format("YYYY-MM-DD")} floatingLabel='Data de nascimento' name='dateOfBirth' leftIcon={<FaCalendarAlt />} />

                    <Input type="email" floatingLabel='Email' name='email' leftIcon={<FaEnvelope />} />

                    <InputPass floatingLabel='Senha' name='password' leftIcon={<FaLock />} />

                    <InputPass floatingLabel='Confirmar senha' errorMessage={error} name='confirmPassword' leftIcon={<FaLock />} />

                    <Button type="submit">{loading ? <Loader size={28} /> : "Cadastrar"}</Button>
                </FormRoot>
                <TextLink>
                    Já possui uma conta? <LinkCustom to="/login">Faça login</LinkCustom>
                </TextLink>
            </FormBox>
        </ContainerLogin>
    );
}
