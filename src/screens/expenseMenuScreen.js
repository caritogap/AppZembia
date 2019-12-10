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
const screenHeight = Dimensions.get('window').height; //Te entrega la altura de la pantalla del dispositivo
const screenWidth = Dimensions.get('window').width; 
import NetInfo from "@react-native-community/netinfo";


class expenseMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Rendir Gastos',
    headerLeft: null,
    headerLayoutPreset: 'center',
    headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },

  };
  constructor(props){
  	super(props)
  	
  	this.Loading=this.Loading.bind(this)
  	this.backButton=this.backButton.bind(this)
  	
	  this.state = {
		  date: '',
		  name:null,
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
	 id: '',
	 hidden: false,  
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
  Loading() {
    
    if (this.state.name === 'Nombre') {
      Alert.alert('Por favor seleccione su Nombre')
      return 0;
    }

    if (this.state.tipogasto === 'Tipo de Gasto') {
      Alert.alert("Por favor seleccione el Tipo de Gasto");
      return 0;
    }
		
    if (this.state.categoria === 'Categoria') {
      Alert.alert("Por favor seleccione Categoria");
      return 0;
    }

    if (this.state.proveedor === 'Proveedor') {
      Alert.alert("Por favor seleccione Proveedor")
      return 0;
    }

    if (this.state.proyecto === 'Proyecto') {
      Alert.alert("Por favor seleccione Proyecto")
      return 0;
    }

    if (this.state.metodo === 'Metodo de Pago') {
      Alert.alert("Por favor seleccione Metodo de Pago")
      return 0;
    }

    if (this.state.tipodoc === 'Tipo de Documento') {
      Alert.alert("Por favor seleccione Tipo de Documento")
      return 0;
    }
    if (this.state.monto === '') {
      Alert.alert("Por favor ingrese Monto")
      return 0;
    }
	  
    this.loadingButton.showLoading(true)
    NetInfo.isConnected.fetch().then(async (isConnected) => {
      if (isConnected === true) {
        const instance = axios.create({
          timeout: 0,
          headers: { 'Authorization': 'Bearer ' + this.token },
          maxContentLength: Infinity,
        })
        instance.get('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/', { params: { ranges: 'params!O1:O1', includeGridData: true } })
          .then(response => {
            this.setState({ id: response.data.sheets[0].data[0].rowData[0].values[0].effectiveValue.numberValue })
            console.log(this.state.id)
            instance.post('https://sheets.googleapis.com/v4/spreadsheets/1ffvR3ii1wmgMmjvEwZLIZjmBiY1D8zM8ImJGayT0slA/values/Rendicion!A:Z:append', {
              "values": [
                [
                  "=" + this.state.id + "+1",
                  this.state.name,
                  this.state.tipodoc,
                  this.state.ndoc,
                  this.state.fechagasto,
                  this.state.fechaingreso,
                  "$" + this.state.monto,
                  this.state.metodo,
                  this.state.categoria,
                  this.state.proyecto,
                  this.state.proveedor,
                  this.state.detalle,
                  this.state.tipogasto
                ]
              ]
            }, {
              params: {
                insertDataOption: 'INSERT_ROWS',
                includeValuesInResponse: false,
                valueInputOption: 'USER_ENTERED',
              }
            })
              .then(response => {
                this.loadingButton.showLoading(false)
                console.log(response)
                this.props.navigation.navigate('success')
	
              })
              .catch((error) => {
                this.loadingButton.showLoading(false)
                Alert.alert('Oops! Algo salio mal')
              })
          })
      }
      else {
        Alert.alert('Por favor conectate a Internet')
      }
      this.loadingButton.showLoading(false)

    });
  }


	render(){
		const options=["hola","holi"]
		return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          height: screenHeight,
          width: screenWidth
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text> Fecha del Gasto </Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.fechagasto}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ fechagasto: date });
            }}
          />

          <Picker
            mode="dropdown"
            selectedValue={this.state.name}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ name: itemValue })
            }
          >
            {this.nombres.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.tipogasto}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ tipogasto: itemValue })
            }
          >
            {this.tipogasto.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.categoria}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ categoria: itemValue })
            }
          >
            {this.categorias.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
		      </Picker>
				
          
          <Picker
            mode="dropdown"
            selectedValue={this.state.proveedor}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ proveedor: itemValue })
            }
          >
            {this.proveedores.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.proyecto}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ proyecto: itemValue })
            }
          >
            {this.proyectos.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.metodo}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ metodo: itemValue })
            }
          >
            {this.metodos.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>

          <Picker
            mode="dropdown"
            selectedValue={this.state.tipodoc}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ tipodoc: itemValue })
            }
          >
            {this.tipodoc.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>


          <Input
            label="Numero de Documento"
            placeholder=""
            value={this.state.ndoc}
            keyboardType={"numeric"}
            onChangeText={value => {
              this.setState({ ndoc: value });
            }}
            size="small"
            style={{ width: screenWidth * 0.9 }}
          />

          <Input
            label="Monto"
            placeholder=""
            value={this.state.monto}
            keyboardType={"numeric"}
            onChangeText={value => {
              this.setState({ monto: value });
            }}
            size="small"
            style={{ width: screenWidth * 0.9 }}
          />

          <Input
            label="Descripción"
            placeholder=""
            keyboardType={"default"}
            value={this.state.detalle}
            onChangeText={value => {
              this.setState({ detalle: value });
            }}
            size="large"
            style={{ width: screenWidth * 0.9 }}
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
    );

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
});
export { expenseMenuScreen };