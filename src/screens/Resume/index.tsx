import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryCard from "../../components/HistoryCard";
import { categories } from "../../utils/categories";

import { Container, Header, Title, Content } from "./styles";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TotalByCategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [categoriesTotalList, SetCategoriesTotalList] = useState<
    TotalByCategoryData[]
  >([]);
  async function loadCategories() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const totalByCategory: TotalByCategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    SetCategoriesTotalList(totalByCategory);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <Content>
        {categoriesTotalList.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            title={item.name}
            amount={item.total}
          />
        ))}
      </Content>
    </Container>
  );
}
