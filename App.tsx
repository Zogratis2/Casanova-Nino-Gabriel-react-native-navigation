import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, createContext, useContext } from 'react';
import { CartProvider } from './contexts/CartContext';
import AppNavigator from './navigation/AppNavigator';
import { Switch, View } from 'react-native';

// Added: ThemeContext to make the manual dark mode state available globally to all screens
interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false });

export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <CartProvider>
      {/* Added: ThemeProvider to expose isDarkMode to all screens/components */}
      <ThemeContext.Provider value={{ isDarkMode: dark }}>
        <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
          <StatusBar style={dark ? 'light' : 'dark'} />
          <View style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}>
            <Switch value={dark} onValueChange={() => setDark(!dark)} />
          </View>
          <AppNavigator />
        </NavigationContainer>
      </ThemeContext.Provider>
    </CartProvider>
  );
}