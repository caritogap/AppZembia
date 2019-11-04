import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'; //Libreria de Google Sign-in
import React from 'react';
import { StyleSheet, Text, View ,Image,Dimensions,Button,Alert} from 'react-native';
const screenHeight=Dimensions.get('window').height //Te entrega la altura de la pantalla del dispositivo
const screenWidth=Dimensions.get('window').width //Te entrega el ancho de la pantalla del dispositivo
import { createAppContainer} from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';
const axios=require("axios")



  GoogleSignin.configure({   //Configuración de la libreria Google Sign in 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile

  webClientId: '942044510576-kkoo8hdnm7gs0cn9705kbjggq80nfcs2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
});

signIn = async (t) => {   //Funcion Inicio de Sesión
  await GoogleSignin.signOut()
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({ userInfo });
  } 
  catch(error) {

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } 
    else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      Alert.alert('2')
    }
     else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      Alert.alert('3')
    }
     else {
      // some other error happened
    }

  }

  s=await GoogleSignin.isSignedIn() //Verifica si el usuario esta conectado
  if(s==true){
    t.props.navigation.navigate('afterSignIn') //LLeva a la siguiente pantalla 
  }
};

Token= async() => {  //Guarda el token de acceso en la variable window.accessToken
  Alert.alert('token')
  token= await GoogleSignin.getTokens()
  console.log(token.accessToken)
  window.accessToken=token.accessToken

}

getData = async() =>{  //Funcion que lee los datos de la Spreadsheet
  await Token()
  const instance=axios.create({
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+window.accessToken}
  })


  instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'prueba!A1:A5', includeGridData:true }})
  .then(response => {
    v=response.data.sheets[0].data[0].rowData
    
    



  })
  

}

class HomeScreen extends React.Component {   //Defincion de la pantalla de inicio
  static navigationOptions = {
        header: null
    }

  render() {
     checkSignin(this)
     return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={{width:screenWidth*0.9,resizeMode:'contain',position:'absolute',top:screenHeight/5}}/>
        <View style={{width: screenWidth/2, height:20, alignSelf:'center',position:'absolute',bottom:screenHeight*2.5/6}}>
        <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={()=> signIn(this)}/>
        </View>
      </View>
  )}
}


class afterSignIn extends React.Component{  //Definicion de la pantalla despues del incicio de sesion

  render(){
    
    getData() 
    return(

      <View>
        <Text>User is Signed in </Text>
       </View>


      )
  }

}


const AppNavigator = createStackNavigator({    //Aqui se definen las pantallas que tendra la aplicacion
  Home: HomeScreen,
  afterSignIn:afterSignIn,
},
{
    initialRouteName: 'Home', //La App parte en Home
}
);

const AppContainer = createAppContainer(AppNavigator);  //Crea un "contenedor" con todas las pantallas de la App

checkSignin = async (t) => { //Verifica al principio si el usuario esta loggeado y lo lleva directamente a la siguiente pantalla
  var s= await GoogleSignin.isSignedIn()
  if(s==true){
    t.props.navigation.navigate('afterSignIn')

  }

}

export default function App() 
{
    
    return <AppContainer/>;

}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c03c22',

    },
    button: {

      color:'#000',

    },
  });
