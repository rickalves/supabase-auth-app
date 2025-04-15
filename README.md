
---
# 📱 Supabase Deep Link Auth (React Native + Expo)

Este é um projeto de exemplo utilizando **Supabase Auth** com **Deep Linking** em **React Native (Expo)**, utilizando o **Expo Router** e suporte a autenticação via:

- 🔐 Magic Link (Link Mágico por E-mail)
- 🧠 OAuth (ex: Google)
---

## ⚙️ Tecnologias utilizadas

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [expo-linking](https://docs.expo.dev/versions/latest/sdk/linking/)
- [expo-web-browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)

---

## 🚀 Como executar o projeto

### 1. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 2. Configure seu projeto Supabase

- Crie um projeto no [Supabase](https://supabase.com)
- Vá em `Authentication > URL Configuration`
  - Em **Site URL**, coloque:
    ```
    supabasetest://login-callback
    ```
- Obtenha as variáveis:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`

### 3. Configure as variáveis

Crie um arquivo `.env` (ou direto em `lib/supabase.ts`):

```ts
export const supabase = createClient(
  'https://<SEU-PROJETO>.supabase.co',
  '<PUBLIC-ANON-KEY>'
);
```

---

## 📲 Como testar Deep Linking

### 🔁 EAS Development Build (Recomendado)

```bash
npx eas build --profile development --platform android
```

Instale o app no dispositivo e use:

- **Magic Link** → receba o e-mail e clique no link
- **OAuth Google** → fluxo de navegador com retorno via `supabasetest://`

---

## 📁 Estrutura de pastas

```
app/
├─ index.tsx            → Tela de login (Magic Link + Google)
├─ login-callback.tsx   → Tratamento do Deep Link e criação de sessão
├─ home.tsx             → Página após login, exibe nome do usuário
├─ _layout.tsx          → Layout global com <Slot />
lib/
└─ supabase.ts          → Configuração do Supabase Client
```

---

## ✅ Funcionalidades

- Envio de Magic Link com redirecionamento personalizado
- Tratamento de links com tokens via hash (`#access_token=...`)
- Criação de sessão com `supabase.auth.setSession(...)`
- Exibição de nome ou e-mail do usuário autenticado
- Logout e retorno para tela inicial
- Tipagem estrita (sem `any`) com `TypeScript`

---

## 🧠 Boas práticas aplicadas

- Uso do `Linking.getInitialURL()` para capturar Deep Links no mobile
- Captura de erros via `#error` no hash da URL
- Tipagem segura para os parâmetros do Supabase Auth
- Uso de `Slot` no `_layout.tsx` com `SafeAreaView` e `StatusBar`

---

## 🛠 Melhorias futuras

- [ ] Hook `useSupabaseDeepLinkAuth` reutilizável
- [ ] Armazenamento local do token (SecureStore)
- [ ] Tela de splash/loading com autenticação automática
- [ ] Design mais completo com navegação tab bar

---

## 📜 Licença

MIT — sinta-se livre para usar, modificar e contribuir.