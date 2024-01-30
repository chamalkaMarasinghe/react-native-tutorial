import React, {useEffect, useRef} from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Animated,
    Easing,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
    {
        time: "2024-01-30",
        temp_min: 3,
        temp_max: 6,
        weather: "clear"
    },
    {
        time: "2024-02-30",
        temp_min: 3,
        temp_max: 6,
        weather: "clear"
    },
    {
        time: "2024-03-30",
        temp_min: 3,
        temp_max: 6,
        weather: "clear"
    },
];

const UpcomingWeather = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
    Animated.loop(
        Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
        })
    ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
    });

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.leftBall}><Text></Text></View>
                        <Text style={styles.date}>{item.time}</Text>
                        <View style={styles.sync}>
                            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                                <Icon name="sync" size={40}/>
                            </Animated.View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },

    list: {
        flex: 1,
        alignItems: 'center'
    },

    card: {
        backgroundColor: '#a9e681',
        flexDirection: 'row',
        alignItems: 'center',
        width: 320,
        marginBottom: 10,
        borderRadius: 5,
        paddingRight: 10,
        overflow: 'hidden',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },

    leftBall: {
        backgroundColor: '#2f610f',
        padding: 30,
        width: 80,
        marginLeft: -35,
        marginRight: 10,
        borderRadius: 50
    },

    date: {
        fontSize: 20,
    },
    
    sync: {
        flex: 1,
        alignItems: 'flex-end',
        // backgroundColor: 'red',
    }
});

export default UpcomingWeather;