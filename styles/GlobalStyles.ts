import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  light: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#333333',
    border: '#e0e0e0',
    primaryButton: '#007bff',
  },
  dark: {
    background: '#000000',
    surface: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#333333',
    primaryButton: '#0056b3',
  },
};

export const getStyles = (isDarkMode: boolean) => {
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    img: {
      width: 80,
      height: 80,
      marginRight: 10,
      borderRadius: 10,
    },

    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    price: {
      fontSize: 16,
      opacity: 0.7,
      color: theme.textPrimary,
    },

    btn: {
      backgroundColor: theme.primaryButton,
      padding: 10,
      borderRadius: 8,
    },

    btnText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    badge: {
      position: 'absolute',
      right: 10,
      top: 0,
      backgroundColor: 'red',
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },

    badgeText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },

    bottomButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.primaryButton,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    },

    bottomButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    // Cart-specific styles
    cartQtyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },

    cartQtyBtnText: {
      fontSize: 24,
      paddingHorizontal: 10,
      color: theme.textPrimary,
    },

    cartQtyAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },

    cartEmptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    cartEmptyTitle: {
      fontSize: 20,
      color: theme.textPrimary,
      marginBottom: 10,
      textAlign: 'center',
    },

    cartEmptySubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
    },

    cartTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      marginBottom: 10,
    },

    cartTotalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },
  });
};