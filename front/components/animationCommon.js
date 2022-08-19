import styled, { keyframes } from "styled-components";

export const translateX = keyframes`
    0%{
        transform: translateY(40px);
    }
    100%{
        transform: translateY(0);
    }
`;

export const fadeAni = keyframes`
    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
`;

export const headerAni = keyframes`
    0%{
       height:0;  
       opacity:0;
    }
    100%{
        height:280px;
        opacity:1;
    }
`;

export const scaleAni = keyframes`
    0%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
`;
