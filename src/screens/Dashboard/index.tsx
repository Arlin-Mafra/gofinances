import React from "react";
import { HighilightCard } from "../../components/HighilightCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  UserWrapper,
  Icon,
  HighilightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export function DashBoard() {
  const data = [
    {
      type: "positive",
      title: "Desenvolvimento de sites",
      amount: "R$ 12.000,00",
      transactionType: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      type: "negative",
      title: "Amburgueria",
      amount: "R$ 59,00",
      transactionType: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },
    {
      type: "negative",
      title: "Aluguel da aprtamento",
      amount: "R$ 600,00",
      transactionType: { name: "Casa", icon: "shopping-bag" },
      date: "10/04/2020",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/55093136?v=4",
              }}
            />
            <User>
              <UserGretting>Olá, </UserGretting>
              <UserName>Arlin</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighilightCards>
        <HighilightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
        />
        <HighilightCard
          type="down"
          title="Saidas"
          amount="R$ 1.259,00"
          lastTransaction="Ultima saida dia 03 de abril"
        />
        <HighilightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 05 de abril"
        />
      </HighilightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
