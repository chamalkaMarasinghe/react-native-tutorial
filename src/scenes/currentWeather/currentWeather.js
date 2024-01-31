import React from "react";
import { 
    SafeAreaView, 
    View, 
    Text,
    StyleSheet, 
    Button,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CurrentWeather = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeAreaStyling}>
            <ScrollView>
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <Icon  name="light-mode" size={150}/>
                        <Text style={styles.temp}>6</Text>
                        <Text style={styles.feels}>Feels Like 5</Text>
                        <View>
                            <Text style={styles.highlow}>High : 8</Text>
                            <Text style={styles.highlow}>Low : 6</Text>
                        </View>
                        {/* <Button title="upcomings" onPress={() => {navigation.navigate('upcoming')}}/> */}
                    </View>
                    <View style={styles.bodyWrapper}>
                        <Text style={styles.condition}>It's Sunny</Text>
                        <Text style={styles.description}>Lorem Z ipsum dolor sit amet, consectetur adipiscingrure dolor in reprehenderit in vol</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles=  StyleSheet.create({
    safeAreaStyling : {
        flex: 1,
    },

    wrapper : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor : '#a1d158',
        paddingTop: 15,
        paddingBottom: 15
    },

    container: {
        flex: 1,
        alignItems: 'center'
    },
    
    temp :{
        fontSize: 60,
        textAlign: 'center'
    },
    
    feels : {
        fontSize: 45,
        textAlign: "center"
    },

    highlow: {
        fontSize: 35
    },

    bodyWrapper: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 155
    },

    condition : {
        fontSize: 30
    },

    description: {
        fontSize: 25,
        // textAlign: 'justify'
    }
});

export default CurrentWeather;