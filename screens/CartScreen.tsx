import { View, Text, FlatList, Pressable, Image, Button, Alert } from 'react-native'; // ← Added Alert
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

  const initialStocks: { [key: number]: number } = {
    1: 5,   // Laptop
    2: 10,  // Headphones
    3: 8,   // Keyboard
    4: 15,  // Mouse
    5: 2,   // Stuff Toy
    6: 12,  // Jeans
    7: 20,  // Shirt
    8: 7,   // Sneakers
    9: 9,   // Sling Bag
    10: 6,  // Jacket
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = cart.length === 0;

  const contentContainerStyle = isEmpty
    ? { flexGrow: 1 }
    : { paddingBottom: 100 };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={
            <View style={globalStyles.cartEmptyContainer}>
              <Text style={globalStyles.cartEmptyTitle}>Your cart is empty</Text>
              <Text style={globalStyles.cartEmptySubtitle}>Add items from the home screen</Text>
            </View>
          }
          renderItem={({ item }) => {
            const stockLeft = (initialStocks[item.id] || 0) - item.quantity;
            const canIncrease = item.quantity < (initialStocks[item.id] || 0);

            return (
              <View style={globalStyles.card}>
                <Image source={{ uri: item.image }} style={globalStyles.img} />

                <View style={{ flex: 1 }}>
                  <Text style={globalStyles.title}>{item.name}</Text>
                  <Text style={globalStyles.price}>₱{item.price * item.quantity}</Text>
                  <Text style={{ fontSize: 14, color: theme.textSecondary, marginTop: 4 }}>
                    Stock left: {stockLeft}
                  </Text>
                </View>

                <View style={globalStyles.cartQtyContainer}>
                  {/* === MODIFIED: Confirmation popup when quantity would reach 0 === */}
                  <Pressable
                    onPress={() => {
                      if (item.quantity === 1) {
                        Alert.alert(
                          'Remove Item',
                          `Do you want to remove ${item.name} from the cart?`,
                          [
                            { text: 'Cancel', style: 'cancel' },
                            {
                              text: 'Remove',
                              style: 'destructive',
                              onPress: () => decreaseQty(item.id),
                            },
                          ]
                        );
                      } else {
                        decreaseQty(item.id);
                      }
                    }}
                    hitSlop={10}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                  >
                    <Text style={globalStyles.cartQtyBtnText}>-</Text>
                  </Pressable>

                  <Text style={globalStyles.cartQtyAmount}>{item.quantity}</Text>

                  <Pressable
                    onPress={() => increaseQty(item.id)}
                    hitSlop={10}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                    disabled={!canIncrease}
                  >
                    <Text style={[
                      globalStyles.cartQtyBtnText,
                      !canIncrease && { opacity: 0.5, color: theme.textSecondary }
                    ]}>+</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>

      {!isEmpty && (
        <View>
          <View style={globalStyles.cartTotalRow}>
            <Text style={globalStyles.cartTotalText}>Total</Text>
            <Text style={globalStyles.cartTotalText}>₱{total}</Text>
          </View>

          <Button
            title="PROCEED TO CHECKOUT"
            onPress={() => navigation.navigate('Checkout' as never)}
          />
        </View>
      )}
    </View>
  );
}