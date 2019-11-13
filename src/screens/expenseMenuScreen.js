import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	ScrollView,
	Dimensions,
	TextInput,
	} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; 


class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Rendir Gastos',
  };
  constructor(props){
  	super(props)
  	this.state = { text: 'Ingrese Texto',
  	 date: '',
  	 name:'Nombre',
  	 tipodoc:'Tipo Doc.',
  	 ndoc:'',
  	 fechagasto:'',
  	 fechaingreso:'',
  	 monto:'',
  	 categoria:'Categoria',
  	 proyecto:'Proyecto',
  	 detalle:''
  	};
  	console.log(this.state.name)
  	this.nombres = this.props.navigation.getParam('nombres',null);
  	this.tipodoc = this.props.navigation.getParam('tipodoc',null);
  	console.log('this.nombres',this.nombres);
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
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