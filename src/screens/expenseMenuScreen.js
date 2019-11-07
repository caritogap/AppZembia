import React from 'react'
import{View, 
	Text, 
	} from 'react-native'

class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Expense Menú',
  };
  constructor(props){
  	super(props)
  	this.names = this.props.navigation.getParam('names', null);
  	this.tipodoc= this.props.navigation.getParam('tipodoc', null)
  	console.log('Nombres',this.names)
  }

	render(){
		return(
			<View>
				<Text>
				 
				</Text>
			</View>
		)
	}
}
export { expenseMenuScreen };