import { useEffect, useRef, useState } from 'react';
import { ButtonOpen, ContainerOptions, MenuContainer, MenuItem } from './styles';
import { IoMdMore } from "react-icons/io";

interface MenuOption {
    label: string;
    onClick: () => void;
}

interface Props {
    options: MenuOption[];
}

export function OptionsMenu({ options }: Props) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setModalOpen(false);
            }
        };

        if (modalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalOpen]);

    return (
        <MenuContainer ref={menuRef}>
            <ButtonOpen onClick={() => setModalOpen((prev) => !prev)}>
                <IoMdMore />
            </ButtonOpen>

            <ContainerOptions $isOpen={modalOpen} $options={options.length}>
                {options.map((option, index) => (
                    <MenuItem key={index} onClick={() => { option.onClick(); setModalOpen(false); }}>
                        {option.label}
                    </MenuItem>
                ))}
            </ContainerOptions>
        </MenuContainer>
    );
}
