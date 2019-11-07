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
    this.Token=this.Token.bind(this);
    this.getColumnSizes=this.getColumnSizes.bind(this);
    this.state={
  
      token: null,
  
    }
    this.getData=this.getData.bind(this);
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
  maxContentLength: Infinity,
  })

  var nombres=[]
  var tipodoc=[]
  var categorias=[]
  var proyectos=[]
  var proveedores=[]
  var metodos=[]
  var tipogasto=[]
  var dataReady=[0,0,0,0,0,0,0]
  var check
  instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!A1:A'+filas[0], includeGridData:true }})
.then(response=>{
  
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      nombres.push(v[x].values[0].formattedValue)
    }
  
  console.log(nombres)
  dataReady[0]=1
  check=dataReady.reduce((a, b) => a + b, 0)
  if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }
})

  instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!B1:B'+filas[1], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      tipodoc.push(v[x].values[0].formattedValue)
    }
    console.log(tipodoc)
    dataReady[1]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }

})

instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!C1:C'+filas[2], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      categorias.push(v[x].values[0].formattedValue)
    }
    console.log(categorias)
    dataReady[2]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }
})

instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!K1:K'+filas[10], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      metodos.push(v[x].values[0].formattedValue)
    }
    console.log(metodos)
    dataReady[3]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }
})

instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!L1:L'+filas[11], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      tipogasto.push(v[x].values[0].formattedValue)
    }
    console.log(tipogasto)
    dataReady[4]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }
})

instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'Proyectos!B3:B'+filas[3], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      proyectos.push(v[x].values[0].formattedValue)
    }
    console.log(proyectos)
    dataReady[5]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});;
  }
})

instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'Terceros!B2:B'+filas[4], includeGridData:true }})
.then(response=>{
  v=response.data.sheets[0].data[0].rowData
  for(var x in v){
      proveedores.push(v[x].values[0].formattedValue)
    }
    proveedores.sort()
    proveedores.unshift('Proveedor')
    console.log(proveedores)
    dataReady[6]=1
    check=dataReady.reduce((a, b) => a + b, 0)
    if(check===7){
    this.props.navigation.navigate('expenseMenu',{nombres: nombres, tipodoc:tipodoc, metodos:metodos, categorias:categorias, proyectos:proyectos, proveedores:proveedores});
  }
})





}





  async Token(){  //Guarda el token de acceso en la variable window.accessToken
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
