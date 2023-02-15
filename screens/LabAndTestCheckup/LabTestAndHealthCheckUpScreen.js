import React from "react";
import { Text, View, Image, StatusBar, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MapView, { Marker } from "react-native-maps";
import { Feather, MaterialIcons } from '@expo/vector-icons';

const facilitiesList = [
    {
        id: '1',
        facility: 'Parking available',
    },
    {
        id: '2',
        facility: 'E-Reports available'
    },
    {
        id: '3',
        facility: 'Card accepted'
    },
    {
        id: '4',
        facility: 'Prescription pick up available'
    },
    {
        id: '5',
        facility: 'Report doorstep drop available'
    }
];

const LabTestAndHealthCheckUpScreen = ({ navigation, route }) => {

    const image = route.params.image;
    const name = route.params.name;
    const address = route.params.address;

    const renderItem = ({ item }) => {
        return (
            <View style={{
                ...styles.facilitiesContainerStyle,
                marginTop: item.id == '1' ? Sizes.fixPadding + 5.0 : 0.0,
            }}>
                <Feather name="check" size={17} color="black" />
                <Text style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}>{item.facility} </Text>
            </View >
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={Colors.primary} />
            {header()}
            <FlatList
                ListHeaderComponent={
                    <>
                        {labInfo()}
                        {divider()}
                        {titleInfo({ title: 'Address' })}
                        {addressInfo()}
                        {mapInfo()}
                        {titleInfo({ title: 'Facilities' })}

                    </>
                }
                data={facilitiesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding * 9.0,
                }}
            />
            {massageAndCallNowButton()}
        </SafeAreaView>
    )

    function labInfo() {
        return (
            <View style={styles.labInfoContainerStyle}>
                <Image source={image}
                    style={{ height: 90.0, width: 90.0, borderRadius: Sizes.fixPadding + 5.0, }}
                    resizeMode="cover"
                />
                <View style={{ marginRight: 100.0, marginLeft: Sizes.fixPadding }}>
                    <Text numberOfLines={2} style={{ ...Fonts.black15Bold }}>{name}</Text>
                    <Text numberOfLines={2} style={{ ...Fonts.gray15Regular, marginVertical: Sizes.fixPadding - 5.0 }}>{address}</Text>
                    <Text style={{ ...Fonts.primaryColorRegular }}>Timing:</Text>
                    <Text style={{ ...Fonts.blackRegular, ...styles.labTimeStyle }}>9:00 AM to 8:00 PM</Text>
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGray, height: 1.0, elevation: 2.0 }}></View>
        )
    }

    function titleInfo({ title }) {
        return (
            <Text style={{ ...Fonts.primaryColor20Bold, marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>{title}</Text>
        )
    }

    function addressInfo() {
        return <Text numberOfLines={2} style={{ ...Fonts.blackBold, ...styles.addressTextStyle }}>{address}</Text>
    }

    function mapInfo() {
        return (
            <View style={styles.mapContainerStyle}>
                <MapView
                    style={{ height: 270.0, }}
                    initialRegion={{
                        latitude: 37.33233141,
                        longitude: -122.0312186,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.10,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
                        pinColor={"red"}
                    />
                </MapView>
            </View>
        )
    }

    function massageAndCallNowButton() {
        return (
            <View style={styles.messageAndCallButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.goBack()}
                    style={styles.messageButtonStyle}
                >
                    <Text style={{ ...Fonts.black20Regular }}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.goBack()}
                    style={styles.callNowButtonStyle}
                >
                    <Text style={{ ...Fonts.white20Regular }}>Call Now</Text>
                </TouchableOpacity>
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
                    Lab tests & health checkup
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    labInfoContainerStyle: {
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    labTimeStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding - 3.0
    },
    addressTextStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    mapContainerStyle: {
        borderRadius: Sizes.fixPadding + 5.0,
        marginTop: 5,
        overflow: 'hidden',
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    facilitiesContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 3.0,
    },
    messageAndCallButtonWrapStyle: {
        position: 'absolute',
        height: 75.0,
        backgroundColor: 'white',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        flexDirection: 'row',
        flex: 1,
        borderTopColor: Colors.lightGray,
        borderTopWidth: 0.50,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    messageButtonStyle: {
        flex: 0.50,
        borderColor: Colors.lightGray,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        backgroundColor: 'white',
        marginRight: Sizes.fixPadding,
    },
    callNowButtonStyle: {
        flex: 0.50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        backgroundColor: Colors.primary,
        marginLeft: Sizes.fixPadding,
    }
})

export default LabTestAndHealthCheckUpScreen;