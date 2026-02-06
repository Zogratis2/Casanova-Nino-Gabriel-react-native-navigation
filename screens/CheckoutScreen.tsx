import { View, Text, FlatList, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../App';
import { COLORS, getStyles } from '../styles/GlobalStyles';

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();

  // 👇 USING NEW FUNCTION
  const { cart, checkoutAndReduceStock } = useCart();

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const globalStyles = getStyles(isDarkMode);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = cart.length === 0;

  const handleCheckout = () => {
    Alert.alert('Checkout successful', 'Thank you for your purchase!', [
      {
        text: 'OK',
        onPress: () => {
          checkoutAndReduceStock();   // ✅ STOCK DECREASES HERE
          navigation.navigate('Home' as never);
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: theme.background }}>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={globalStyles.cartEmptyContainer}>
            <Text style={globalStyles.cartEmptyTitle}>Your cart is empty</Text>
            <Text style={globalStyles.cartEmptySubtitle}>Nothing to checkout</Text>
          </View>
        }

        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Image source={{ uri: item.image }} style={globalStyles.img} />

            <View style={{ flex: 1 }}>
              <Text style={globalStyles.title}>{item.name}</Text>

              <Text style={globalStyles.checkoutQuantityText}>
                Quantity: {item.quantity}
              </Text>

              <Text style={globalStyles.price}>
                ₱{item.price * item.quantity}
              </Text>
            </View>
          </View>
        )}
      />

      {!isEmpty && (
        <View>
          <View style={globalStyles.cartTotalRow}>
            <Text style={globalStyles.cartTotalText}>Total</Text>
            <Text style={globalStyles.cartTotalText}>₱{total}</Text>
          </View>

          <Button title="Checkout" onPress={handleCheckout} />
        </View>
      )}

    </View>
  );
}
