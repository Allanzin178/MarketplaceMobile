import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { userType } = useAuth();
  
  if (userType === 'farmacia') {
    return <Redirect href="/manage-products" />;
  }
  
  if (userType === 'entregador') {
    return <Redirect href="/available-deliveries" />;
  }
  
  return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
