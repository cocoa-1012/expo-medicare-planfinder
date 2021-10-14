import React, { Component } from 'react';
import {
    Container,
    View, Text, Content
}
    from 'native-base';
import { ToggleButton, Button } from 'react-native-paper';
import HeaderComponent from './menu/header';
import { Dimensions, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import analytics from '@react-native-firebase/analytics';

const { width } = Dimensions.get("window");

export default class Videos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listView: 'left',
            thumbnail: '',
            userId: this.props.navigation.state.params.userId,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    }

    componentDidMount() {
        analytics().logEvent('video_list_displayed', {
            //switched_to: "video_event"
        }).then(data => {
            console.log("data", data)
        }).catch(err => {
            console.log("err", err);
        });
        analytics().setCurrentScreen("Videos", "Videos");
        Dimensions.addEventListener('change', (e) => {
            console.log('CHANNGED DIMENSIONS');
            const { width, height } = e.window;
            this.setState({ width, height });
        });
    }

    goToFinder = async () => {
        const userId = await AsyncStorage.getItem('@Medicare:userId');
        this.props.navigation.navigate("FactFinder", {
            userId: userId
        });
    };

    render() {
        return (
            <Container>
                <HeaderComponent
                    navigation={this.props.navigation}
                    title="Educational Videos"
                />
                <Content>
                    <View style={{ margin: 10 }}>
                        <Button
                            mode="contained"
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                display: 'flex',
                                position: 'absolute',
                                marginTop: 15,
                                marginLeft: 10,
                                backgroundColor: '#0ea2e2',
                                zIndex: 999999
                            }}
                            onPress={() => this.goToFinder()}
                        >
                            <Text style={{ fontSize: 12, color: '#fff' }}>Medicare Planfinder</Text>

                        </Button>
                        <ToggleButton.Row
                            style={{ flexDirection: 'row', justifyContent: 'flex-end', display: 'flex' }}
                            onValueChange={value => this.setState({ value })}
                            value={this.state.listView}
                        >
                            <ToggleButton
                                style={{ border: 'none', padding: 2 }}
                                icon="view-list"
                                value="left"
                                onPress={() => {
                                    this.setState({ listView: 'left' })
                                }}
                            />
                            <ToggleButton
                                icon="view-grid"
                                value="right"
                                onPress={() => {
                                    this.setState({ listView: 'right' })
                                }}
                            />
                        </ToggleButton.Row>
                    </View>
                    {this.state.listView === 'left' &&
                        <>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Basics</Text>
                                <WebView
                                    style={{ width: width - 20, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=jCEi-oetqG0&userId=${this.state.userId}&name=medicare_basics` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Original Medicare</Text>
                                <WebView
                                    style={{ width: width - 20, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=NJsxk1hhhOw&userId=${this.state.userId}&name=original_medicare` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Part C</Text>
                                <WebView
                                    style={{ width: width - 20, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=nCd46MoE5Ek&userId=${this.state.userId}&name=medicare_part_c` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Part D</Text>
                                <WebView
                                    style={{ width: width - 20, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=f3oJ2i8Yb74&userId=${this.state.userId}&name=medicare_part_d` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medigap</Text>
                                <WebView
                                    style={{ width: width - 20, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=--m9DuWBhbM&userId=${this.state.userId}&name=medigap` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Planning Fringe Benefit®</Text>
                                <WebView
                                    style={{ width: width, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=eR1gJlBTavs&userId=${this.state.userId}&name=benefit_presentation` }}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Long-Term Care</Text>
                                <WebView
                                    style={{ width: width, height: (width * 0.66) }}
                                    javaScriptEnabled={true}
                                    allowsFullscreenVideo
                                    startInLoadingState
                                    source={{ uri: `https://medicarefactfinder.net/video?videoId=T1RmHZy2_JA&userId=${this.state.userId}&name=long_term_care` }}
                                />
                            </View>
                        </>
                    }
                    {this.state.listView === 'right' &&
                        <>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Basics</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=jCEi-oetqG0&userId=${this.state.userId}&name=medicare_basics` }}
                                    />
                                </View>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Original Medicare</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=NJsxk1hhhOw&userId=${this.state.userId}&name=original_medicare` }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Part C</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=nCd46MoE5Ek&userId=${this.state.userId}&name=medicare_part_c` }}
                                    />
                                </View>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Part D</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=f3oJ2i8Yb74&userId=${this.state.userId}&name=medicare_part_d` }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medigap</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=--m9DuWBhbM&userId=${this.state.userId}&name=medigap` }}
                                    />
                                </View>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Medicare Planning Fringe Benefit®</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=eR1gJlBTavs&userId=${this.state.userId}&name=benefit_presentation` }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text style={{ textAlign: 'center', padding: 10, marginTop: 10 }}>Long-Term Care</Text>
                                    <WebView
                                        style={{ width: width / 2, height: (width * 0.5) }}
                                        javaScriptEnabled={true}
                                        allowsFullscreenVideo
                                        startInLoadingState
                                        source={{ uri: `https://medicarefactfinder.net/video?videoId=T1RmHZy2_JA&userId=${this.state.userId}&name=long_term_care` }}
                                    />
                                </View>
                            </View>
                        </>
                    }
                </Content>
            </Container>
        )
    }
}
