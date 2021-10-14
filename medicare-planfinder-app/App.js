import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Root } from "native-base";
import Loading from './components/loading';
import HomeScreenRouter from './components/menu/';

const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    HomeScreenRouter
  },
  {
    initialRouteName: 'Loading',
    backBehavior: 'initialRoute'
  }
));
//com.sigmasolve.medicareplanfinder
export default () => <Root><App /></Root>;
