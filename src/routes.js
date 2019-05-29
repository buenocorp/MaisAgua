import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import React from 'react';

import Icon from "react-native-vector-icons/Ionicons";
//https://oblador.github.io/react-native-vector-icons/

import Main from "./pages/main";
import Bebi from "./pages/bebi";

const HomeStack = createStackNavigator({ Main });
const BebiStack = createStackNavigator({ Bebi });

HomeStack.navigationOptions = {
  tabBarLabel: "Configurações",
  tabBarIcon: (
    <Icon name="md-settings" size={18} color="#999" />
  )
};

BebiStack.navigationOptions = {
  tabBarLabel: "Mais Água",
  tabBarIcon: (
    <Icon name="ios-water" size={18} color="#999" />
  )
};

/*
const Routes = createAppContainer(
  createBottomTabNavigator({
      Home: Main,
      Bebi: Bebi,
    })
);*/

const Routes = createAppContainer(
  createBottomTabNavigator(
    {
      BebiStack,
      HomeStack
      
    },
    {
      tabBarOptions: {
        activeTintColor: "#6495ED",
        inactiveTintColor: "gray"
      }
    }
  )
);

export default Routes;
