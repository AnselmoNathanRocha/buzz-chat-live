import { useAuth } from '@/context/auth';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div<{ $isOpen: boolean }>`
    width: 200px;   
    position: absolute;
    top: 30px;
    right: 35px;
    background: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: 0.3s ease-in-out;
`;

const MenuItem = styled.button`
    width: 100%;
    height: 35px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    padding: 10px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: left;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

interface OptionsMenuProps {
    onClose: () => void;
    isOpen: boolean;
}

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ onClose, isOpen }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <MenuContainer ref={menuRef} $isOpen={isOpen}>
            <MenuItem onClick={() => { console.log('Navegar para Chat em Grupo'); onClose(); }}>
                Novo grupo
            </MenuItem>
            <MenuItem onClick={() => { console.log('Navegar para Chat privado'); onClose(); navigate("/contacts"); }}>
                Nova mensagem
            </MenuItem>
            <MenuItem onClick={() => { console.log('Navegar para Favoritos'); onClose(); }}>
                Mensagens favoritas
            </MenuItem>
            <MenuItem onClick={() => { console.log('Navegar para Configurações'); onClose(); }}>
                Configurações
            </MenuItem>
            <MenuItem onClick={() => logout()}>
                Sair
            </MenuItem>
        </MenuContainer>
    );
};
