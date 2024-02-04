import React, {useEffect, useRef, useState} from "react";
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Animated,
    Easing,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableOpacity
} from "react-native";
import PushNotification from "react-native-push-notification";
import Icon from 'react-native-vector-icons/MaterialIcons';

const UpcomingWeather = () => {

    const spinValue = useRef(new Animated.Value(0)).current;
    const [orientation, setOrientation] = useState('portrait');
    //used to control the spinner when refreshing the scrolling view
    const [Refreshing, setRefreshing] = useState(false);

    const [data, setData] = useState(
        [
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
            {
                time: "2024-08-30",
                temp_min: 3,
                temp_max: 6,
                weather: "clear"
            },
            {
                time: "2024-09-30",
                temp_min: 3,
                temp_max: 6,
                weather: "rainy"
            },
            // ...
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
            {
                time: "2024-08-30",
                temp_min: 3,
                temp_max: 6,
                weather: "clear"
            },
            {
                time: "2024-09-30",
                temp_min: 3,
                temp_max: 6,
                weather: "rainy"
            },
        ]
    );

    //used to rotate the sync icon
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    //task at the refreshment flatlist
    const handleRefresh = () => {
        setRefreshing(true);
        setData([{
            time: "2027-09-30",
            temp_min: 3,
            temp_max: 6,
            weather: "rainy"
        }, ...data]);
        setRefreshing(false);
    };
    
    const sendNotification = (item) =>{
        PushNotification.localNotification({
            channelId: "channel-02",
            title: `Weather report for ${item.time}`,
            message: `It's a ${item.weather} day`
        });
        PushNotification.getChannels(function (channel_ids) {
            console.log(channel_ids); // ['channel_id_1']
        });
    }

    //used to rotating animation of the sync icon 
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


    //used to detect the orientation of the mobile device
    useEffect(() => {
        const updateOrientation = () => {
            const { width, height } = Dimensions.get('window');
            setOrientation(width > height ? 'landscape' : 'portrait');
        };
        updateOrientation(); // Initial check
        Dimensions.addEventListener('change', updateOrientation);
        // return () => {
        //     // Cleanup event listener on component unmount
        //     Dimensions.removeEventListener('change', updateOrientation);
        // };
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../../assets/images/background1.jpg')} style={{flex: 1}}>
                <ImageBackground
                    source={require('../../../assets/images/weather.jpg')}
                    style={styles.bgImage}
                >
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Upcoming Weather</Text>
                    </View>
                </ImageBackground>
                <FlatList
                    refreshControl={
                        <RefreshControl 
                            refreshing={Refreshing}
                            onRefresh={handleRefresh}
                            colors={['red']}
                        />
                    }
                    data={data}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.touchableOpacityForCard}
                            onPress={() => {sendNotification(item)}}
                        >
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
                        </TouchableOpacity>
                    )}
                    //according to the orientation of the mobile device two different styling was applied
                    style={orientation === "portrait" ? styles.listPortrait : styles.listLandscape}
                    contentContainerStyle={styles.listContent}
                />                
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bgImage: {
        flex: 0.6,
        overflow: 'hidden',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
    },

    banner: {
        flex: 1,
        paddingTop: "10%",
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    bannerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        width: '80%',
        textAlign: 'center'
    },

    listLandscape: {
        flex: 1,
        position: 'absolute',
        top: "45%",
        left: 0,
        right: 0,
        bottom: 0,
    },

    listPortrait: {
        flex: 1,
        position: 'absolute',
        top: "15%",
        left: 0,
        right: 0,
        bottom: 0,
    },

    listContent: {
        alignItems: 'center',
    },

    touchableOpacityForCard: {
        width: "100%"
    },

    card: {
        backgroundColor: '#a9e681',
        // backgroundColor: 'rgba(49, 163, 62 0.5)',
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
    }
});

export default UpcomingWeather;