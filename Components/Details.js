import React,{useState} from 'react';
import styles from "./Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';



import {
  
  Text,
  Image,
  Button,
  
  View,
  
} from 'react-native';

export default function Details({route,navigation}){
   
  const itemId = route.params;
  id=itemId["itemId"];

  const [json,setJson]=useState({});
  const [favourite,setFavourite]=useState(false);
  
 
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
      get_details(id);
    });

    return unsubscribe;
  }, [navigation]);

  const get_details=async(id)=>{
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/'+id+'?api_key=e25eec6bb02a9d3e9aad2f0eeb0580ed&language=en-US', requestOptions
      );
      const json = await response.json();
      
      setJson(json);
      is_favourited(json.id);
      
      
      
 
       } catch (error) {
      console.error(error);
    }
    
    
  }
  const favourite_button=()=>{
    if(favourite==false){
      return <Button title="Favourite" onPress={()=>storeData(json.id)}/>
    }
    else{
      return <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>Favourited!</Text>
    }
  }
  const store_default = async () => {
    try {
      let test={"id":[]};
      let test_string=JSON.stringify(test);
      
      await AsyncStorage.setItem('@storage_Key', test_string)
     
    } catch (e) {
      // saving error
    }
  }
  const is_favourited = async (id) => {
 
    let temporary={}
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      
     
      temporary=(jsonValue != null ? JSON.parse(jsonValue) : store_default());
      
  
      let temp=temporary['id'];
     
      for(let i=0;i<temp.length;i=i+1){
        if(temp[i]==id){
          
          setFavourite(true);
        }
      }
      
    } catch(e) {}
      // e
    
  }
  const storeData = async (id) => {
    let temporary={}
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      

      temporary=(jsonValue != null ? JSON.parse(jsonValue) : store_default());
      
      console.log(temporary);
      try {
      
        let temp=temporary['id'];
        temp.push(id);
        
        temporary["id"]=temp;
       
        
        const jsonValue = JSON.stringify(temporary);
        await AsyncStorage.setItem('@storage_Key', jsonValue);
        
      } catch (e) {
        // saving error
      }
      
    } catch(e) {}
      // e
    
  }
  

  
 
  img_uri='https://image.tmdb.org/t/p/original//'+json.backdrop_path;
  
  
  return(
    
  <View style={styles.details}>
    
  
    <View style={styles.image_back}>
    
    <Image style={{height:'100%',width:'100%', resizeMode:'cover',}}

        
        source={{
          //uri: 'https://i.pinimg.com/736x/bd/b6/13/bdb613ce0ddeff0890e07898c2fb1efb.jpg'
          uri:img_uri
          }}/>

    </View>
    <View style={styles.desc}>
    <Text style={{color:'black',fontWeight:'bold',fontSize:22,}}>{json.title}</Text>
    <Text>{json.vote_average}/10</Text>
    <Text>{json.runtime} mins</Text>

    <Text style={{color:'black'}}>{json.overview}</Text>
    <View style={{marginLeft:100,width:200,marginTop:10}}>
    {favourite_button()}
    </View>
    </View>
    <View>
    
    </View>

    
    
    
  </View>
  );
    
}
