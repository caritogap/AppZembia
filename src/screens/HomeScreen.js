import {
  GoogleSignin,
  statusCodes
  } from 'react-native-google-signin';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import{View, 
  Image, 
  Text, 
  Button, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert,Dimensions} from 'react-native';
import {
  Icon,
  List,
  ListItem,
} from 'react-native-ui-kitten';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; //Te entrega el ancho de la pantalla del dispositivo
/*const StarIcon = (style,) => (
  <Icon name='star'/>
);*/


const logoZembia = require('./../img/logo.png');

class HomeScreen extends React.Component {  //Definicion de la pantalla despues del incicio de sesion

  static navigationOptions = {
    headerLeft: null,
    title: 'Home',    
    headerLayoutPreset: 'center',
    headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
  };

  constructor(props) {
    super(props);
    this.userInfo = this.props.navigation.getParam('userInfo', null);
    this.signOut = this.signOut.bind(this);
  }
  
  async signOut() {
    try {
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
      } catch (error) {
      console.error(error);
    }
  };

  componentDidMount(){
    SplashScreen.hide();
  }

  iconSimpleUsageShowcase(){
    return(
      <Icon name='star' width={32} height={32} fill='#3366FF' />
      )
  }
  

  render() {
    var name=this.userInfo.name
    var email=this.userInfo.email
    

  return(

              <ScrollView>
                <ListItem
                  title='Rendir Gastos'
                  onPress={() => this.props.navigation.navigate('Loading')} 
                  Icon={()=>this.iconSimpleUsageShowcase()}
                />
                <ListItem
                  title='Opcion 2'
                  onPress={()=>{Alert.alert('hola1')}}
                />
                <ListItem
                  title='Cerrar Sesión'
                  onPress={this.signOut}
                />
              </ScrollView>
         )
  } 
}

const styles = StyleSheet.create({
  container:{

    //flexDirection:'column',
    /*alignItems: 'center',
    justifyContent: 'center',*/
    backgroundColor: '#c03c22',
  }

});

export { HomeScreen };