import styled, { css } from "styled-components/native";
import {TouchableOpacity} from 'react-native'

import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconProps{
    type: "up" | "down";
}

interface ContainerProps{
    isActive:boolean;
    type: "up" | "down";

}

export const Container = styled(RectButton)<ContainerProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width:   ${({isActive}) => isActive ? 0 : 1.5}px; 
    border-style: solid; 
    border-color:${({theme}) =>  theme.colors.text};
    border-radius: 5px;
    padding: 16px;

    ${({ isActive, type }) => type === 'up' && isActive && css`
    background-color:${({theme}) => theme.colors.success_ligth};`}

    ${({ isActive, type }) => type === 'down' && isActive && css`
    background-color:${({theme}) => theme.colors.attention_ligth};`}
`;

export const Icon = styled(Feather)<IconProps>`
    margin-right: 12px;
    font-size: ${RFValue(24)}px;

    color: ${({type,theme}) => type === 'up' ?
     theme.colors.success : theme.colors.attention};
`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;