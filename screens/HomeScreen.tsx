import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart, Product } from '../contexts/CartContext';


const products: Product[] = [
{ id: 1, name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/120' },
{ id: 2, name: 'Headphones', price: 150, image: 'https://via.placeholder.com/120' },
{ id: 3, name: 'Keyboard', price: 80, image: 'https://via.placeholder.com/120' },
];


export default function HomeScreen() {
const navigation = useNavigation();
const { addToCart } = useCart();


return (
<View style={{ padding: 20 }}>
<Button title="Go to Cart" onPress={() => navigation.navigate('Cart' as never)} />


<FlatList
data={products}
keyExtractor={item => item.id.toString()}
renderItem={({ item }) => (
<View style={styles.card}>
<Image source={{ uri: item.image }} style={styles.img} />
<View style={{ flex: 1 }}>
<Text style={styles.title}>{item.name}</Text>
<Text style={styles.price}>${item.price}</Text>
</View>
<TouchableOpacity onPress={() => addToCart(item)} style={styles.btn}>
<Text style={styles.btnText}>Add to Cart</Text>
</TouchableOpacity>
</View>
)}
/>
</View>
);
}


const styles = StyleSheet.create({
card: { flexDirection: 'row', marginVertical: 10, alignItems: 'center' },
img: { width: 80, height: 80, marginRight: 10, borderRadius: 10 },
title: { fontSize: 18, fontWeight: '600' },
price: { fontSize: 16, opacity: 0.7 },
btn: { backgroundColor: '#007bff', padding: 10, borderRadius: 8 },
btnText: { color: '#fff' }
});