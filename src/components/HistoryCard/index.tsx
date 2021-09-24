import React from "react";
import { View } from "react-native";

import { Container, Title, Amount } from "./styles";

interface Props {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ color, title, amount }: Props) {
  return (
    <Container color="red">
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}

export default HistoryCard;
