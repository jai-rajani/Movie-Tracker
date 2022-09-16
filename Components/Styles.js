import { StyleSheet } from "react-native";



export default(styles=StyleSheet.create({
    movie:{
    width:170,
    height:300,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    elevation: 10,
    },
    
    image:{
        margin:0,
        padding:0,
        height:210,
        width:170,
        backgroundColor:'grey'

    },

    image_back:{
        flex:1,

    },
    details:{
        flex:1,
        flexDirection:'column',
       
    },
    desc:{
        flex:1,
        padding:10,
        backgroundColor:'white',
    }
}));