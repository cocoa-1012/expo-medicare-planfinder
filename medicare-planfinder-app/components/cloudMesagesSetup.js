
//=========handling  Firbase Notifcations =================//
import React from "react";
import DeviceInfo from 'react-native-device-info';

import messaging, { RemoteMessage } from "@react-native-firebase/messaging";
import database from "@react-native-firebase/database"
import moment from 'moment';
import { AsyncStorage, NativeModules } from "react-native";

export default class PushNotification extends React.Component {
    //==================constructor =====================//
    constructor(props) {
        super(props);
    }
    //===============Component Did mount ==============================//
    componentDidMount() {
        this.requestUserPermission();
        this.messageForAppState();
        this.listenerForAppMessage();

    }
    //====================APP STATE AND NOTIFICATIONS =================//
    messageForAppState = () => {
        //forBackground
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        //for Foreground
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            //alert(JSON.stringify(remoteMessage));
        });
    };
    //======================Listening message ===========================//
    listenerForAppMessage = () => {
        messaging().onMessage(message => {
            console.log("message", message);
        })
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );

        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                }

            });
    };
    //================Requesting for cloud messages =====================//
    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Authorization status:', authStatus);
        let rootRef = database().ref();
        await rootRef
            .child(`showReviewDevices/${DeviceInfo.getUniqueId()}`)
            .once('value')
            .then(async snapshot => {
                if (snapshot.val()) {
                    const lastReviewDate = moment(snapshot.val().lastUpdateTime, 'DD/MM/YYYY');
                    await rootRef
                        .child('reviewDay')
                        .once('value')
                        .then(_snapshot => {
                            const today = moment();
                            const diffDay = today.diff(lastReviewDate, 'day');
                            if (Number(diffDay) >= Number(_snapshot.val())) {
                                NativeModules.Review.rateApp();
                            }
                        });
                }
            });
        if (enabled) {
            const token = await messaging().getToken();
            AsyncStorage.setItem('@token', JSON.stringify(token));
            messaging()
                .subscribeToTopic('Medicare')
                .then(() => console.log('Subscribed to topic!'));
        }
    };
    //===========render if any thing you want ==========================//
    render() {
        return null;
    }

}
