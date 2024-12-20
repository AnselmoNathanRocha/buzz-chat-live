import { useState } from "react";
import { IoMdCheckbox, IoMdSquareOutline } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import dayjs from "dayjs";
import {
    ItemContainer,
    CheckboxContainer,
    UserImage,
    UserInfo,
    UserName,
    LastMessage,
    ReadIcon,
    Timestamp,
} from "./styles";

import imageDefault from "@/assets/image-profile-default.jpg";

interface Props {
    data: {
        id: number;
        photo: string;
        name: string;
        statusMessage: string;
        timestamp?: string;
    };
    onClick: () => void;
    selected?: boolean;
}

export function ConversationItem({ data, onClick, selected = false }: Props) {
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
            <CheckboxContainer
                $isHovered={isHovered}
                $isSelected={isChecked}
                onClick={handleCheckboxClick}
            >
                {isChecked ? <IoMdCheckbox /> : <IoMdSquareOutline />}
            </CheckboxContainer>
            <UserImage
                src={data.photo !== "" ? data.photo : imageDefault}
                alt={`${data.name}'s avatar`}
            />
            <UserInfo>
                <UserName>{data.name}</UserName>
                <LastMessage>{data.statusMessage}</LastMessage>
            </UserInfo>
            <ReadIcon $isRead={true}>
                {data.timestamp && <Timestamp>{dayjs(data.timestamp).format("HH:mm")}</Timestamp>}
                <IoCheckmarkDone />
            </ReadIcon>
        </ItemContainer>
    );
}
