import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <TextInput
        placeholder="Nome"
        autoCorrect={false}
        testID="test-name"
        value="Arlin"
      />
      <TextInput
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Mafra"
        testID="test-surname"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
