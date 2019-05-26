import React, { Component } from "react";
import { View, Text, TextInput, Button, Image} from "react-native";
import CardView from "react-native-cardview";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { ml: 0, massa: 0, resultadoText: "" };
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

  calcular = () => {
    const aguaPadrao = this.state.ml || 35; //padrão 35 ml
    const copoPadrao = 200;

    const aguaIdeal = aguaPadrao * this.state.massa;
    const copos = aguaIdeal / copoPadrao;
    const qtdMl = (aguaIdeal / 1000).toFixed(3);
    const state = this.state;
    state.resultadoText = `Deve tomar ${qtdMl} litros de água(${Math.round(copos)} copos/dia)`;

    this.setState(state);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 250, height: 180}}
          source={{uri: 'https://olhardigital.com.br/uploads/acervo_imagens/2019/02/r16x9/20190226124316_1200_675.jpg'}}
        />
        <TextInput
          placeholder="padrão 35ml/kg"
          style={styles.input}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={ml => {
            this.setState({ ml });
          }}
        />
        <View style={styles.entradas}>
          <CardView
            style={styles.card}
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
          >
            <Text style={styles.resultado}>{this.state.resultadoText}</Text>

            <TextInput
              placeholder="kg"
              style={styles.input}
              keyboardType="numeric"
              maxLength={7}
              onChangeText={massa => {
                this.setState({ massa });
              }}
            />

            <Button
              title="Calcular"
              color={"#6495ED"}
              onPress={this.calcular}
            />
          </CardView>
        </View>
        <Text style={styles.obs}>
          Lembrando que a água não pode ser substituída por outros líquidos como
          chás, sucos, refrigerantes, etc
        </Text>
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
    width: "100%",
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
    fontSize: 20,
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
