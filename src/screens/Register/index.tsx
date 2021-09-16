import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
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

const Schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor deve ser positivo")
    .required("Valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  function handleTransactionType(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenModalCategory() {
    console.log(categoryModalOpen);
    setCategoryModalOpen(true);
  }

  function handleCloseModalCategory() {
    console.log(categoryModalOpen);
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("O tipo de transação é obrigatório");
    }

    // if (category.key === "category") {
    //   return Alert.alert("Selecione uma categoria");
    // }
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
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
          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseModalCategory}
            />
          </Modal>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
