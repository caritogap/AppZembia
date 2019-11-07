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
  TouchableOpacity} from 'react-native'

const logoZembia = require('./../img/logo.png');

class HomeScreen extends React.Component {  //Definicion de la pantalla despues del incicio de sesion

  static navigationOptions = {
    title: 'Home',
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
        <View style = {{flex: 1,backgroundColor: '#c03c22'}}>
          <Button style ={ styles.signOutButton}
            title = 'Sign Out'
            onPress={this.signOut}
          />
          <Text style = {styles.textWelcome}>
            Welcome {name} !
          </Text>
          <Text>
            {email}
          </Text>
        </View> 

        <View style ={{flex: 6,backgroundColor: '#ffffff'}}>
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
  },
  viewList:{
    width: 360, 
    height: 40,
  },
  signOutButton:{
    
  }
});

export { HomeScreen };