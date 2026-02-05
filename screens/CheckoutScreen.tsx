import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../App'; // Adjust path if App.tsx is in a different location
import { COLORS } from '../styles/GlobalStyles';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { cart, clearCart } = useCart();

  // Added: Get manual dark mode state from the theme context in App.tsx
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout successful', 'Thank you for your purchase!', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Home' as never);
        }
      }
    ]);
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: theme.background }}>
      {cart.map((item) => (
        <View 
          key={item.id} 
          style={{
            backgroundColor: theme.surface,
            padding: 15,
            marginVertical: 8,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: theme.textPrimary, fontSize: 16 }}>
            {item.name} - ${item.price * item.quantity}
          </Text>
        </View>
      ))}
      <Text style={{ fontSize: 20, marginVertical: 20, color: theme.textPrimary }}>
        Total: ${total}
      </Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}