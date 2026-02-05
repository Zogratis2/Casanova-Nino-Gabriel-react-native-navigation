import { View, Text, Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';


export default function CartScreen() {
const navigation = useNavigation();
const { cart, increaseQty, decreaseQty } = useCart();


return (
<View style={{ padding: 20,
flex: 1 }}>
  <View style={{ flex: 1 }}>
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#666', marginBottom: 10 }}>Your cart is empty</Text>
          <Text style={{ fontSize: 16, color: '#888' }}>Add items from the home screen</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>${item.price * item.quantity}</Text>
          <View style={styles.qtyBox}>
            <Pressable 
              onPress={() => decreaseQty(item.id)}
              hitSlop={10}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1
              })}
            >
              <Text style={styles.qtyBtn}>-</Text>
            </Pressable>
            <Text>{item.quantity}</Text>
            <Pressable 
              onPress={() => increaseQty(item.id)}
              hitSlop={10}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1
              })}
            >
              <Text style={styles.qtyBtn}>+</Text>
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