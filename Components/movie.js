import React,{useState} from 'react';
import styles from "./Styles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  
  useColorScheme,
  View,
  
} from 'react-native';

export default function Movie(props){
  const movie_text=()=>{
    try{
      return(
        <Text  style={{color:'black',fontSize:18,fontWeight:'bold',paddingTop:5,paddingLeft:5}}>{props.json.original_title}  ({props.json.release_date.substring(0,4)})</Text>
   
      )
    }
    catch{

    }
  }
  img_uri='https://image.tmdb.org/t/p/original//'+props.json.poster_path;
  return(
  <View style={styles.movie}>
    <TouchableOpacity onPress={() => props.navigation.navigate('Details',
        {
          itemId: props.json.id,
          
        }
        )}>
    <View style={styles.image}>
    
    <Image style={{height:'100%',width:'100%', resizeMode:'cover',}}

        
        source={{
         
          uri:img_uri
          }}/>

    </View>
    {movie_text()}
    </TouchableOpacity>
      
    
    


  </View>);
    
}
