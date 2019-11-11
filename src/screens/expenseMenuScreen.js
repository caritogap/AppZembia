import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	TextInput,
	ScrollView,
	} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';

class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Expenses Menu',
  };
  constructor(props){
  	super(props)
  	this.state = { text: 'Ingrese Texto'};
  	this.state = { date: ''};
  	this.nombres = this.props.navigation.getParam('nombres',null);
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
			<View style = {{flex:1,backgroundColor: '#c03c22',alignItems: 'center',}}>
				<ScrollView>
				
					{/*CONTAINER NOMBRE*/}
					<View style = {styles.container}>
						<RNPickerSelect
				            onValueChange={(value) => console.log(value)}
				            items={[
				                { label: 'Football', value: 'footbaaall' },
				                { label: 'Baseball', value: 'basebaaall' },
				                { label: 'Hockey', value: 'hockaaey' },
			            	]}
			        	/>
					</View>
					{/*CONTAINER TIPO DE DOCUMENTO*/}
					<View style = {styles.container}>
					</View>
					{/*CONTAINER NUMERO DE DOCUMENTO*/}
					<View style = {styles.container}>
						{/*TEXTO*/}
						<View>
							<Text>
								Ingrese Numero de Documento
							</Text>
						</View>

						{/*TEXT INPUT*/}
						<View>
							<TextInput
							    onChangeText={(text) => this.setState({text})}
	      						value={this.state.text}
							/>
						</View>
					</View>

					{/*CONTAINER FECHA DE GASTOS*/}
					<View style = {styles.container}>

						{/*INGRESE FECHA*/}
						<View>
							<Text>
								fecha actual {this.state.date}
							</Text>
						</View>
					
						{/*CALENDARIO*/}
						<View>
							<DatePicker
						        style={{width: 200}}
						        date={this.state.date}
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
						        onDateChange={(date) => {this.setState({date: date})}}
						    />		
						</View>
					</View>
					
					{/*CONTAINER FECHA DE INGRESO*/}
					<View style = {styles.container}>
						
						{/*INGRESE FECHA*/}
						<View>
							<Text>
								fecha actual {this.state.date}
							</Text>
						</View>
					
						{/*CALENDARIO*/}
						<View>
							<DatePicker
						        style={{width: 200}}
						        date={this.state.date}
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
						        onDateChange={(date) => {this.setState({date: date})}}
						    />		
						</View>
					</View>
					{/*CONTAINER MONTO*/}
					<View style = {styles.container}>
					</View>	
					{/*CONTAINER METODO DE PAGO*/}
					<View style = {styles.container}>
					</View>
					{/*CONTAINER CATEGORIA*/}
					<View style = {styles.container}>
					</View>
					{/*CONTAINER PROYECTO*/}
					<View style = {styles.container}>
					</View>
					{/*CONTAINER PROVEDOR*/}
					<View style = {styles.container}>
					</View>
					{/*CONTAINER DESCRIPCION*/}
					<View style = {styles.container}>
					</View>
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