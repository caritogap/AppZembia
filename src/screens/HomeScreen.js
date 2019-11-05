import React from 'react'
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
    console.log('this.userInfo', this.userInfo);
  }

  render() {
    const { email, name } = this.userInfo;
    
    return(
      <View style ={{flex:1}}>
        <View style = {{flex: 1,backgroundColor: '#c03c22'}}>
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
              onPress = {()=> this.props.navigation.navigate('expenseMenu')}>
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
});

export { HomeScreen };


