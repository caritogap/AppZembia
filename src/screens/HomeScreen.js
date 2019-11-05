import React from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends React.Component {
  //Definicion de la pantalla despues del incicio de sesion
  constructor(props) {
    super(props);

    this.userInfo = this.props.navigation.getParam('userInfo', null);
    console.log('this.userInfo', this.userInfo);
  }

  render() {
    const { email, name } = this.userInfo;

    return (
      <View>
        <Text>User is Signed in </Text>
        <Text>{email}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}

export { HomeScreen };
