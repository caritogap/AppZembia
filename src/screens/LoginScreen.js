import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from 'react-native-google-signin';
import { Alert, View, Image, StyleSheet, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; //Te entrega el ancho de la pantalla del dispositivo
const logoZembia = require('./../img/logo.png');

class LoginScreen extends React.Component {
  //Defincion de la pantalla de inicio
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
  }

  async componentDidMount() {
    const userInfo = await this.getCurrentUser();
    if (userInfo !== null) {
      this.checkSignIn(userInfo.user);
    }
    else{
      SplashScreen.hide()

    }
  }

  async signIn() {
    //Funcion Inicio de Sesión
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.checkSignIn(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('3');
      } else {
        // some other error happened
      }
    }
  }

  async checkSignIn(userInfo) {
    //Verifica al principio si el usuario esta loggeado y lo lleva directamente a la siguiente pantalla
    var isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this.props.navigation.navigate('Home', {
        userInfo
      });
    }
  }

  async getCurrentUser() {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={logoZembia}
          style={{
            width: screenWidth * 0.9,
            resizeMode: 'contain',
            alignSelf: 'center',
            position: 'absolute',
            top: screenHeight / 5
          }}
        />
        <View
          style={{
            width: screenWidth / 2,
            height: 20,
            alignSelf: 'center',
            position: 'absolute',
            bottom: (screenHeight * 2.5) / 6
          }}
        >
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c03c22'
  },
  button: {
    color: '#000'
  }
});

export { LoginScreen };
