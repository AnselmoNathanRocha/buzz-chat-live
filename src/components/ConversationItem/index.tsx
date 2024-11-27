import { useState } from 'react';
import { IoMdCheckbox, IoMdSquareOutline } from 'react-icons/io';
import { IoCheckmarkDone } from 'react-icons/io5';
import {
    ItemContainer,
    CheckboxContainer,
    UserImage,
    UserInfo,
    UserName,
    LastMessage,
    ReadIcon
} from './styles';
import { GetChat } from '@/models/Chat';
import imageDefault from "@/assets/image-profile-default.jpg";

interface Props {
    conversation: GetChat;
    onClick: () => void;
    selected?: boolean;
}

export function ConversationItem({ conversation, onClick, selected = false }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(selected);

    const handleCheckboxClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsChecked((prev) => !prev);
    };

    return (
        <ItemContainer
            onClick={onClick}
            $isSelected={isChecked}
            $isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CheckboxContainer $isHovered={isHovered} $isSelected={isChecked} onClick={handleCheckboxClick}>
                {isChecked ? <IoMdCheckbox /> : <IoMdSquareOutline />}
            </CheckboxContainer>
            <UserImage src={conversation.photoUser !== "" ? conversation.photoUser : imageDefault} alt={`${conversation.nameContact}'s avatar`} />
            <UserInfo>
                <UserName>{conversation.nameContact}</UserName>
                <LastMessage>{conversation.lastMessage}</LastMessage>
            </UserInfo>
            <ReadIcon $isRead={true}>
                <IoCheckmarkDone />
            </ReadIcon>
        </ItemContainer>
    );
}
