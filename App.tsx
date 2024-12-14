import React, {useState} from 'react';
import {getCredentials, saveCredentials} from './src/utils/keychain';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('user123');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan Password tidak boleh kosong');
      return;
    }

    setIsLoading(true);

    try {
      // Simulasi proses login
      const isAuthenticated =
        username === 'user123' && password === 'password123';

      if (isAuthenticated) {
        // Simpan kredensial di Keychain
        await saveCredentials(username, password);
        Alert.alert('Sukses', 'Login berhasil!');
      } else {
        Alert.alert('Error', 'Username atau Password salah');
      }
    } catch (error) {
      console.error('Error saat menyimpan kredensial:', error);
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi nanti');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrieveCredentials = async () => {
    try {
      const credentials = await getCredentials();
      if (credentials) {
        Alert.alert('Info', `Username: ${credentials.username}`);
      } else {
        Alert.alert('Info', 'Tidak ada kredensial yang tersimpan');
      }
    } catch (error) {
      console.error('Error saat mengambil kredensial:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil kredensial');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        contextMenuHidden
        selectTextOnFocus={false}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleRetrieveCredentials}>
        <Text style={styles.linkText}>Ambil Kredensial Tersimpan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
