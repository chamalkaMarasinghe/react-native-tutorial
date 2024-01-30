import React, {useEffect, useRef} from "react";
import { 
    View,
    Text,
    ImageBackground,
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
        weather: "cloudy"
    },
    {
        time: "2024-03-30",
        temp_min: 3,
        temp_max: 6,
        weather: "rainy"
    },
    {
        time: "2024-05-30",
        temp_min: 3,
        temp_max: 6,
        weather: "cloudy"
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
            <ImageBackground
                source={require('../../../assets/images/weather.jpg')}
                style={styles.bgImage}
            >
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Upcoming Weather</Text>
                </View>
            </ImageBackground>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.leftBall}>
                            {
                                item.weather === 'sunny' ? <Icon name="sunny" size={40} style={{color: 'white'}}/> :
                                item.weather === 'cloudy' ? <Icon name="cloud" size={40} style={{color: 'white'}}/> :
                                item.weather === 'rainy' ? <Icon name="cloudy-snowing" size={40} style={{color: 'white'}}/> :
                                <Icon name="sunny" size={40} style={{color: 'white'}}/>
                            }
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.date}>{item.time}</Text>
                            <Text style={styles.nature}>{item.weather}</Text>
                            <Text style={styles.temp}>Maximum : {item.temp_max} Minimum : {item.temp_min}</Text>
                        </View>
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
    },

    bgImage: {
        flex: 0.3,
        marginBottom: 15
    },

    banner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    bannerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        width: '80%'
    },

    list: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    card: {
        backgroundColor: '#a9e681',
        flexDirection: 'row',
        alignItems: 'center',
        width: "80%",
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
        // width: 95,
        marginLeft: -25,
        marginRight: 10,
        borderRadius: 50
    },

    details: {
        paddingTop: 10,
        paddingBottom: 10
    },

    date: {
        fontSize: 20,
        color: '#2f610f'
    },

    temp: {
        fontSize: 15
    },

    nature: {
        fontSize: 18
    },
    
    sync: {
        flex: 1,
        alignItems: 'flex-end',
        // backgroundColor: 'red',
    }
});

export default UpcomingWeather;