import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';


const Stack = createNativeStackNavigator();


export default function AppNavigator() {
return (
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Cart" component={CartScreen} />
<Stack.Screen name="Checkout" component={CheckoutScreen} />
</Stack.Navigator>
);
}