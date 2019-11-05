import React from 'react'
import{View, 
	Text, 
	} from 'react-native'

class expenseMenuScreen extends React.Component {

  static navigationOptions = {
    title: 'Expense Menú',
  };

	render(){

		return(
			<View>
				<Text>

				 menu de gastos
				</Text>
			</View>

			)
	}



}


export { expenseMenuScreen };