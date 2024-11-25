/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, FormGroup, SubmitButton } from '@/pages/AddContact/styles';
import { contactService } from '@/services/contact-service';
import { Loader } from '@/components/Loader';
import { BackButton } from '@/styles/GlobalStyles';
import { FaArrowLeft } from 'react-icons/fa';

export function AddContact() {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(formData);
            const response = await contactService.create(formData);

            console.log(response);
            navigate('/contacts');
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
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>Telefone:</label>
                    <input
                        type="tel"
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <SubmitButton type="submit">{loading ? <Loader /> : "Adicionar Contato"}</SubmitButton>
            </form>
        </Container>
    );
}
