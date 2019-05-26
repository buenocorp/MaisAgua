import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import React from 'react';

import Icon from "react-native-vector-icons/Ionicons";

import Main from "./pages/main";
import Bebi from "./pages/bebi";

const HomeStack = createStackNavigator({ Main });
const BebiStack = createStackNavigator({ Bebi });

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: (
    <Icon name="md-home" size={18} color="#999" />
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
      HomeStack,
      BebiStack
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
