import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  TypeTransaction,
  Icon,
  TransactionName,
  TransactionDate,
} from "./styles";

interface Transaction {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  transactionType: Transaction;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "} {data.amount}
      </Amount>
      <Footer>
        <TypeTransaction>
          <Icon name={data.transactionType.icon} />
          <TransactionName>{data.transactionType.name}</TransactionName>
        </TypeTransaction>
        <TransactionDate>{data.date}</TransactionDate>
      </Footer>
    </Container>
  );
}
