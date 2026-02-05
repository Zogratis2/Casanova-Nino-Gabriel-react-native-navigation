import { View, Text, FlatList, Pressable, Image, Button } from 'react-native';
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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = cart.length === 0;

  const contentContainerStyle = isEmpty
    ? { flexGrow: 1 } // Centers empty message vertically
    : { paddingBottom: 100 }; // Extra space so last item isn't hidden under total + button

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
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <Image source={{ uri: item.image }} style={globalStyles.img} />

              <View style={{ flex: 1 }}>
                <Text style={globalStyles.title}>{item.name}</Text>
                <Text style={globalStyles.price}>₱{item.price * item.quantity}</Text>
              </View>

              <View style={globalStyles.cartQtyContainer}>
                <Pressable
                  onPress={() => decreaseQty(item.id)}
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
                >
                  <Text style={globalStyles.cartQtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      {/* Total + native Button – exactly like HomeScreen's bottom <Button> structure */}
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