import React from 'react';
import{View, 
	Text,
	StyleSheet, 
	} from 'react-native';

class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Expense Menú',
  };
  constructor(props){
  	super(props)
  }

	render(){
		return(

			<View style = {{flex:1,backgroundColor: '#fff3a6'}}>

				{/*CONTAINER*/}
				<View style = {styles.container}>
					{/*TEXTO*/}
					<View>
						<Text>
							menu de gastos
						</Text>
					</View>
					{/*TEXT INPUT*/}
					<View>
						<Text>
							menu de gastos
						</Text>
					</View>

				</View>

			</View>
		)
	}
}
const styles  = StyleSheet.create({
	container:{
		width: 360, 
    	height: 100,
		borderWidth: 2,
    	borderColor: '#fff3a6',
    	backgroundColor:'#ffffff',
		flexDirection:'column',
	}
});
export { expenseMenuScreen };