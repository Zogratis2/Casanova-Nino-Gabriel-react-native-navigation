import { View, Text, Pressable, FlatList, Image, Button } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCart, Product } from '../contexts/CartContext';
import { getStyles, COLORS } from '../styles/GlobalStyles';
import { useTheme } from '../App'; // Adjust path if App.tsx is in a different location

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, image: 'https://www.itech.ph/wp-content/uploads/2024/09/E1504FA-L11066WSM-450x577.jpg' },
  { id: 2, name: 'Headphones', price: 150, image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_214,q_auto,w_380/c_pad,h_214,w_380/R2013524-01?pgw=1' },
  { id: 3, name: 'Keyboard', price: 280, image: 'https://beyondthebox.ph/cdn/shop/files/SM1MechanicalKeyboard_Light_-USDarkGray1_700x700.png?v=1721283771' },
  { id: 4, name: 'Mouse', price: 250, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS2azMy-DoJaZdxQ5oIRVkHWN0wdwSKRM8Zg&s' },
  { id: 5, name: 'Stuff Toy', price: 550, image: 'https://media.istockphoto.com/id/909772478/photo/brown-teddy-bear-isolated-in-front-of-a-white-background.jpg?s=612x612&w=0&k=20&c=F4252bOrMfRTB8kWm2oM2jlb9JXY08tKCaO5G_ms1Uw=' },
  { id: 6, name: 'Jeans', price: 300, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsSNxBCX-haK0M6vBE1sNeF79SF2QZx6JMg&s' },
  { id: 7, name: 'Shirt', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQreDwlXCvH_iOhlDQ_gfhHGcjqUqXF-my6lA&s' },
  { id: 8, name: 'Sneakers', price: 450, image: 'https://n.nordstrommedia.com/it/8c46eb33-5167-46dd-93d7-80aeab1dfaf2.jpeg?h=368&w=240&dpr=2' },
  { id: 9, name: 'Sling Bag', price: 350, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXbxeb1WOD4jI4k50VtIzUMa6F8U_R_nQMew&s' },
  { id: 10, name: 'Jacket', price: 400, image: 'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L10911A00099597X2999_F/image/berre-short-down-jacket-men-black-moncler.jpg?w=600&q=80' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { addToCart, cart } = useCart();

  // Manual dark mode from the theme context in App.tsx
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  // Get theme for background (consistent with GlobalStyles)
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Always hide tab bar on Home screen
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            // Small bottom padding for breathing room above the button (matches CartScreen feel)
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.img} />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>₱{item.price}</Text>
              </View>

              <Pressable
                onPress={() => addToCart(item)}
                style={({ pressed }) => [
                  styles.btn,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={styles.btnText}>Add to Cart</Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      {/* Native <Button> – now in exactly the same position and structure as "Proceed to Checkout" in CartScreen */}
      <Button
        title={`GO TO CART${cart.length > 0 ? ` (${cart.length})` : ''}`}
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
}