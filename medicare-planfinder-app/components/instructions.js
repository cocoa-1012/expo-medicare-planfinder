import React, { Component } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { DrawerActions, DrawerView } from 'react-navigation';
import { Container, View } from 'native-base';
import * as ScreenOrientation from 'expo-screen-orientation';
import HeaderComponent from './menu/header';
import styles from '../styles/';
import analytics from '@react-native-firebase/analytics';
import YoutubePlayer from 'react-native-youtube-iframe';
const { height, width } = Dimensions.get('screen');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
export default class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        console.log('this.state.width', this.state.width);
        //==========lOGGING EVENT FOR IN APP =========================//
        //this.playerRef.
        analytics().logEvent('instruction_start', {
            switched_to: "nothing_to_do"
        });
        analytics().setCurrentScreen("Instructions", "Instructions");
        Dimensions.addEventListener('change', (e) => {
            const { width, height } = e.window;
            this.setState({ width, height });
            // DrawerView.updateWidth = Dimensions.get('window').width * 3 / 4;
        });
    }

    componentWillUnmount() {

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


    onVideoStateChange = (event) => {
        if (event === "ended") {
            analytics().logEvent('instruction_end', {
                switched_to: "nothing_to_do"
            });
        }
    };
    render() {
        return (
            <View style={{ width: this.state.width, height: this.state.height }}>
                <HeaderComponent
                    navigation={this.props.navigation}
                    title="PlanFinder Instructions"
                    useWebKit={false}
                    scalesPageToFit={false}
                    mixedContentMode="always"
                    allowFileAccess={true}
                />
                <YoutubePlayer
                    onReady={() => this.setState({ loading: false })}
                    height={Dimensions.get('window').height * 3 / 4}
                    width={Dimensions.get('window').width}
                    forceAndroidAutoplay={Platform.OS === 'android'}
                    onChangeState={this.onVideoStateChange}
                    ref={(ref) => this.playerRef = ref}
                    videoId={'a70gfYfgsB4'} />
                {/*<WebView*/}
                {/*onLoad={() => this.setState({loading:false})}*/}
                {/*source={{uri: 'https://www.youtube.com/embed/kPUZtmD20EU?modestbranding=1&rel=0&autoplay=0&showinfo=0'}}*/}
                {/*style={{ flex: 1 }}*/}
                {/*/>*/}
                {this.state.loading &&
                    <View style={styles.gif}>
                        <ActivityIndicator size="large" color="#0ea2e2" />
                    </View>
                }
            </View>
        )
    }
}
