/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Dimensions,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Container, Header, Content,Button, Form, Item, Input } from 'native-base';
import axios from 'axios'
import APIS from '../config/api'
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width,height} = Dimensions.get('screen')
const Home: () => React$Node = (props) => {

    const [countryTxt,setCountry] = useState('')
    const [loading,setLoading] = useState(false)
    const [countries,setCountries] = useState([])

    const submit=()=>{
        setLoading(true)
        axios.get(APIS.COUNTRY_API+countryTxt)
        .then(response=>{
            setLoading(false)
            setCountries(response.data) }
        ).catch(error=>{
            setLoading(false)
            setCountries([])
        })
        //alert(countryTxt)
       // props.navigation.push('Detail')
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>props.navigation.push('Detail',item)} style={styles.countryList}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
      );
  return (
    <Container >
    <Header />
    <Content >
      <Form >
        <Item>
          <Input value={countryTxt} onChangeText={txt=>setCountry(txt)}  placeholder="Enter country" />
        </Item>

        {!loading?
        <Button disabled={countryTxt.length==0} onPress={()=>submit()} style={styles.btn}>
            <Text style={styles.btnTxt}>   Submit   </Text>
          </Button>:
          <ActivityIndicator size='large' color='black'/>
        }
      </Form>

      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Content>
  </Container>
    );
};

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
},
btn:{marginVertical:15,paddingHorizontal:20, alignSelf:'center',textAlign:'center'},
btnTxt:{alignSelf:'center',color:'white',fontWeight:'bold'},
countryList:{
    margin:5,
    padding:10,
    borderRadius:10,
    borderWidth:1
}
});

export default Home;
