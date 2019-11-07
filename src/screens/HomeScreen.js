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
  TouchableOpacity} from 'react-native';

const logoZembia = require('./../img/logo.png');

class HomeScreen extends React.Component {  //Definicion de la pantalla despues del incicio de sesion

  static navigationOptions = {
    header: null,
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

  render() {
    var name=this.userInfo.name
    var email=this.userInfo.email
    return(
      <View style ={{flex:1}}>

        {/*ENCABEZADO DE PANTALLA HOME*/}
        <View style = {{flex: 1,backgroundColor: '#c03c22'}}>

          {/*WELCOME EN ENCABEZADO*/}
          <View style = {{flex: 2, justifyContent:'center'}}>
            <Text style = {styles.textWelcome}>
              Welcome to Home, {name} !
            </Text>
          </View>

          {/*PIES DEL ENCABEZADO*/}
          <View style= {{flex:1,flexDirection:'row'}}>
            
            {/*INFO EN PIES DEL ENCABEZADO*/}
            <View style = {styles.info}>
              <Text style = {styles.infotext}>
                LOGIN IN: {email}
              </Text>
            </View>

            {/*BOTON SIGNOUT EN PIES DEL ENCABEZADO*/}
            <View style = {styles.signOutButton}>
              <Button 
                title = 'Sign Out'
                onPress={this.signOut}
              />
            </View>

          </View>

        </View> 

        {/*PANTALLA DE LISTADO*/}
        <View style ={{flex: 4,backgroundColor: '#c03c22',alignItems: 'center',}}> 
          <ScrollView>
            <TouchableOpacity
              onPress = {()=> this.props.navigation.navigate('Loading')}>
              <View style = {styles.viewList}>
                <Text style = {styles.textList}>
                  Ingresar Gastos
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style = {styles.viewList}>
                <Text style = {styles.textList}>
                  Ingresar ..
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style = {styles.viewList}>
                <Text style = {styles.textList}>
                  Ingresar ..
                </Text>
              </View>
            </TouchableOpacity>   
          </ScrollView>
        </View>  
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  textWelcome: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 25,
  },
  textList:{
    color: '#000000',
    fontSize: 20,
    alignSelf: 'center',
  },
  viewList:{
    width: 300, 
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor:'#ffffff',

  },
  signOutButton:{
    width: 80, 
    height: 50, 
    
  },
  info:{
    flex:2,

  },
  infotext:{
    color: '#ffffff',
    textAlign: 'center',
  }
});

export { HomeScreen };