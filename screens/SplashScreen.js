import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Colors } from "../constant/styles";

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Welcome')
    }, 2000);

    return (
        <View style={styles.pageStyle}>
            <Image
                source={require('../assets/images/icon.png')}
                style={{ height: 100.0, width: 100.0, borderRadius: 70.0 }}
                resizeMode="contain"
            >
            </Image>
        </View>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SplashScreen;