import { View, Button, Alert } from 'react-native'
import { supabase } from '../utils/supabase'

export default function Home() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: 'henryworkdev.ti@gmail.com',
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'supabasetest://login-callback',
      },
    })

    if (error) Alert.alert('Erro', error.message)
    else Alert.alert('Verifique seu e-mail!')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login com Magic Link" onPress={handleLogin} />
    </View>
  )
}
