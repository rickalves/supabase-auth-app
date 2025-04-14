import { View, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from "expo-linking";
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri();

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    Alert.alert('Erro ao iniciar login com Google', error.message);
    return;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? '',
    redirectTo
  );

  // if (res.type === 'success') {
  //   router.push({
  //     pathname: '/login-callback',
  //     params: { url: res.url },
  //   });
  // }
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

export default function Home() {
  const router = useRouter();
  const url = Linking.useURL();
  useEffect(() => {
    if (url) {
      router.push({
        pathname: '/login-callback',
        params: { url },
      });
    }
  }, [url]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, padding: 16 }}>
      <Button title="Login com Google" onPress={performOAuth} />
      <Button title="Login com Magic Link" onPress={sendMagicLink} />
    </View>
  );
}
