import { View, Text, Pressable, FlatList, Image } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCart, Product } from '../contexts/CartContext';
import { getStyles, COLORS } from '../styles/GlobalStyles';
import { useTheme } from '../App'; // Adjust path if App.tsx is in a different location

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, image: 'https://www.itech.ph/wp-content/uploads/2024/09/E1504FA-L11066WSM-450x577.jpg' },
  { id: 2, name: 'Headphones', price: 150, image: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_214,q_auto,w_380/c_pad,h_214,w_380/R2013524-01?pgw=1' },
  { id: 3, name: 'Keyboard', price: 80, image: 'https://beyondthebox.ph/cdn/shop/files/SM1MechanicalKeyboard_Light_-USDarkGray1_700x700.png?v=1721283771' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { addToCart, cart } = useCart();

  // Added: Manual dark mode from the theme context in App.tsx (replaces system useColorScheme)
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  // Get theme for background (consistent with GlobalStyles)
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Always hide tab bar on Home screen so the blue button can reach the very bottom with no gap
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          padding: 20,
          // Always enough bottom padding for the fixed button (prevents content overlap)
          paddingBottom: 100,
        }}
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
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={styles.btnText}>Add to Cart</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Blue "GO TO CART" button – ALWAYS shown, even when cart is empty */}
      <Pressable
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.bottomButtonText}>
          GO TO CART{cart.length > 0 ? ` (${cart.length})` : ''}
        </Text>
      </Pressable>

    </View>
  );
}