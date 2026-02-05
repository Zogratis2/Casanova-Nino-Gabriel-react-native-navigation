// Updated CartScreen.tsx – now shows product images exactly like in HomeScreen
import { View, Text, Button, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../App';
import { COLORS, getStyles } from '../styles/GlobalStyles';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { cart, increaseQty, decreaseQty } = useCart();

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const globalStyles = getStyles(isDarkMode);

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
            <View style={globalStyles.card}>
              <Image source={{ uri: item.image }} style={globalStyles.img} />

              <View style={{ flex: 1 }}>
                <Text style={globalStyles.title}>{item.name}</Text>
                <Text style={globalStyles.price}>₱{item.price * item.quantity}</Text>
              </View>

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
                <Text style={{ color: theme.textPrimary, fontSize: 18, fontWeight: 'bold' }}>{item.quantity}</Text>
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
  qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  qtyBtn: { fontSize: 24, paddingHorizontal: 10 }
});