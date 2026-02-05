import { View, Text, Button, FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart, Product } from '../contexts/CartContext';
import { styles } from '../styles/GlobalStyles';

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/120' },
  { id: 2, name: 'Headphones', price: 150, image: 'https://via.placeholder.com/120' },
  { id: 3, name: 'Keyboard', price: 80, image: 'https://via.placeholder.com/120' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart, cart } = useCart();

  return (
  <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

    <FlatList
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.img} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>

          <Pressable
            onPress={() => addToCart(item)}
            style={({ pressed }) => [
              styles.btn,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </Pressable>
        </View>
      )}
    />

    {/* FOOTER ALWAYS BOTTOM */}
    <View style={styles.footer}>

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart' as never)}
      />

      {cart.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}

    </View>

    {/* ADDED BLUE FIXED BUTTON — DID NOT REMOVE OLD ONE */}
    <Pressable
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#007bff',
        padding: 16,
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Cart' as never)}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        GO TO CART ({cart.length})
      </Text>
    </Pressable>

  </View>
);
}
