import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/FontAwesome6';
import CurrentWeather from "./src/scenes/currentWeather/currentWeather";
import UpcomingWeather from "./src/scenes/upcomingWeather/upcomingWeather";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'current') {
                            iconName = focused ? 'house' : 'house';
                        } else if (route.name === 'upcoming') {
                            iconName = focused ? 'umbrella' : 'umbrella';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen 
                    name="current" 
                    component={CurrentWeather}
                    options={{ title: 'Home', headerStyle: styles.headerStyle, headerTintColor: '#fff' }}
                />
                <Tab.Screen 
                    name="upcoming" 
                    component={UpcomingWeather} 
                    options={{ title: 'Upcoming', headerStyle: styles.headerStyle, headerTintColor: '#fff', tabBarBadge: 3 }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles=  StyleSheet.create({
    container : {
        flex: 1
    },
    
    headerStyle: {
        backgroundColor: 'green',
    }
});

export default App;