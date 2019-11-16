import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	ScrollView,
	Dimensions,
	TextInput,
	Button
	} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import axios from 'axios';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; 


class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Rendir Gastos',
  };
  constructor(props){
  	super(props)
  	this.Loading=this.Loading.bind(this)
  	this.state = { text: 'Ingrese Texto',
  	 date: '',
  	 name:'Nombre',
  	 tipodoc:'Tipo de Documento',
  	 ndoc:'',
  	 fechagasto:'',
  	 fechaingreso:'',
  	 monto:'',
  	 metodo:'Metodo de pago',
  	 categoria:'Categoria',
  	 proyecto:'Proyecto',
  	 proveedor:'Proveedor',
  	 tipogasto: 'Tipo de Gasto',
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
    that.setState({
      //Setting the value of the date time
      fechagasto:
        date + '/' + month + '/' + year,
      fechaingreso:
      date + '/' + month + '/' + year,
    });
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
      this.state.name,
      this.state.tipodoc,
      this.state.ndoc,
      this.state.fechagasto,
      this.state.fechaingreso,
      "$"+this.state.monto,
      this.state.metodo,
      this.state.categoria,
      this.state.proyecto,
      this.state.proveedor,
      this.state.detalle,
      this.state.tipogasto
    ]
  ]},{params:{
		insertDataOption: 'INSERT_ROWS',
		includeValuesInResponse: false,
		valueInputOption: 'USER_ENTERED',
	}})
  .then(response=>{
	console.log(response)
	this.props.navigation.navigate('success')
})
  })

	

}  	


	render(){
 
		return(
			<View style = {{flex:1,backgroundColor: 'white',alignItems: 'center',}}>
				<ScrollView>
						<Picker
							  selectedValue={this.state.name}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({name: itemValue})
							  }>
							  {this.nombres.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>

						<Picker
							  selectedValue={this.state.tipodoc}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({tipodoc: itemValue})
							  }>
							  {this.tipodoc.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>
						
						<TextInput  
						          placeholder="Numero de Documento"  
						          underlineColorAndroid='transparent'
								  keyboardType={'numeric'}  
								  onChangeText={(value)=>{this.setState({ndoc: value})}}
						/>		

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
					      

					     <TextInput  
						          placeholder="Monto"  
								  keyboardType={'numeric'}  
								  onChangeText={(value)=>{this.setState({monto: value})}}
						/> 

						<Picker
							  selectedValue={this.state.metodo}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({metodo: itemValue})
							  }>
							  {this.metodos.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>
						<Picker
							  selectedValue={this.state.categoria}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({categoria: itemValue})
							  }>
							  {this.categorias.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>

						<Picker
							  selectedValue={this.state.tipogasto}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({tipogasto: itemValue})
							  }>
							  {this.tipogasto.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>

						<Picker
							  selectedValue={this.state.proyecto}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({proyecto: itemValue})
							  }>
							  {this.proyectos.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>

						<Picker
							  selectedValue={this.state.proveedor}
							  style={{height: 50, width:screenWidth}}
							  onValueChange={(itemValue, itemIndex) =>
							    this.setState({proveedor: itemValue})
							  }>
							  {this.proveedores.map((item,index) => {
							    return(<Picker.Item label={item} value={item} key={index}/>)
							  })}
						</Picker>
						
						<TextInput  
						          placeholder="Detalle"  
						          underlineColorAndroid='transparent'
								  onChangeText={(value)=>{this.setState({detalle: value})}}
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
	}
});
export { expenseMenuScreen };