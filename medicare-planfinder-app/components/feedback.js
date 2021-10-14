import React, { Component } from 'react';
import { Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { DrawerActions } from 'react-navigation';
import { } from 'expo';
import { Container, View } from 'native-base';
import analytics from '@react-native-firebase/analytics';
import HeaderComponent from './menu/header';
import database from '@react-native-firebase/database';
const { height, width } = Dimensions.get('screen');

export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    }


    componentDidMount() {
        //==========lOGGING EVENT FOR IN APP =========================//
        analytics().logEvent('CFB_open', {

        });
        analytics().setCurrentScreen("ClientFeedback", "ClientFeedback");
        Dimensions.addEventListener('change', (e) => {
            console.log('CHANNGED DIMENSIONS');
            const { width, height } = e.window;
            this.setState({ width, height });
        });
    }

    openDrawer = () => {
        analytics().logEvent('1st_menu_view', {
            //switched_to: "video_event"
        }).then(data => {
            console.log("data", data)
        }).catch(err => {
            console.log("err", err);
        });
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    render() {
        return (
            <Container>
                <HeaderComponent
                    navigation={this.props.navigation}
                    title="Client Feedback Form"
                    useWebKit={false}
                    scalesPageToFit={false}
                    mixedContentMode="always"
                    allowFileAccess={true}
                />
                <WebView
                    source={{ uri: 'https://healthwealth.wufoo.com/forms/q1ji4gp31crmcni/' }}
                    style={{ width: this.state.width, height: this.state.height }}
                    startInLoadingState
                />
            </Container>
        )
    }
}
