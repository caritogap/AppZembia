import React from 'react';
import { Alert, View, Image, StyleSheet, Dimensions,Text } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width;


class SuccessScreen extends React.Component{

static navigationOptions = {
    header: null
  };

constructor(props){
	super(props);
}

render(){
return(
	<View style={styles.container}>
		<Image source={require("./../img/checkmark.png")} style={{position: 'absolute', top: screenHeight*0.15}}/>
		<Text style={{color:'white',fontSize: 20, position:'absolute',top:screenHeight*0.6}}> Información subida con éxito </Text>
		<AwesomeButtonRick type="secondary" onPress={()=>{this.props.navigation.navigate('Home')}} style={{position:'absolute',top:screenHeight*0.75}}>Volver a Home</AwesomeButtonRick>
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

});
export { SuccessScreen };