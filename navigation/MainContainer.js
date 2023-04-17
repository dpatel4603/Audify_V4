import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home_screen from './screens/HomeScreen';
import Help_and_options from './screens/HelpAndOptionsScreen';
import Audiogram_screen from './screens/Audiogram';
import Recorder from './screens/Recorder_1';
import Icon from 'react-native-vector-icons/Ionicons';

function HomeScreen() {
  return (
    <Home_screen/>
   
  );
}

function Audiogram() {
  return (
    <Audiogram_screen/>
  
  );
}

function HelpOptions() {
  return (
    <Help_and_options/>
  
  );
}


function Recorder_1() {
  return(
    <Recorder/>
  )
}
const Tab = createBottomTabNavigator();




export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Audiogram') {
            iconName = focused ? 'options' : 'options-outline';
          } else if (route.name === 'Recording') {
            iconName = focused ? 'mic' : 'mic-outline';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Audiogram" component={Audiogram} />
      <Tab.Screen name="Recording" component={Recorder_1} />
      <Tab.Screen name="Help" component={HelpOptions} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}