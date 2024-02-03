import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome6';
import CurrentWeather from "./src/scenes/currentWeather/currentWeather";
import UpcomingWeather from "./src/scenes/upcomingWeather/upcomingWeather";


const Tab = createMaterialTopTabNavigator();

const App = () => {

    useEffect(() => {
        //.........................................
        //createing notification channel
        // PushNotification.createChannel({
        //     channelId: "channel-01",
        //     channelName: "testingChannel"
        // });
    }, []);

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