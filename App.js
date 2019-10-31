import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
  import React from 'react';
  import { StyleSheet, Text, View ,Image,Dimensions,Button,Alert} from 'react-native';
  const screenHeight=Dimensions.get('window').height
  const screenWidth=Dimensions.get('window').width
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

  GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile

  webClientId: '942044510576-kkoo8hdnm7gs0cn9705kbjggq80nfcs2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
});

signIn = async () => {
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

  await GoogleSignin.signIn();
  var {accessToken} =  await GoogleSignin.getTokens();

};

class HomeScreen extends React.Component {
  static navigationOptions = {
        header: null
    }
  render() {
     return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={{width:screenWidth*0.9,resizeMode:'contain',position:'absolute',top:screenHeight/5}}/>
        <View style={{width: screenWidth/2, height:20, alignSelf:'center',position:'absolute',bottom:screenHeight*2.5/6}}>
        <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={signIn} />
        </View>
      </View>
  )}
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
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
