import React from 'react';
import styled, { keyframes } from "styled-components";
import { useWindowSize } from '../../utils/useWindowSize';

const Orb = () => {
    const { width, height } = useWindowSize();

    const moveOrb = keyframes`
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${width * 0.6}px, ${height * 0.6}px);
        }
        100% {
            transform: translate(0, 0);
        }
    `;

    const OrbStyled = styled.div`
        width: 60vh;
        height: 60vh;
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(180deg, #8e44ad, #2980b9);
        box-shadow: 0px 0px 200px 50px rgba(0, 0, 0, 0.7);
        filter: blur(200px);
        animation: ${moveOrb} 18s alternate ease-in-out infinite;
        opacity: 0.8;
    `;

    const OrbContainer = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #0c0c0c;
        overflow: hidden;
    `;

    return (
        <OrbContainer>
            <OrbStyled />
        </OrbContainer>
    );
}

export default Orb;
