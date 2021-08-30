import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import InputForm from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryOpenModal, setCategoryOpenModal] = useState(false);

  const [category, setCategory] = useState({
    key: "Categoria",
    name: "category",
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionType(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseModalCategory() {
    setCategoryOpenModal(false);
  }
  function handleOpenModalCategory() {
    setCategoryOpenModal(true);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm placeholder="nome" name="name" control={control} />
          <InputForm placeholder="preço" name="amount" control={control} />
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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
