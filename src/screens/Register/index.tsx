import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategoryType } from "../../components/Form/CategoryType";
import { Input } from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionType(type: "up" | "down") {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="nome" />
          <Input placeholder="preço" />
          <TransactionsType>
            <TransactionTypeButton
              title="Income"
              type="up"
              isActive={transactionType === "up"}
              onPress={() => handleTransactionType("up")}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              isActive={transactionType === "down"}
              onPress={() => handleTransactionType("down")}
            />
          </TransactionsType>
          <CategoryType title="Seleceione" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
