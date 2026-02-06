import { View, Text, Pressable, FlatList, Image, Button, TextInput, Keyboard } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCart, Product } from '../contexts/CartContext';
import { getStyles, COLORS } from '../styles/GlobalStyles';
import { useTheme } from '../App';

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

  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [searchQuery, setSearchQuery] = useState('');

  const initialStocks: { [key: number]: number } = {
    1: 5,   // Laptop
    2: 10,  // Headphones
    3: 8,   // Keyboard
    4: 15,  // Mouse
    5: 2,   // Stuff Toy (low for testing)
    6: 12,  // Jeans
    7: 20,  // Shirt
    8: 7,   // Sneakers
    9: 9,   // Sling Bag
    10: 6,  // Jacket
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: theme.background }}>
      {/* Search Bar with custom clear button */}
      <View style={{ position: 'relative', marginBottom: 15 }}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            backgroundColor: theme.surface,
            paddingHorizontal: 15,
            paddingVertical: 12,
            paddingRight: 40,
            borderRadius: 10,
            fontSize: 16,
            color: theme.textPrimary,
            borderWidth: 1,
            borderColor: theme.border,
          }}
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        {searchQuery.length > 0 && (
          <Pressable
            onPress={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: theme.border,
            }}
            hitSlop={10}
          >
            <Text style={{ fontSize: 18, color: theme.textSecondary }}>×</Text>
          </Pressable>
        )}
      </View>

      {/* Product List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: theme.textPrimary }}>
                  No products found for "{searchQuery}"
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const cartQty = cart.find((c) => c.id === item.id)?.quantity || 0;
            const availableStock = (initialStocks[item.id] || 0) - cartQty;

            return (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.img} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>₱{item.price}</Text>
                  {/* Shows remaining available stock (returns to original when item is fully removed from cart) */}
                  <Text style={{ fontSize: 14, color: theme.textSecondary, marginTop: 4 }}>
                    Stock: {availableStock}
                  </Text>
                </View>

                {availableStock > 0 ? (
                  <Pressable
                    onPress={() => addToCart(item)}
                    style={({ pressed }) => [
                      styles.btn,
                      pressed && { opacity: 0.8 },
                    ]}
                  >
                    <Text style={styles.btnText}>Add to Cart</Text>
                  </Pressable>
                ) : (
                  <View style={[styles.btn, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.btnText, { color: theme.textSecondary }]}>
                      Out of Stock
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>

      {/* Bottom Button */}
      <Button
        title={`GO TO CART${cart.length > 0 ? ` (${cart.length})` : ''}`}
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
}