import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';


export default function CheckoutScreen() {
const navigation = useNavigation();
const { cart, clearCart } = useCart();
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
<View style={{ padding: 20 }}>
{cart.map((item) => (
<Text key={item.id}>{item.name} - ${item.price * item.quantity}</Text>
))}
<Text style={{ fontSize: 20, marginVertical: 20 }}>Total: ${total}</Text>
<Button title="Checkout" onPress={handleCheckout} />
</View>
);
}