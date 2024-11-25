/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FaUser, FaPhone, FaCalendarAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { Button, Container, Form, InputGroup, LinkCustom, TextLink, Title } from '@/styles/GlobalStyles';
import { userService } from '@/services/user-service';
import { Loader } from '@/components/Loader';

export function Signup() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dateOfBirth: '',
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await userService.create(formData);

            if (response) {
                const responseAuth = await userService.authentication({ email: formData.email, password: formData.password });
                const { token, expiresIn } = responseAuth.data;

                localStorage.setItem('authToken', token);
                localStorage.setItem('expiresIn', expiresIn);

                window.location.reload();
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Cadastro de Usuário</Title>
                <InputGroup>
                    <FaUser />
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label>Nome</label>
                </InputGroup>
                <InputGroup>
                    <FaPhone />
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label>Número de Telefone</label>
                </InputGroup>
                <InputGroup>
                    <FaCalendarAlt />
                    <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    <label>Data de Nascimento</label>
                </InputGroup>
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
                <Button style={{ marginTop: "30px" }} type="submit">{loading ? <Loader size={28} /> : "Cadastrar"}</Button>
                <TextLink>
                    Já possui uma conta? <LinkCustom to="/login">Faça login</LinkCustom>
                </TextLink>
            </Form>
        </Container>
    );
}
