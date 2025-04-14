import { View, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri({
  native: 'supabasetest://login-callback',
});

export default function Home() {
  const router = useRouter();

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      Alert.alert('Erro ao iniciar login com GitHub', error.message);
      return;
    }

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? '',
      redirectTo
    );

    if (res.type === 'success') {
      router.push({
        pathname: '/login-callback',
        params: { url: res.url },
      });
    }
  };

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'henryjsalves@gmail.com',
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      Alert.alert('Erro ao enviar Magic Link', error.message);
    } else {
      Alert.alert('Magic Link enviado!', 'Verifique seu e-mail.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 16 }}>
      <Button title="Login com Google" onPress={performOAuth} />
      <Button title="Login com Magic Link" onPress={sendMagicLink} />
    </View>
  );
}
