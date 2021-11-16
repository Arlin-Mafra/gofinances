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
import { Alert } from "react-native";

export function Signin() {
  const { user, signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
    }
  }

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
          <SigninSocialButton
            title="Entrar com o Google"
            svg={GoogleLogo}
            onPress={handleSignInWithGoogle}
          />
          <SigninSocialButton
            title="Entrar com a Apple"
            svg={AppleLogo}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
