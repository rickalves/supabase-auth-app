import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import * as Linking from 'expo-linking'
import { supabase } from '../utils/supabase'

export default function LoginCallback() {
  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL()
      console.log('URL recebida:', url)
      if (url) {
        const { error } = await supabase.auth.exchangeCodeForSession(url)
        console.log('Sessão trocada!')

        if (error) console.log('Erro:', error.message)
      }
    }

    handleDeepLink()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      <Text>Fazendo login...</Text>
    </View>
  )
}
