import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryCard from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";

import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { useFocusEffect } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

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
  percent: number;
  percentFormatted: string;
}

export function Resume() {
  const [categoriesTotalList, SetCategoriesTotalList] = useState<
    TotalByCategoryData[]
  >([]);

  const theme = useTheme();

  async function loadCategories() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expencivesTotal = expensives.reduce(
      (acumulator: number, expensive: TransactionData) => {
        return acumulator + Number(expensive.amount);
      },
      0
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
        const percent = (categorySum / expencivesTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
          percent,
          percentFormatted,
        });
        console.log(totalByCategory);
      }
    });

    SetCategoriesTotalList(totalByCategory);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      <ChartContainer>
        <VictoryPie
          data={categoriesTotalList}
          colorScale={categoriesTotalList.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: "bold",
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
          x="percentFormatted"
          y="total"
        />
      </ChartContainer>
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
