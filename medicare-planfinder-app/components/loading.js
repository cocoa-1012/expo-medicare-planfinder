import React, {Component} from 'react';
import { View } from 'native-base';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import styles from './../styles/';
import analytics from '@react-native-firebase/analytics';

export default class Loading extends Component {

    constructor(props) {
        super(props);
    }

    makeid =(length) =>{
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     };

    async componentDidMount() {
        try {
            await Expo.Font.loadAsync({
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
            });

            let dte = new Date();
            const userId = await AsyncStorage.getItem('@Medicare:userId');
            if (userId !== null) {
                await AsyncStorage.setItem('@Medicare:userId', userId);
                Analytics().setUserId(userId);
                Analytics().logEvent('login', {
                    date_time: dte.toString()
                });
                this.props.navigation.navigate('HomeScreenRouter', {
                    userId: userId
                });
            } else {
                const newUserId = this.makeid(20);
                analytics().setUserId(newUserId);
                analytics().setUserProperties({
                    first_open: dte.toString()
                });
                analytics().logEvent('sign_up', {
                    date_time: dte.toString()
                });
                await AsyncStorage.setItem('@Medicare:userId', newUserId);
                this.props.navigation.navigate('HomeScreenRouter', {
                    userId: newUserId
                });
            }
        } catch(e) {
            console.log(e);
            this.props.navigation.navigate('HomeScreenRouter');
        }
    }

    render() {
        return (
            <View style={styles.gif}>
                <ActivityIndicator size="large" color="#0ea2e2"/>
            </View>
        )
    }
}
