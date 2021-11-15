import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import LogoSvg from "../../assets/logo.svg";
import GoogleLogo from "../../assets/google.svg";
import AppleLogo from "../../assets/apple.svg";
import { SigninSocialButton } from "../../components/SigninSocialButton";

import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function Signin() {
  const { user } = useAuth();
  console.log(user);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton title="Entrar com o Google" svg={GoogleLogo} />
          <SigninSocialButton title="Entrar com a Apple" svg={AppleLogo} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
