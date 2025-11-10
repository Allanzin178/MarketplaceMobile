import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = (type: 'usuario' | 'farmacia') => {
    signIn(type);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/Logo2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bem-vindo ao FarmaExpress</Text>
        <Text style={styles.subtitle}>Escolha como deseja continuar</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Entrar como Cliente"
            onPress={() => handleLogin('usuario')}
            fullWidth
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Entrar como Farmácia"
            onPress={() => handleLogin('farmacia')}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacer: {
    height: 16,
  },
});