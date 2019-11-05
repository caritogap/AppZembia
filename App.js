import { GoogleSignin } from 'react-native-google-signin'; //Libreria de Google Sign-in
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';

GoogleSignin.configure({
  //Configuración de la libreria Google Sign in
  scopes: ['https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '942044510576-kkoo8hdnm7gs0cn9705kbjggq80nfcs2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceConsentPrompt: false // [Android] if you want to show the authorization prompt at each login.
});

/*Token= async() => {  //Guarda el token de acceso en la variable window.accessToken
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
  


  /*instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'prueba!A1:A5', includeGridData:true }})
  .then(response => {
    v=response.data.sheets[0].data[0].rowData*/
    
    



 // })
  

//}


const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator); //Crea un "contenedor" con todas las pantallas de la App

export default AppContainer;
