import React, { Component } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";

export default class Bebi extends Component {
  constructor(props) {
    super(props);
    this.state = { ml: '', total: 0, resultadoText: "" };
  }

  static navigationOptions = {
    title: "Mais Água",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    headerStyle: {
      backgroundColor: "#6495ED"
    },
    headerTintColor: "#FFF" //"#6dc4a4"
  };

  adicionar = () => {
    const soma = parseFloat(this.state.ml || 200) + this.state.total;
    const state = this.state;

    if (soma <= 0) {
      state.total = 0;
    } else {
      state.total = soma;
    }

    state.resultadoText = `${state.total / 1000} litros`;
    state.ml='';

    this.setState(state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 180 }}
          source={{
            uri:
              "https://olhardigital.com.br/uploads/acervo_imagens/2019/02/r16x9/20190226124316_1200_675.jpg"
          }}
        />
        <Text style={styles.resultado}>{this.state.resultadoText}</Text>
        <View style={styles.entradas}>
          <TextInput
            placeholder="200ml"
            style={styles.input}
            keyboardType="numeric"
            maxLength={5}
            value={this.state.ml}
            onChangeText={ml => {
              this.setState({ ml });
            }}
          />
        </View>

        <Button title="Adicionar" color={"#6495ED"} onPress={this.adicionar} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center"
  },
  entradas: {
    flexDirection: "row"
  },
  input: {
    textAlign: "center",
    width: 100,
    fontSize: 30,
    marginTop: 15,
    color: "gray",
    borderRadius: 10
  },
  card: {
    width: 250
  },
  resultado: {
    alignSelf: "center",
    color: "gray",
    fontSize: 50,
    textAlign: "justify",
    padding: 5
  },
  obs: {
    alignSelf: "center",
    color: "gray",
    fontSize: 18,
    padding: 35,
    textAlign: "justify"
  }
};
