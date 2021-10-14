/**
 * @provideModule Notification handler
 */
import PushNotification from 'react-native-push-notification';

class NotificationHandler {

    //=================On Notification Handler ====================//
    onNotification(notification) {
        console.log('NotificationHandler:', notification);
        if (typeof this._onNotification === 'function') {
            this._onNotification(notification);
        }
    }

    //===================On register device at fcm /apns ======================//
    onRegister(token) {
        console.log('NotificationHandler:', token);
        if (typeof this._onRegister === 'function') {
            this._onRegister(token);
        }
    }

    //=================For any Action(android) ====================================//
    onAction=(notification)=> {
        console.log ('Notification action received:');
        console.log(notification.action);
        console.log(notification);

        if(notification.action === 'Yes') {
            PushNotification.invokeApp(notification);
        }
    };

    //====== (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError=(err)=> {
        console.log(err);
    };

    //=================attach on register to service ===========================//
    attachRegister(handler) {
        this._onRegister = handler;
    }

    //===================Attaching Notifications ==============================//
    attachNotification(handler) {
        this._onNotification = handler;
    }
   }
  //================= Creating Notification Handler ==========================//
  const handler = new NotificationHandler();
  //===================Configuring service ===================================//
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: handler.onRegister.bind(handler),

    // (required) Called when a remote or local notification is opened or received
    onNotification: handler.onNotification.bind(handler),

    // (optional) Called when Action is pressed (Android)
    onAction: handler.onAction.bind(handler),

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: handler.onRegistrationError.bind(handler),

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
  });
  //=============== Exporting for use in other modules===================//
 export default handler;
