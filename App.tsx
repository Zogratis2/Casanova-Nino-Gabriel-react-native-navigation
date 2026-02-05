import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import AppNavigator from './navigation/AppNavigator';
import { Switch, View } from 'react-native';


export default function App() {
const [dark, setDark] = useState(false);


return (
<CartProvider>
<NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
<StatusBar style={dark ? 'light' : 'dark'} />
<View style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}>
<Switch value={dark} onValueChange={() => setDark(!dark)} />
</View>
<AppNavigator />
</NavigationContainer>
</CartProvider>
);
}