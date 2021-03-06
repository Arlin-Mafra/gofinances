import styled, { css, ThemeConsumer } from "styled-components/native";
import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface ITransactionProps{
    type: "positive" | "negative";
}


export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family:${({theme}) => theme.fonts.regular};
`;
export const Amount = styled.Text<ITransactionProps>`
     font-size: ${RFValue(20)}px;
     font-family:${({theme}) => theme.fonts.regular};
    color:${({theme,type}) => type === 'positive' ? theme.colors.success :
    theme.colors.attention} ;
    
     margin-top: 2px;
`;
export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 19px;
`;
export const TypeTransaction = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`;
export const TransactionName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    margin-left: 17px;
`;
export const TransactionDate = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
`;