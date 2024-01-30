import React from "react";
import { 
    View, 
    StyleSheet 
} from "react-native";
import CurrentWeather from "./src/scenes/currentWeather/currentWeather";
import UpcomingWeather from "./src/scenes/upcomingWeather/upcomingWeather";

const App = () => {
    return (
        <View style={styles.container}>
            <UpcomingWeather />
        </View>
    );
}

const styles=  StyleSheet.create({
    container : {
        flex: 1
    }
});

export default App;