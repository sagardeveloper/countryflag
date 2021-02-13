/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';
const { width, height } = Dimensions.get('screen')
import { SvgCssUri } from 'react-native-svg';
import { Container, Button, Thumbnail, Header, Content, Form, Item, Input } from 'native-base';
import APIS from '../config/api'
import axios from 'axios'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const Home: () => React$Node = (props) => {
    const data = props.route.params;

    const [weather, setWeather] = useState({});
    const [weatherView, setView] = useState(false);
    const getWeather = () => {
        if (data.capital.length == 0) {
            alert('no data found!')
            return;
        }

        const url = APIS.WEATHER_API + APIS.KEY + '&query=' + data.capital
        console.log('url', url)
        axios.get(url)
            .then(response => {
                setWeather(response.data.current);
                setView(true)
            }
            ).catch(error => {
                alert('Something went wrong, please try again later!')


            })
    }

    return (
        <ScrollView automaticallyAdjustContentInsets={true} style={{backgroundColor:'blue',display:'flex'}}>
            <Container >
                    <SvgCssUri
                        style={styles.flatImg}
                        width="90%"
                        height='30%'
                        uri={data.flag}
                    >
                    </SvgCssUri>
                <Content style={styles.container}>
                    <Text style={styles.countryList}>Details page</Text>
                    <Text style={styles.countryList}>Capital - {data.capital}</Text>
                    <Text style={styles.countryList}>Population - {data.capital}</Text>
                    <Text style={styles.countryList}>Lat-{data.latlng[0]} , Lng - {data.latlng[1]} </Text>
                    
                    <Button onPress={() => getWeather()} style={styles.btn}>
                        <Text style={styles.btnTxt}>   Capital Weather   </Text>
                    
                   
                   
                   </Button>
                  
                   

                    {weatherView ?
                        <>
                            <Text style={styles.countryList}>Temperature - {weather.temperature}</Text>
                            <Text style={styles.countryList}>Wind Speed - {weather.wind_speed}</Text>
                            <Text style={styles.countryList}>Precip - {weather.precip}</Text>
                            <Image style={styles.weatherIcon} source={{ uri: weather.weather_icons[0] }} />
                        </> : null}
                </Content>

            </Container>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    countryList: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        display: 'flex',
    },
    flatImg: {
        width: width,
        alignSelf: 'center',
        backgroundColor:'red'
    },
    btn: { 
        marginVertical: 15, 
        marginTop:100,
        paddingHorizontal: 20, 
        alignSelf: 'center', 
        textAlign: 'center' },
    btnTxt: { alignSelf: 'center', color: 'white', fontWeight: 'bold' },
    weatherIcon: {
        width: width * 0.4,
        height: width * 0.4,
        alignSelf:'center'
    }

});

export default Home;
