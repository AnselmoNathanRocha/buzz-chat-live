/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Loader } from '@/components/Loader';
import { Button, Container, ErroMessage, Form, InputGroup, LinkCustom, TextLink, Title } from '@/styles/GlobalStyles';
import { userService } from '@/services/user-service';
import { useAuth } from '@/context/auth';

export function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await userService.authentication(formData);
            const { token, expiresIn } = response.data;

            login(token, expiresIn);
        } catch (error: any) {
            if (error.response) {
                if (error.response.data.error === 'Token expirado') {
                    setErrorMessage('Sua sessão expirou. Por favor, faça login novamente.');
                } else {
                    setErrorMessage(error.response.data.error || 'Erro ao fazer login');
                }
            } else {
                setErrorMessage('Erro ao conectar com o servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Login de Usuário</Title>
                <InputGroup>
                    <FaEnvelope />
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label>Email</label>
                </InputGroup>
                <InputGroup>
                    <FaLock />
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label>Senha</label>
                </InputGroup>

                <ErroMessage>{errorMessage}</ErroMessage>

                <Button type="submit">{loading ? <Loader size={28} /> : "Entrar"}</Button>
                <TextLink>
                    Não tem uma conta? <LinkCustom to="/signup">Cadastre-se</LinkCustom>
                </TextLink>
            </Form>
        </Container>
    );
}
