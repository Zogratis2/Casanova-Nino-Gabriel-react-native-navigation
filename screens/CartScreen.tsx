import { View, Text, Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../App'; // Adjust path if App.tsx is in a different location
import { COLORS } from '../styles/GlobalStyles';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { cart, increaseQty, decreaseQty } = useCart();

  // Added: Get manual dark mode state from the theme context in App.tsx
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: theme.textPrimary, marginBottom: 10 }}>Your cart is empty</Text>
              <Text style={{ fontSize: 16, color: theme.textSecondary }}>Add items from the home screen</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.row, { backgroundColor: theme.surface, borderRadius: 12, paddingHorizontal: 10 }]}>
              <Text style={[styles.name, { color: theme.textPrimary }]}>{item.name}</Text>
              <Text style={{ color: theme.textPrimary }}>${item.price * item.quantity}</Text>
              <View style={styles.qtyBox}>
                <Pressable 
                  onPress={() => decreaseQty(item.id)}
                  hitSlop={10}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1
                  })}
                >
                  <Text style={[styles.qtyBtn, { color: theme.textPrimary }]}>-</Text>
                </Pressable>
                <Text style={{ color: theme.textPrimary }}>{item.quantity}</Text>
                <Pressable 
                  onPress={() => increaseQty(item.id)}
                  hitSlop={10}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1
                  })}
                >
                  <Text style={[styles.qtyBtn, { color: theme.textPrimary }]}>+</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
  name: { fontSize: 16 },
  qtyBox: { flexDirection: 'row', alignItems: 'center', 
  gap: 10 },
  qtyBtn: { fontSize: 20, paddingHorizontal: 10 }
});