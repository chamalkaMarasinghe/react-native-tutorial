import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome6';
import CurrentWeather from "./src/scenes/currentWeather/currentWeather";
import UpcomingWeather from "./src/scenes/upcomingWeather/upcomingWeather";


const Tab = createMaterialTopTabNavigator();

const App = () => {

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    const getToken = async() => {
        const token = await messaging().getToken();
        console.log(`firebase token : ${token}`);
    }

    useEffect(() => {
        //.........................................
        //createing local notification channel using push notifications
        PushNotification.createChannel(
            {
                channelId: "channel-02",
                channelName: "testingChannel"
            },
            created => console.log(`my channel:  ${created}`)
        );//falls means channel is already exists

        //create fire base notifications for remote notifications
        requestUserPermission();
        getToken();
        
        //background handler - firebase
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled when app in the background!', remoteMessage);
        });

        //foreground handler - fire base
        messaging().onMessage(async remoteMessage => {
            // Handle foreground notifications
            console.log('Message handled when app in the foreground!', remoteMessage.notification);
            // Display notification manually if needed
            // You may use a third-party library like react-native-push-notification
            // to display the notification
            PushNotification.localNotification({
                channelId: "channel-02",
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body
            });

        });
    }, [])

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'green'} barStyle={'light-content'}/>
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: {
                        backgroundColor: 'white', // Set the color of the indicator line
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: 'green' }
                }}
            >
                <Tab.Screen 
                    name="current" 
                    component={CurrentWeather}
                    options={{ 
                        title: 'Home', 
                    }}
                />
                <Tab.Screen 
                    name="upcoming" 
                    component={UpcomingWeather} 
                    options={{ 
                        title: `Upcomings`,
                        tabBarLabel: ({ focused, color }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{color: 'white', marginRight: 10}}>UPCOMINGS</Text>
                                <Text style={styles.badge}>5</Text>
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>  
    );
}

const styles=  StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',

    },

    container : {
        flex: 1
    },
    
    headerStyle: {
        backgroundColor: 'green',
    },

    badge : {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 1,
        color: 'gray',
        backgroundColor: 'white',
        width: 20,
        textAlign: 'center',
        borderRadius: 20
    }
});

export default App;