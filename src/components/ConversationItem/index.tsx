import { IoMdCheckbox, IoMdSquareOutline } from 'react-icons/io';
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5';
import styled from 'styled-components';
import { useState } from 'react';

const ItemContainer = styled.li<{ $isSelected: boolean; $isHovered: boolean }>`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s, margin-left 0.3s;
    background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.selectedBackground : 'transparent')};
    border-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.selectedBorder : theme.colors.borderColor)};
    
    margin-left: ${({ $isSelected, $isHovered }) => ($isSelected || $isHovered ? '40px' : '0')};
    transition: margin-left 0.3s;
    ${({ $isHovered, $isSelected }) => !$isHovered && !$isSelected && 'transition-delay: .5s;'}

    &:hover {
        background-color: ${({ theme }) => theme.colors.hoverBackground};
    }
`;

const CheckboxContainer = styled.span<{ $isHovered: boolean; $isSelected: boolean }>`
    position: absolute;
    left: -35px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: green;
    cursor: pointer;
    
    opacity: ${({ $isHovered, $isSelected }) => ($isHovered || $isSelected ? 1 : 0)};
    transition: opacity 0.3s;
    ${({ $isHovered, $isSelected }) => !$isHovered && !$isSelected && 'transition-delay: .5s;'}
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserInfo = styled.div`
    flex-grow: 1;
`;

const UserName = styled.h2`
    margin: 0;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};
`;

const LastMessage = styled.p`
    margin: 5px 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
`;

const ReadIcon = styled.span<{ $isRead: boolean }>`
    font-size: 14px;
    color: ${({ $isRead }) => ($isRead ? 'green' : 'gray')};
`;

interface Props {
    image: string;
    name: string;
    lastMessage: string;
    isRead: boolean;
    onClick: () => void;
    selected?: boolean;
}

export function ConversationItem({ image, name, lastMessage, isRead, onClick, selected = false }: Props) {
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
            <UserImage src={image} alt={`${name}'s avatar`} />
            <UserInfo>
                <UserName>{name}</UserName>
                <LastMessage>{lastMessage}</LastMessage>
            </UserInfo>
            <ReadIcon $isRead={isRead}>{isRead ? <IoCheckmarkDone /> : <IoCheckmark />}</ReadIcon>
        </ItemContainer>
    );
}
