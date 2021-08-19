import React from "react";
import { HighilightCard } from "../components/HighilightCard";

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
} from "./styles";

export function DashBoard() {
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
        <HighilightCard />
        <HighilightCard />
        <HighilightCard />
      </HighilightCards>
    </Container>
  );
}
