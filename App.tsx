import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NavMain from './components/NavMain';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavMain />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingTop: 40
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
