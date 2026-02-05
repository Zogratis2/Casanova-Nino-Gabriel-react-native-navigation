// Updated CheckoutScreen.tsx – now shows product images exactly like in HomeScreen
import { View, Text, Button, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../App';
import { COLORS, getStyles } from '../styles/GlobalStyles';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const { cart, clearCart } = useCart();

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const globalStyles = getStyles(isDarkMode);

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
      <View style={{ flex: 1 }}>
        {cart.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: theme.textPrimary }}>Your cart is empty</Text>
          </View>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={globalStyles.card}>
              <Image source={{ uri: item.image }} style={globalStyles.img} />

              <View style={{ flex: 1 }}>
                <Text style={globalStyles.title}>{item.name}</Text>
                <Text style={globalStyles.price}>₱{item.price * item.quantity}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <Text style={{ fontSize: 22, marginVertical: 20, color: theme.textPrimary, textAlign: 'center', fontWeight: 'bold' }}>
        Total: ₱{total}
      </Text>

      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}