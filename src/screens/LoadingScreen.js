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
import axios from 'axios'


class LoadingScreen extends React.Component{
	static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);
    this.Token=this.Token.bind(this)
    this.getColumnSizes=this.getColumnSizes.bind(this)
    this.state={
      token: null,
    }
    this.getData=this.getData.bind(this)
	}


	async componentDidMount(){
    await this.Token()
    console.log('token',this.state.token)
    await this.getColumnSizes()

    
	}

  async getColumnSizes() {  //Funcion que lee los datos de la Spreadsheet
  const instance=axios.create({
  timeout:0,
  headers: {'Authorization': 'Bearer '+this.state.token},
  maxContentLength: 2000000,
  })
  var filas=[]

    instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!N1:N12', includeGridData:true }})
  .then(response => {
    v=response.data.sheets[0].data[0].rowData
    for(var x in v){
      filas[x]=v[x].values[0].effectiveValue.numberValue
    }
    
  
 }).then(()=>{
  console.log(filas)
  this.getData(filas)
})
}

async getData(filas){
  
  const instance=axios.create({
  timeout:0,
  headers: {'Authorization': 'Bearer '+this.state.token},
  maxContentLength: 2000000,
  })

var nombres=[]
var tipodoc=[]
  instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!A1:A'+filas[0], includeGridData:true }})
.then(response=>{
    v=response.data.sheets[0].data[0].rowData
    for(var x in v){
        nombres.push(v[x].values[0].formattedValue)
      }
      console.log(nombres)
  }).then(()=>{
instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!B1:B'+filas[1], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      tipodoc.push(v[x].values[0].formattedValue)
    }
    console.log(tipodoc)
})
console.log(nombres,tipodoc)
}).then(this.props.navigation.navigate('expenseMenu', {names: nombres, tipodoc: tipodoc}));




}





  async Token(){  //Guarda el token de acceso en la variable window.accessToken
  Alert.alert('token')
  token= await GoogleSignin.getTokens()
  console.log(token.accessToken)
  this.setState({token:token.accessToken})
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
