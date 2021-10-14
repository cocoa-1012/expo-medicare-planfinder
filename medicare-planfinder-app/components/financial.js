import React, { Component } from 'react';
import { Dimensions, NativeModules } from 'react-native';
import { WebView } from 'react-native-webview';
import { DrawerActions } from 'react-navigation';
import { } from 'expo';
import { Container, View } from 'native-base';
import HeaderComponent from './menu/header';
import analytics from '@react-native-firebase/analytics';

const { height, width } = Dimensions.get('screen');

export default class Financial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.state.params.userId,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
        // NativeModules.Review.rateApp();
    }

    componentDidMount() {
        //================Logging event =============================//
        analytics().logEvent('finacial_form_started', {
            switched_to: "fincial_end"
        });

        analytics().setCurrentScreen("Financial", "Financial");
        Dimensions.addEventListener('change', (e) => {
            console.log('CHANNGED DIMENSIONS');
            const { width, height } = e.window;
            this.setState({ width, height });
        });
    }

    openDrawer = () => {
        analytics().logEvent('1st_menu_view', {
            //switched_to: "video_event"
        });
        console.log("Is this called  wow");
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    render() {
        return (
            <Container>
                <HeaderComponent
                    navigation={this.props.navigation}
                    title="Financial FactFinder"
                    useWebKit={false}
                    scalesPageToFit={false}
                    mixedContentMode="always"
                    allowFileAccess={true}
                />
                <WebView
                    source={{ uri: 'https://healthwealth.wufoo.com/forms/z1p45wrl0i9nt17/' }}
                    style={{ width: this.state.width, height: this.state.height }}
                    startInLoadingState
                />
            </Container>
        )
    }
}
