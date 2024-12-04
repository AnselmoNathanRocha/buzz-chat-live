/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Loader } from '@/components/Loader';
import { Button, ContainerLogin, FormBox, LinkCustom, TextLink, Title } from '@/styles/GlobalStyles';
import { userService } from '@/services/user-service';
import { useAuth } from '@/context/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/Forms/Input';
import { FormRoot } from '@/components/Forms/FormRoot';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { InputPass } from '@/components/Forms/InputPass';

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export function Login() {
    const [loading, setLoading] = useState(false);
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });
    const { login } = useAuth();

    const onSubmit = async (data: LoginData) => {
        try {
            setLoading(true);
            const response = await userService.authentication(data);
            const { token, expiresAt } = response.data;

            login(token, expiresAt);
        } catch (error: any) {
            if (error.response) {
                if (error.response.data.error === 'Token expirado') {
                    console.error('Sua sessão expirou. Por favor, faça login novamente.');
                } else {
                    console.error(error.response.data.error || 'Erro ao fazer login');
                }
            } else {
                console.error('Erro ao conectar com o servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerLogin>
            <FormBox>
                <Title>Login de Usuário</Title>
                <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)}>
                    <Input floatingLabel='Email' name='email' leftIcon={<FaEnvelope />} />

                    <InputPass floatingLabel='Senha' name='password' leftIcon={<FaLock />} />

                    <Button type="submit">{loading ? <Loader size={28} /> : "Entrar"}</Button>
                </FormRoot>
                <TextLink>
                    Não tem uma conta? <LinkCustom to="/signup">Cadastre-se</LinkCustom>
                </TextLink>
            </FormBox>
        </ContainerLogin>
    );
}
