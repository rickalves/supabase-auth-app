import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { useRouter } from 'expo-router';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Erro ao buscar usuário:', error.message);
        setUsername('usuário');
      } else {
        const user = data?.user;
        setUsername(user?.user_metadata?.name ?? user?.email ?? 'usuário');
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Erro ao sair', error.message);
      return;
    }
    router.replace('/');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24 }}>👋 Bem-vindo, {username}!</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
