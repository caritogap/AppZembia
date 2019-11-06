import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from 'react-native-google-signin';
import { Alert, View, Image, StyleSheet, Dimensions,Text } from 'react-native';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; //Te entrega el ancho de la pantalla del dispositivo
const logoZembia = require('./../img/logo.png');
import { PacmanIndicator } from 'react-native-indicators';

function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
  if ((new Date().getTime() - start) > milliseconds) {
   break;
  }
 }
}


class LoadingScreen extends React.Component{
	static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

	}


	async componentDidMount(){

	}

	

	render(){

		return(

			 <View style={styles.container}>
				<PacmanIndicator color='white' size={60}/>
				<Text style={styles.text}> Getting everything ready... </Text>
			</View>

		)

	}


}

const styles = StyleSheet.create({
  container: {
  	flexDirection:'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c03c22'
  },
  button: {
    color: '#000'
  },
text: {
  color: 'white',
  fontSize: 16,
  position: 'absolute',
  bottom: screenHeight/2.5,
}

});

export { LoadingScreen };
