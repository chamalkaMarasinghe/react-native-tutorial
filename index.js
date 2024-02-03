/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onRegister: function(token) {
        console.log("tokn: ", token);
    },

    //this funciton is called when the notification is ciicked
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },

    channedID: 'channel-02',
    
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    //this configure is required if not used remote notifications
    requestPermissions: Platform.OS === 'ios'
});

AppRegistry.registerComponent(appName, () => App);
