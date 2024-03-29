import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import FavoriteItemsScreen from './src/screens/FavoriteItemsScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import {Ionicons} from '@expo/vector-icons';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { store } from './store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';

const Stack= createNativeStackNavigator();
const Tab=createBottomTabNavigator();

function HomeStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}
    >
        <Stack.Screen name='HomeStack' component={HomeScreen} />
        <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
       <Provider store={store}>
           <Tab.Navigator
    screenOptions={({route})=>({
      headerShown:false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle:{
        backgroundColor:'#4B5563',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
      },
      tabBarIcon: ({focused ,color, size }) => {
        let iconName
          if(route.name === 'Home'){
            iconName = focused ?  'home' : 'home-outline'
          } else if(route.name === 'Favorite'){
            iconName= focused ? 'heart' : 'heart-outline'
          } else if(route.name === 'Cart'){
            iconName=focused ? 'cart' : 'cart-outline'
          } else if(route.name === 'Orders'){
            iconName=focused ? 'list' : 'list-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor:"white",
      tabBarInactiveTintColor:"black",
    })}
    >
      <Tab.Screen name='Home' component={HomeStack} options={{tabBarLabel:'Home'}} />
      <Tab.Screen name='Favorite' component={FavoriteItemsScreen} options={{tabBarLabel:'Favorite'}} />
      <Tab.Screen name='Cart' component={CartScreen} options={{tabBarLabel:'Cart'}} />
      <Tab.Screen name='Orders' component={OrdersScreen} options={{tabBarLabel:'Orders'}} />
           </Tab.Navigator>
    </Provider>
    <Toast />
    </NavigationContainer>
  );
}


