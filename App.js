import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CurrentWeather from "./src/scenes/currentWeather/currentWeather";
import UpcomingWeather from "./src/scenes/upcomingWeather/upcomingWeather";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="current" 
                    component={CurrentWeather} 
                    options={{ 
                        title: 'Home', 
                        headerStyle: styles.headerStyle, 
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen 
                    name="upcoming" 
                    component={UpcomingWeather} 
                    options={{ 
                        title: 'Upcoming Weather', 
                        headerStyle: styles.headerStyle, 
                        headerTintColor: '#fff' 
                    }}
                />
            </Stack.Navigator>
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