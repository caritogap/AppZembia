import React from 'react'
import{View, Image, Text, Button} from 'react-native'


class HomeScreen extends React.Component{  //Definicion de la pantalla despues del incicio de sesion

  render(){
    
      return(
        <View style ={{flex:1}}>
          <View style ={{flex: 1,backgroundColor: '#c03c22'}}>
            <Image source={require('./../../logo.png')} style={{width: 180, height: 70,alignSelf: 'center',}} />
          </View>  
          <View style ={{flex: 2,backgroundColor: '#22f705'}}>
            <Text> 
              
            </Text>
           </View> 

          <View style ={{flex: 2,backgroundColor: '#0509f7'}}>
            <Text>FFFFF</Text>
            <Button 
              title = "press me"
            />

          </View> 
          <View style ={{flex: 2,backgroundColor: '#c03c22'}}>
            <Text>FFFFF</Text>
          <Button 
              title = "press me"
            />
          </View>  
        </View>
      )
    } 
  }

  export {HomeScreen};