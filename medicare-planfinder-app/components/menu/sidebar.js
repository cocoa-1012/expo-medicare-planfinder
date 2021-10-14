import React from "react";
import { View, Image, AsyncStorage } from 'react-native';
import styles from '../../styles/';
import { Container, Content, Text, List, ListItem, Body } from "native-base";
import { mainImage } from './image';
import { DrawerActions, DrawerView } from 'react-navigation-drawer';

import * as ScreenOrientation from 'expo-screen-orientation';
import analytics from "@react-native-firebase/analytics";
import FastImage from "react-native-fast-image";
import { Dimensions } from "react-native";
import Orientation from "react-native-orientation-locker";
import DeviceInfo from 'react-native-device-info';
import { ScrollView } from "react-native";
export default class Sidebar extends React.Component {
    static navigationOptions = () => ({
    })
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            play: false,
            userId: '',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
        // if (!DeviceInfo.isTablet()) {
        //     Orientation.lockToPortrait();
        // }
    }

    componentDidMount = async () => {
        analytics().logEvent('view_first_tableContent', {
            //switched_to: "video_event"
        });
        console.log("Open side baar");
        const userId = await AsyncStorage.getItem('@Medicare:userId');
        this.setState({ userId });
        Dimensions.addEventListener('change', (e) => {
            const { width, height } = e.window;
            this.setState({
                width, height,
                imageWidth: Dimensions.get('window').width * 2 / 3,
                imageHeight: Dimensions.get('window').height / 4,
            });
            DrawerView.updateWidth = Dimensions.get('window').width * 3 / 4;
        });
    }

    closeDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    };

    openDrawer = () => {

        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    loadInstructionVideo = () => {
        this.closeDrawer();
        this.setState({ play: true });
    }

    fullScreenController = () => {
        this.openDrawer();
        this.setState({ play: false });
    }

    render() {
        let { userId } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.sidebarBody}>
                    <ScrollView>
                        <View style={styles.drawerImage}>
                            <FastImage resizeMode={'contain'} source={require('./drawerImage.png')} style={[styles.mainImage], { width: Dimensions.get('window').width * 2 / 3, height: Dimensions.get('window').height / 4, alignSelf: 'center' }} />
                        </View>
                        <List style={{ flex: 3 }}>
                            <ListItem
                                icon
                                style={styles.sidebarListItem}
                                button
                                onPress={() => {
                                    this.props.navigation.navigate("Instructions", {
                                        userId: userId
                                    });
                                }}>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PlanFinder Instructions</Text>
                                </Body>
                            </ListItem>
                            <ListItem
                                icon
                                style={styles.sidebarListItem}
                                button
                                onPress={() => {
                                    this.props.navigation.navigate("Default", {
                                        userId: userId
                                    });
                                }}>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Medicare FactFinder</Text>
                                </Body>
                            </ListItem>
                            <ListItem
                                icon
                                style={styles.sidebarListItem}
                                button
                                onPress={() => {
                                    this.props.navigation.navigate("Financial", {
                                        userId: userId
                                    });
                                }}>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Financial FactFinder</Text>
                                </Body>
                            </ListItem>
                            <ListItem
                                icon
                                style={styles.sidebarListItem}
                                button
                                onPress={() => {
                                    this.props.navigation.navigate("Videos", {
                                        userId: userId
                                    });
                                }}>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Educational Videos</Text>
                                </Body>
                            </ListItem>
                            <ListItem
                                icon
                                style={styles.sidebarListItem}
                                button
                                onPress={() => {
                                    this.props.navigation.navigate("Feedback", {
                                        userId: userId
                                    });
                                }}>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Client Feedback Form</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
