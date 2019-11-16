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
  List,
  ListItem,
} from 'react-native-ui-kitten';
import { Icon } from 'react-native-eva-icons';

const GithubIcon = () => (
  <Icon name='github' width={48} height={48}/>
);
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; //Te entrega el ancho de la pantalla del dispositivo
const StarIcon = () => (
  <Icon name='star'/>
);

class HomeScreen extends React.Component {  //Definicion de la pantalla despues del incicio de sesion

  static navigationOptions = {
    headerLeft: null,
    title: 'Home',    
    headerLayoutPreset: 'center',
    headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
  }


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
      console.error(error);welcome
    }
  };

  componentDidMount(){
    SplashScreen.hide();
  }

    
render(){
  return(

              <ScrollView>
                <ListItem
                  title='Rendir Gastos'
                  onPress={() => this.props.navigation.navigate('Loading')} 
                  icon={StarIcon}
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

}};

export { HomeScreen };