import React from 'react';
import Videos from "./../videos";
import Sidebar from './sidebar';

import FactFinder from './../factfinder';
import Feedback from './../feedback';
import Instructions from './../instructions';
import Financial from './../financial';
import Form from '../new_formik/Form';

import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions } from 'react-native';

const HomeScreenRouter = createStackNavigator(
  {
    Default: { screen: FactFinder },
    Videos: { screen: Videos },
    Feedback: { screen: Feedback },
    Instructions: { screen: Instructions },
    Financial: { screen: Financial }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const Container = createDrawerNavigator(
  {
    HomeScreenRouter: { screen: HomeScreenRouter, }
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    drawerWidth: Dimensions.get('window').width * 3 / 4,
  },
);

export default Container;