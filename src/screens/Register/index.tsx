import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
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
  const [categoryOpenModal, setCategoryOpenModal] = useState(false);

  const [category, setCategory] = useState({
    key: "Categoria",
    name: "category",
  });

  function handleTransactionType(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseModalCategory() {
    setCategoryOpenModal(false);
  }
  function handleOpenModalCategory() {
    setCategoryOpenModal(true);
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
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenModalCategory}
          />
        </Fields>

        <Button title="Enviar" />
        <Modal visible={categoryOpenModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalCategory}
          />
        </Modal>
      </Form>
    </Container>
  );
}
