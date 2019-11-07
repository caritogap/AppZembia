import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	TextInput,
	} from 'react-native';
import DatePicker from 'react-native-datepicker'

class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Expense Menú',
  };
  constructor(props){
  	super(props)
  	this.state = { text: 'Ingrese Texto'};
  	this.state = { date: ''}
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

				{/*CONTAINER INPUT TEXT*/}
				<View style = {styles.container}>

					{/*TEXTO*/}
					<View>
						<Text>
							menu de gastos
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
			
				{/*CONTAINER CALENDARIO*/}
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