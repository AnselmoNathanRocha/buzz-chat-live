import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaCog } from "react-icons/fa";
import { Container, Header, ProfilePicture, InfoContainer, Name, Status, OptionsContainer, OptionButton } from "./styles";
import defaultProfileImage from "@/assets/image-profile-default.jpg";
import { GetChat } from "@/models/Chat";
import { chatService } from "@/services/chat-service";
import { Loader, LoaderContainer } from "@/components/Loader";
import { theme } from "@/styles/theme";

export function UserProfile() {
    const navigate = useNavigate();
    const { contactId } = useParams<{ contactId: string }>();
    const [chat, setChat] = useState<GetChat>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const responseChat = await chatService.getById(Number(contactId));
                setChat(responseChat);
            } catch (error) {
                console.error("Erro ao carregar os dados do usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChat();
    }, [contactId]);

    return (
        <Container>
            {loading ? (
                <LoaderContainer>
                    <Loader size={50} color={theme.colors.primary} />
                </LoaderContainer>
            ) : chat ? (
                <>
                    <Header>
                        <FaArrowLeft style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
                        <h2>Perfil do Usuário</h2>
                    </Header>
                    <ProfilePicture>
                        <img src={chat.users.photo ? chat.users.photo : defaultProfileImage} alt="Foto de Perfil" />
                    </ProfilePicture>
                    <InfoContainer>
                        <Name>{chat.users.nickname}</Name>
                        <Status>Online</Status>
                    </InfoContainer>
                    <OptionsContainer>
                        <OptionButton>
                            <FaEdit /> Editar Perfil
                        </OptionButton>
                        <OptionButton>
                            <FaCog /> Configurações
                        </OptionButton>
                    </OptionsContainer>
                </>
            ) : (
                <p>Usuário não encontrado</p>
            )}
        </Container>
    );
}
