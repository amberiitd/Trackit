import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddScreen from './components/AddScreen';
import HomeScreen from './components/HomeScreen';
import 'react-native-gesture-handler';
import NavMain from './components/NavMain';
import { appstyles, styles } from './styles';
import DevScreen from './components/DevScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <SafeAreaView style={instyles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen name="AddNew" component={AddScreen} 
                    options={{
                        headerStyle: {
                            backgroundColor: 'rgb(10, 204, 204)',
                        }
                    }}
                />
                <Stack.Screen name="Dev" component={DevScreen} 
                    options={{
                        headerStyle: {
                            backgroundColor: 'rgb(10, 204, 204)',
                        }
                    }}
                />
            </Stack.Navigator>
        </SafeAreaView>
    </NavigationContainer>
    
    
  );
}

const instyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
  },
});
