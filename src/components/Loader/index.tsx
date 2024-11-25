import styled, { keyframes } from 'styled-components';

interface Props {
    size?: number;
    color?: string;
}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div<Props>`
    width: ${(props) => (props.size ? `${props.size}px` : '30px')};
    height: ${(props) => (props.size ? `${props.size}px` : '30px')};
    border-radius: 50%;
    border: ${(props) => (props.size ? `${props.size / 8}px` : '4px')} solid transparent;
    border-top-color: ${(props) => props.color || '#EEEEEE'};
    animation: ${spin} .5s linear infinite;
`;

export const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

export function Loader({ size, color }: Props) {
    return <StyledLoader size={size} color={color} />;
}
