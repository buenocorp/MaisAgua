import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Animated,
  Easing,
  Vibration
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class Bebi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ml: "",
      total: 0,
      meta: 0,
      resultadoText: "",
      atingiuMeta: false
    };
    this.getLitros();

    this.animatedValue = new Animated.Value(0);
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

  vibrate = (duration) => {
    //const DURATION = 10000;
    //const PATTERN = [1000, 2000, 3000];

    Vibration.vibrate(duration);
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MaisAguaMeta");
      const state = this.state;
      if (value !== null) {
        state.meta = value;

        this.setState(state);
      }
    } catch (e) {
      state.meta = 0;

      this.setState(state);
    }
  };

  adicionar = () => {
    this.vibrate(200);
    const soma = parseFloat(this.state.ml || 200) + this.state.total;
    const state = this.state;

    if (soma <= 0) {
      state.total = 0;
    } else {
      state.total = soma;
    }

    state.resultadoText = `${state.total / 1000} litros`;
    state.ml = "";

    this.setState(state);

    this.storeLitros();

    this.verificaMeta();
    //Vibration.cancel();
  };

  storeLitros = async () => {
    try {
      await AsyncStorage.setItem("@MaisAguaLit", String(this.state.total));
    } catch (e) {
      // saving error
    }
  };

  getLitros = async () => {
    try {
      const value = await AsyncStorage.getItem("@MaisAguaLit");
      const state = this.state;
      if (value !== null) {
        state.total = parseFloat(value);
        state.resultadoText = `${value / 1000} litros`;
        this.setState(state);
      }
    } catch (e) {
      state.total = 0;

      this.setState(state);
    }

    this.verificaMeta();
  };

  verificaMeta = () => {
    const state = this.state;
    if ((this.state.total / 1000 >= this.state.meta) && (this.state.total > 0) && (this.state.meta >0)) {
      state.atingiuMeta = true;
    } else {
      state.atingiuMeta = false;
    }

    this.setState(state);
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  render() {
    this.getData();
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });
    const meta = (
      <Animated.Text
        style={{
          fontSize: textSize,
          marginTop: 10,
          color: "green"
        }}
      >
        Atingiu a meta!
      </Animated.Text>
    );
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 180 }}
          source={{
            uri:
              "https://olhardigital.com.br/uploads/acervo_imagens/2019/02/r16x9/20190226124316_1200_675.jpg"
          }}
        />
        <Text style={styles.meta}>Minha meta: {this.state.meta}</Text>
        <View>{this.state.atingiuMeta ? meta : null}</View>
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
  resultado: {
    alignSelf: "center",
    color: "gray",
    fontSize: 50,
    textAlign: "justify",
    padding: 5
  },
  meta: {
    alignSelf: "center",
    color: "gray",
    fontSize: 18,
    textAlign: "justify",
    padding: 5
  }
};
