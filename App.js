import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createButtonTabNavigator } from 'react-navigation-tabs';


const Logo = () => <Text>Lalala</Text>

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button 
        title="Ir a detalle"
        onPress={() => navigation.navigate('Detalle', { user_id: 2})}
      />
      <StatusBar style="auto" />
    </View>
  );
}
HomeScreen.navigationOptions = {
  headerTitle: () => <Logo />,
  headerStyle: {
    backgroundColor: '#222',
  },
}
const DestalleScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0)
  const incrementar = () => setCont(cont + 1)

  useEffect(() => {
    navigation.setParams({ incrementar })
  }, [cont])
  return (
    <View style={styles.container}>
      <Text>Pantalla detalle {cont}</Text>
      <Button 
        title="Login"
        onPress={() => navigation.navigate("MiModal")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

DestalleScreen.navigationOptions = ({ navigation, navigationOptions}) => {
  return {
    title: navigation.getParam('title', 'Cargando...'),
    headerRight: () =>
    <Button 
      onPress={navigation.getParam('incrementar')}
      title="Mas 1"
      color='#fff'
    />
  }
}
const AppNavigator = createButtonTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Detalle: {
    screen: DestalleScreen,
  }
}, { 
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#00eecc'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
})
const RootStack = createStackNavigator({
  Main: AppNavigator,
  MiModal: () => <Text>Lalala</Text>
}, {
  mode: 'modal',
  headerMode: 'none',
})

export default createAppContainer(RootStack)

//export default createAppContainer(AppNavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
