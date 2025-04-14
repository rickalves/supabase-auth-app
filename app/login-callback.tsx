import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View, Alert } from 'react-native';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { supabase } from '../utils/supabase';

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    Alert.alert('Erro no login', errorCode);
    return;
  }

  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) {
    Alert.alert('Tokens ausentes');
    return;
  }

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    Alert.alert('Erro ao salvar sessão', error.message);
    return;
  }

  return true;
};

export default function LoginCallback() {
  const { url } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof url === 'string') {
      createSessionFromUrl(url).then(() => {
        console.log('LoginCallback: Login bem-sucedido!');
        router.replace('/'); // ou redireciona para a Home / Dashboard
      });
    }
  }, [url]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Fazendo login...</Text>
    </View>
  );
}
