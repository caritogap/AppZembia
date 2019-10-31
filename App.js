import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
  import React from 'react';
  import { StyleSheet, Text, View ,Image,Dimensions,Button} from 'react-native';
  const screenHeight=Dimensions.get('window').height
  const screenWidth=Dimensions.get('window').width

  export default function App() {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={{width:screenWidth*0.9,resizeMode:'contain',position:'absolute',top:screenHeight/5}}/>
        <View style={{width: screenWidth/2, height:20, alignSelf:'center',position:'absolute',bottom:screenHeight*2.5/6}}>
        <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn} />
        </View>
      </View>
    );
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
