import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';


export default function CartScreen() {
const navigation = useNavigation();
const { cart, increaseQty, decreaseQty } = useCart();


return (
<View style={{ padding: 20 }}>
<FlatList
data={cart}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => (
<View style={styles.row}>
<Text style={styles.name}>{item.name}</Text>
<Text>${item.price * item.quantity}</Text>
<View style={styles.qtyBox}>
<TouchableOpacity onPress={() => decreaseQty(item.id)}><Text style={styles.qtyBtn}>-</Text></TouchableOpacity>
<Text>{item.quantity}</Text>
<TouchableOpacity onPress={() => increaseQty(item.id)}><Text style={styles.qtyBtn}>+</Text></TouchableOpacity>
</View>
</View>
)}
/>
<Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout' as never)} />
</View>
);
}


const styles = StyleSheet.create({
row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
name: { fontSize: 16 },
qtyBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
qtyBtn: { fontSize: 20, paddingHorizontal: 10 }
});