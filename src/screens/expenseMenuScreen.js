import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	ScrollView,
	Dimensions,
	TextInput,
	Button,
	BackHandler,
	Alert
	} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import axios from 'axios';
import { Select,
	Input
	} from 'react-native-ui-kitten';
import { Icon } from 'react-native-eva-icons';

const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; 



class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Rendir Gastos',
  };
  constructor(props){
  	super(props)
  	
  	this.Loading=this.Loading.bind(this)
  	this.backButton=this.backButton.bind(this)
  	
  	this.state = { text: 'Ingrese Texto',
  	 date: '',
  	 name: null,
  	 tipodoc:null,
  	 ndoc:'',
  	 fechagasto:'',
  	 fechaingreso:'',
  	 monto:'',
  	 metodo:null,
  	 categoria:null,
  	 proyecto:null,
  	 proveedor:null,
  	 tipogasto: null,
  	 detalle:'',
  	 id:''
  	};

  	console.log(this.state.name)
  	this.nombres = this.props.navigation.getParam('nombres',null);
  	this.tipodoc = this.props.navigation.getParam('tipodoc',null);
  	this.metodos= this.props.navigation.getParam('metodos',null);
  	this.proyectos=this.props.navigation.getParam('proyectos',null);
  	this.categorias=this.props.navigation.getParam('categorias',null);
  	this.proveedores=this.props.navigation.getParam('proveedores',null);
  	this.tipogasto=this.props.navigation.getParam('tipogasto',null);
  	this.token=this.props.navigation.getParam('token',null)
  	console.log('this.nombres',this.nombres);
  	console.log('token',this.token)
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    BackHandler.addEventListener('hardwareBackPress',this.backButton)
    that.setState({
      //Setting the value of the date time
      fechagasto:
        date + '/' + month + '/' + year,
      fechaingreso:
      date + '/' + month + '/' + year,
    });
    }

    componentWillUnmount() {
    	 BackHandler.removeEventListener('hardwareBackPress', this.backButton);


    }

backButton(){
 	this.props.navigation.navigate('Home')
 	return true 

}
  Loading(){
  	this.loadingButton.showLoading(true)
  	const instance=axios.create({
  timeout:0,
  headers: {'Authorization': 'Bearer '+this.token},
  maxContentLength: Infinity,
  })
  	instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/',{ params: {ranges:'params!O1:O1', includeGridData:true }})
  .then(response=>{
  	this.setState({id:response.data.sheets[0].data[0].rowData[0].values[0].effectiveValue.numberValue})
  	console.log(this.state.id)
  	instance.post('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/values/Rendicion!A:Z:append',{"values": [
    [
      "="+this.state.id+"+1",
      this.state.name.text,
      this.state.tipodoc.text,
      this.state.ndoc,
      this.state.fechagasto,
      this.state.fechaingreso,
      "$"+this.state.monto,
      this.state.metodo.text,
      this.state.categoria.text,
      this.state.proyecto.text,
      this.state.proveedor.text,
      this.state.detalle,
      this.state.tipogasto.text
    ]
  ]},{params:{
		insertDataOption: 'INSERT_ROWS',
		includeValuesInResponse: false,
		valueInputOption: 'USER_ENTERED',
	}})
  .then(response=>{
  	this.loadingButton.showLoading(false)
	console.log(response)
	this.props.navigation.navigate('success')
	
})
  .catch((error)=>{
  	this.loadingButton.showLoading(false)
  })
  })

	this.loadingButton.showLoading(false)

}  	


	render(){
 
		return(
			<View style = {{flex:1,backgroundColor: 'white',alignItems: 'center', height: screenHeight, width: screenWidth }}>
				<ScrollView style={{flex:1}}>
						<Text> Fecha del Gasto </Text>
						<DatePicker
					        style={{width: 200}}
					        date={this.state.fechagasto}
					        mode="date"
					        placeholder="select date"
					        format="DD-MM-YYYY"
					        confirmBtnText="Confirm"
					        cancelBtnText="Cancel"
					        customStyles={{
					          dateIcon: {
					            position: 'absolute',
					            left: 0,
					            top: 4,
					            marginLeft: 0
					          },
					          dateInput: {
					            marginLeft: 36
					          }
					          // ... You can check the source to find the other keys.
					        }}
					        onDateChange={(date) => {this.setState({fechagasto: date})}}
					      />

						 <Select
						  style={styles.select}
				          data={this.nombres}
				          placeholder='Nombre'
				          selectedOption={this.state.name}
				          onSelect={(selectedOption)=>{this.setState({name: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />

				        <Select
						  style={styles.select}
				          data={this.tipogasto}
				          placeholder='Tipo de Gasto'
				          selectedOption={this.state.tipogasto}
				          onSelect={(selectedOption)=>{this.setState({tipogasto: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />

				        <Select
						  style={styles.select}
				          data={this.categorias}
				          placeholder='Categoria'
				          selectedOption={this.state.categoria}
				          onSelect={(selectedOption)=>{this.setState({categoria: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />
										        
						
				        <Select
						style={styles.select}
				          data={this.proveedores}
				          placeholder='Proveedor'
				          selectedOption={this.state.proveedor}
				          onSelect={(selectedOption)=>{this.setState({proveedor: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />

				        <Select
				          style={styles.select}
				          data={this.proyectos}
				          placeholder='Proyecto'
				          selectedOption={this.state.proyecto}
				          onSelect={(selectedOption)=>{this.setState({proyecto: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />

				        <Select
						 style={styles.select}
				          data={this.metodos}
				          placeholder='Metodo de Pago'
				          selectedOption={this.state.metodo}
				          onSelect={(selectedOption)=>{this.setState({metodo: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />    
						
						
						
						<Select
						 style={styles.select}
				          data={this.tipodoc}
				          placeholder='Tipo de Documento'
				          selectedOption={this.state.tipodoc}
				          onSelect={(selectedOption)=>{this.setState({tipodoc: selectedOption})
				          console.log(selectedOption.text)
				      	}}
				        />



				        <Input
					        label='Numero de Documento'
					        placeholder=''
					        value={this.state.ndoc}
					        keyboardType={'numeric'}  
							onChangeText={(value)=>{this.setState({ndoc: value})}}
							size='small'
							style={{width:screenWidth*0.9}}
					      />

				        <Input
					        label='Monto'
					        placeholder=''
					        value={this.state.monto}
					        keyboardType={'numeric'}  
							onChangeText={(value)=>{this.setState({monto: value})}}
							size='small'
							style={{width:screenWidth*0.9}}
					      />
						
						 <Input
					        label='Descripción'
					        placeholder=''
					        value={this.state.detalle}
					        keyboardType={'numeric'}  
							onChangeText={(value)=>{this.setState({detalle: value})}}
							size='large'
							style={{width:screenWidth*0.9}}
					      />		
						
						<AnimateLoadingButton
				          ref={c => (this.loadingButton = c)}
				          width={300}
				          height={50}
				          title="Enviar"
				          titleFontSize={16}
				          titleColor="rgb(255,255,255)"
				          backgroundColor="#c03c22"
				          borderRadius={4}
				          onPress={this.Loading}
				        />

					</ScrollView>		

			</View>		
		)

	}
}
const styles  = StyleSheet.create({
	container:{
		width: 300, 
    	height: 100,
    	alignItems: 'center',
		borderWidth: 2,
    	borderColor: '#000000',
    	backgroundColor:'#ffffff',
		flexDirection:'column',
	},
	select:{

		width: screenWidth*0.9

	}
});
export { expenseMenuScreen };