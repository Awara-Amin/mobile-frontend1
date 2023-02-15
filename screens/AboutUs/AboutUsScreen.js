import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Fonts, Sizes, Colors } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const AboutUsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primary} />
            {header()}
            {aboutInfo()}
        </SafeAreaView>
    )

    function aboutInfo() {
        return (
            <View style={{ flex: 1, margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>

                <Text style={{ ...Fonts.black16Regular, marginVertical: Sizes.fixPadding + 5.0, textAlign: 'justify' }}>
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>

                <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={'black'}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    About Us
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
})

export default AboutUsScreen;