import React from "react";
import { categories } from "../../utils/categories";

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

interface CategooryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const category = categories.filter((item) => item.key === data.category)[0];
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "} {data.amount}
      </Amount>
      <Footer>
        <TypeTransaction>
          <Icon name={category.icon} />
          <TransactionName>{category.name}</TransactionName>
        </TypeTransaction>
        <TransactionDate>{data.date}</TransactionDate>
      </Footer>
    </Container>
  );
}
