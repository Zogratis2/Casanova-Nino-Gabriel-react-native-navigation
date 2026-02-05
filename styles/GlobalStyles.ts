import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },

  img: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10
  },

  title: {
    fontSize: 18,
    fontWeight: '600'
  },

  price: {
    fontSize: 16,
    opacity: 0.7
  },

  btn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8
  },

  btnText: {
    color: '#fff'
  },

 footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 10,
  backgroundColor: 'white',
  borderTopWidth: 1,
  borderColor: '#e0e0e0',
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
    justifyContent: 'center'
  },

badgeText: {
  color: 'white',
  fontWeight: 'bold'
},

bottomButton: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#007bff',
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
},

bottomButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},


});
