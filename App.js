import React,{useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  
} from 'react-native';
import Movie from './Components/movie';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './Components/Details';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Stack = createNativeStackNavigator();
function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
        
        options={{
          title: 'Movie Watcher',
          headerStyle: {
            backgroundColor: '#000000',
          },
          
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}/>
        <Stack.Screen name="Details" component={Details} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation},props){
  
  
  const [search,setSearch]=useState('');

  const [json,setJson]=useState([]);
 
 
  const [count,setCount]=useState(0);
  const [favourites,setFavourites]=useState([]);
  
  function renderButtons() {
    if(count>0 ){
    
    
    
    return json.map((item,key) => {
        return (
            
            <Movie json={item} navigation={navigation} key={key}/>
        );
    });
  }
  
  else{
    return(
      <Text>No Movies found!</Text>
    )
  }
}

const searchbar=()=>{
  
    return(
      <View style={styles.maincontainer}>



      <View style={styles.input}>
      <TextInput 
      style={styles.inputText} 
      placeholder=' Search for a movie ....                      '
      onChangeText={(val) => setSearch(val)}/>
      <Button 
      title='Search' style={styles.inputButton} onPress={() => search_api_func(search)}
      />
      <View style={{width:100,alignItems:'center'}}>
      
      </View>
      </View>
      </View>

    );
  
}


async function get_data() {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    //console.log(jsonValue);
    let temp=(jsonValue != null ? JSON.parse(jsonValue) : null);
    setFavourites(temp['id']);
    console.log('the ids are ');
    console.log(temp['id']);
    return temp['id']
    
  } catch(e) {
    return 0
    // error reading value
  }
}

const get_favourties=async()=>{
  let favouratives_temp
  favouratives_temp=await get_data();
 
  var temp=[];
 
  for (var i=0;i<favouratives_temp.length;i++){
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/'+favouratives_temp[i]+'?api_key=e25eec6bb02a9d3e9aad2f0eeb0580ed&language=en-US', requestOptions
      );
      const json_temp = await response.json();
      temp.push(json_temp);
      
      
      
      

      } catch (error) {
      console.error(error);
    }
  }
 
  setJson(temp);
  setCount(1);
  
  
  
}
const clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

  
  const search_api_func=async(movie_name)=>{
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
    
      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=e25eec6bb02a9d3e9aad2f0eeb0580ed&language=en-US&page=1&include_adult=false&query="+movie_name, requestOptions
      );
      const json = await response.json();
     
      setJson(json.results);
    
      setCount(Object.keys(json.results).length);
      
     

    } catch (error) {
      console.error(error);
    }
    
    
  }
  const sort_api_func=async(movie_name)=>{
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      console.log(movie_name);
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=e25eec6bb02a9d3e9aad2f0eeb0580ed&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate", requestOptions
      );
      const json = await response.json();
      setJson(json.results);
      setCount(Object.keys(json.results).length);
    } catch (error) {
      console.error(error);
    }
    
    
  }

  
 
  return(
    
    <View style={[styles.container,{flexDirection:'column'}]}>
      
    <ScrollView>
    {searchbar()}
    <View style={{width:500}}>
    <View style={{width:300,padding:20,flexDirection:'row',marginLeft:100}}>
    <Button 
      title='Popular ' style={styles.inputButton} onPress={() => sort_api_func(search)}
      />
      <View style={{marginLeft:20}}>
    <Button title='Your favourites' onPress={()=>get_favourties() }/></View>
    </View>
    

    <View style={styles.movies}>
          {
            renderButtons()
           
            }
    </View>

    
    </View>
   
    </ScrollView>
    </View>
    
  )
}
export default App;
    


const styles=StyleSheet.create({
  container:{
    
    flex:3,
    backgroundColor:'#fff',
    marginLeft:0,
  },
  maincontainer:{
    
    flex:1,
    backgroundColor:'#fff',
  },
  header:{
    backgroundColor:'pink',
    alignItems:'center',
    justifyContent:'center',
    padding:20,
    margin:20,
    

  },
  nav:{
    flexDirection:'row',
  },
  navbar:{
  
  alignItems:'stretch',
  justifyContent:'center',
  alignContent:'center',
  backgroundColor:'black' ,
  },
  backText:{
    textAlign:'center',
    fontSize:16,
    paddingTop:7,
    color:'white',
    flex:0.2,

  },
  navText:{
    textAlign:'center',
    fontSize: 27,
    color:'white',
    flex:0.7,
  },
  inputText:{
    color:'black',
    borderWidth:1,
    borderRadius:15,
    borderColor:'black',
    margin:20,
    
    alignItems:'stretch',

  
  },
  input:{
    
    marginTop:15,
    marginLeft:15,
    flex:4,
    backgroundColor:'lightgrey',
    alignItems:'center',
    borderRadius:30,
    flexDirection:'row',

  },
  inputButton:{
    borderRadius:25,
    backgroundColor:'#99ffcc',
    
    
    
  },
  movies:{
    
    backgroundColor:'lightgrey',
    marginTop:30,
    marginLeft:0,
    flexWrap:"wrap",
    flexDirection:'row',
    alignContent:'flex-start',

  }

  }
);
