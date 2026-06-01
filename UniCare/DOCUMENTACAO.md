# UniCare — Documentação do Projeto

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Pré-requisitos e Instalação](#2-pré-requisitos-e-instalação)
3. [Arquitetura](#3-arquitetura)
4. [Navegação](#4-navegação)
5. [Telas](#5-telas)
6. [Componentes](#6-componentes)
7. [Hooks](#7-hooks) (useRequest + 6 hooks ViewModel)
8. [Contextos](#8-contextos)
9. [Constantes](#9-constantes)
10. [Serviços](#10-serviços)
11. [Estilos](#11-estilos)
12. [Armazenamento Local](#12-armazenamento-local)
13. [Ícones e Assets](#13-ícones-e-assets)
14. [Fluxo Completo do Usuário](#14-fluxo-completo-do-usuário)
15. [Dependências](#15-dependências)

---

## 1. Visão Geral

O **UniCare** é um aplicativo móvel de reabilitação desenvolvido para a UNIFAE. Ele permite que pacientes acompanhem seus planos de exercícios prescritos, registrem feedbacks de dor e esforço, visualizem consultas agendadas e gerenciem seu perfil.

| Atributo | Valor |
|---|---|
| Nome interno | aula-1776215075364 |
| Versão | 1.0.0 |
| Framework | React Native 0.81.5 com Expo 54 |
| Plataformas | iOS, Android, Web |
| Autenticação | JWT via Bearer token |
| API Base | `http://185.217.125.219:3000/api/v1` |

---

## 2. Pré-requisitos e Instalação

### Requisitos

- Node.js 18 ou superior
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Para iOS: macOS com Xcode instalado
- Para Android: Android Studio com emulador configurado

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositório>
cd UniCare

# Instalar dependências
npm install
```

### Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `start` | `npm start` | Inicia o servidor de desenvolvimento Expo |
| `android` | `npm run android` | Abre no emulador Android |
| `ios` | `npm run ios` | Abre no simulador iOS |
| `web` | `npm run web` | Abre no navegador |
| `test` | `npm test` | Executa os testes com Jest |

---

## 3. Arquitetura

O projeto segue o padrão **MVVM + Hooks**: cada tela possui um hook ViewModel dedicado (`useXxx`) que contém toda a lógica de negócio, estado e chamadas à API. O componente de tela é responsável apenas por renderizar JSX usando os valores retornados pelo hook.

| Camada | Equivalente MVVM | No projeto |
|---|---|---|
| **Model** | Dados e regras de negócio | `services/` (authService, homeService…) + API REST |
| **ViewModel** | Lógica e estado por tela | `hooks/useLogin`, `useHome`, `useExercise`, etc. |
| **View** | Interface | `screens/` + `components/` |

### Estrutura de pastas

```
UniCare/
├── assets/                    # Imagens e ícones do app
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── modals/
│   │   └── texts/
│   ├── constants/             # Constantes globais (chaves de storage)
│   ├── context/               # Contextos React (autenticação)
│   ├── hooks/                 # Hooks customizados
│   │   ├── useRequest.js      # Gerenciamento de loading/erro (base)
│   │   ├── useLogin.js        # ViewModel da tela de Login
│   │   ├── useHome.js         # ViewModel da Home
│   │   ├── useExercise.js     # ViewModel da tela de Exercício
│   │   ├── useFeedback.js     # ViewModel da tela de Feedback
│   │   ├── useProfile.js      # ViewModel do Perfil
│   │   └── useOnlineCalendar.js # ViewModel do Calendário
│   ├── icons/                 # Ícones SVG customizados
│   ├── routes/                # Configuração de navegação
│   ├── screens/               # Telas do aplicativo (apenas JSX)
│   ├── services/              # Comunicação com a API (dividido por domínio)
│   └── styles/                # Cores, fontes e tipografia
├── App.js                     # Ponto de entrada, carregamento de fontes
└── index.js                   # Registro do componente raiz
```

### Camadas da aplicação

```
View — Telas (screens) — apenas JSX
        ↕
ViewModel — Hooks por tela (useLogin, useHome, useExercise…)
        ↕  useRequest (loading/erro)  +  AuthContext (autenticação global)
        ↕
Model — Serviços por domínio (authService, homeService, etc.)
        ↕
http.js (instância axios + interceptores)
        ↕
API REST (http://185.217.125.219:3000/api/v1)
```

Todo o estado local (`useState`, `useEffect`, `useCallback`, `useFocusEffect`), as chamadas à API e as validações vivem exclusivamente nos hooks ViewModel. Os componentes de tela recebem os dados e handlers via `const vm = useXxx(navigation, route)` e apenas os utilizam no JSX.

---

## 4. Navegação

A navegação é composta por dois níveis: um **Stack Navigator** principal e um **Drawer Navigator** para a área autenticada.

### Stack Navigator (`src/routes/route.js`)

Rota inicial: `LoginView`

| Nome da rota | Componente | Situação |
|---|---|---|
| `LoginView` | `LoginScreen` | Pública |
| `RecoverPasswordView` | `RecuperarSenha` | Pública |
| `ResetPasswordView` | `ResetPasswordScreen` | Pública |
| `Tab` | `DrawerNavigator` | Autenticada |
| `exercise` | `ExerciseScreen` | Autenticada |
| `FeedbackView` | `FeedbackScreen` | Autenticada |

Todos os headers estão ocultos. O container de navegação usa `navigationRef` para permitir redirecionamentos imperativos a partir dos serviços (ex.: expiração de sessão).

### Drawer Navigator (`src/screens/TabNavigator.js`)

Rota inicial: `Home`

**Screens registradas no Drawer:**

| Nome da rota | Componente |
|---|---|
| `Home` | `HomeScreen` |
| `ConsultasOnline` | `OnlineCalendar` |
| `Historico` | `HomeScreen` |
| `Perfil` | `Profile` |

**Itens visíveis no menu lateral (CustomDrawerContent):**

| Item do menu | Navega para | Ícone |
|---|---|---|
| Home | `Home` | home |
| Consultas | `ConsultasOnline` | calendar |
| Perfil | `Perfil` | person |
| Sair | — | log-out |

> `Historico` está registrado como Drawer.Screen mas não possui DrawerItem no menu — não aparece visualmente para o usuário.

O item **Sair** chama `signOut()` do `AuthContext` (limpa token e AsyncStorage) e então navega para `LoginView`. Possui destaque visual em vermelho.

---

## 5. Telas

Todas as telas seguem o padrão MVVM + Hooks: o componente de tela chama `const vm = useXxx(navigation, route)` e usa apenas os valores e funções retornados pelo hook. Os modais `LoadingModal` e `ErrorModal` são renderizados de forma condicional (`vm.loading ? <LoadingModal> : <ErrorModal>`) para evitar conflitos de modal simultâneo no iOS.

---

### 5.1 Login (`src/screens/loginScreens.js`)

Tela de autenticação do usuário.

**ViewModel:** `useLogin(navigation, route)` — `src/hooks/useLogin.js`

**Retorno do hook:** `{ email, setEmail, password, setPassword, loading, error, clearError, handleLogin, handleNavigateToRecover }`

**Validações (no hook):**
- Campos em branco
- Formato de e-mail (regex)
- Senha com mínimo de 6 caracteres

**Fluxo:**
1. Usuário preenche e-mail e senha e toca em "Entrar"
2. `handleLogin()` aplica validações locais via `setError`
3. `signIn(email, password)` do `AuthContext` é chamado — faz login, salva token, carrega perfil
4. Navegação é resetada para `Tab` (DrawerNavigator)

**Tratamento de erros:**
- Status 400 → "Email inválido. Por favor, verifique o formato do seu e-mail."
- Status 401 → "Credenciais inválidas. Por favor, verifique seu e-mail e senha."

---

### 5.2 Recuperação de Senha (`src/screens/recoverPasswordScreen.js`)

Tela de solicitação de código de verificação para redefinição de senha. Sem hook ViewModel — possui apenas `useState('')` para o campo de e-mail, sem chamadas à API.

**Fluxo:**
1. Usuário informa o e-mail
2. Alerta confirma envio do código
3. `AlertBanner` exibe aviso de validade de 15 minutos
4. Botão navega para `ResetPasswordView`

---

### 5.3 Redefinição de Senha (`src/screens/resetPasswordScreen.js`)

Tela para inserção do código recebido e da nova senha. Sem hook ViewModel — integração com API ainda não implementada.

**Estado local:** `email`, `verificationCode`, `newPassword`, `confirmPassword`

**Funcionalidades:**
- `handleChange` centraliza a atualização dos campos do formulário
- `AlertBanner` exibe dicas de segurança para a nova senha
- Botão de confirmação navega para `LoginView`

---

### 5.4 Home (`src/screens/HomeScreen.js`)

Dashboard principal com o progresso do plano de exercícios.

**ViewModel:** `useHome(navigation)` — `src/hooks/useHome.js`

**Retorno do hook:** `{ progressValue, exercise, logoutVisible, setLogoutVisible, progressMessage, loading, error, clearError, handleStartExercise, handleLogout, user }`

**Dados carregados via `ApiService.getHomeInfo()`:**

```json
{
  "nextExercise": {
    "exerciseName": "Nome do exercício",
    "axis": "Região do corpo",
    "objective": "Objetivo",
    "prescriptionItemId": 123
  },
  "plan": {
    "percentCompleted": 75,
    "totalExercises": 8
  }
}
```

**Funcionalidades:**
- Indicador circular de progresso com mensagens dinâmicas por faixa (0–25%, 25–75%, 75%+) via `progressMessage`
- Card do próximo exercício com botão que chama `handleStartExercise(prescriptionItemId)`
- Botão físico de voltar (Android) exibe `ConfirmModal`; ao confirmar, chama `handleLogout()` que executa `signOut()` e reseta a navegação para `LoginView`
- Dados carregados uma vez na montagem (`useEffect` com deps `[]`)

---

### 5.5 Exercício (`src/screens/exerciseScreen.js`)

Exibe os detalhes e o passo a passo do exercício prescrito.

**Parâmetro de rota:** `prescriptionItemId` (`route.params?.props`)

**ViewModel:** `useExercise(prescriptionItemId, navigation)` — `src/hooks/useExercise.js`

**Retorno do hook:** `{ exerciseDetails, metrics, steps, successVisible, handleSuccessClose, loading, error, clearError, handleComplete }`

**Fluxo:**
1. Verifica via `STORAGE_KEYS.EXERCISE(id)` se o exercício já foi concluído; se sim, redireciona para `FeedbackView`
2. Carrega detalhes via `ApiService.getExerciseByPrescriptionItemId()`
3. Exibe repetições (`metrics.volume`), séries (`metrics.series`) e lista de passos
4. Ao tocar em "Concluir Exercício", `handleComplete()`:
   - Salva status de conclusão com timestamp no `AsyncStorage`
   - Exibe `SuccessModal`
   - `handleSuccessClose()` navega para `FeedbackView`

---

### 5.6 Feedback (`src/screens/feedbackScreen.js`)

Coleta o feedback de dor/esforço após a conclusão do exercício.

**Parâmetro de rota:** `prescriptionItemId` (`route.params?.props`)

**ViewModel:** `useFeedback(prescriptionItemId, navigation)` — `src/hooks/useFeedback.js`

**Retorno do hook:** `{ selectedLevel, setSelectedLevel, observations, setObservations, successVisible, handleSuccessClose, loading, error, clearError, handleSend, FEEDBACK_LEVELS }`

**Escala de feedback (constante `FEEDBACK_LEVELS` exportada do hook):**

| Nível | Título | Valor enviado |
|---|---|---|
| 1 | Sem Dor/Esforço | 0 |
| 2 | Leve | 2 |
| 3 | Moderado | 5 |
| 4 | Intenso | 8 |
| 5 | Exaustão | 10 |

**Fluxo:**
1. Usuário seleciona o nível e opcionalmente adiciona observações
2. `handleSend()` chama `ApiService.completeExercise()` → obtém `executionId`
3. `ApiService.sendFeedback(executionId, { score, notes })` envia o feedback
4. O exercício é removido do `AsyncStorage` via `STORAGE_KEYS.EXERCISE(id)`
5. `SuccessModal` é exibido; `handleSuccessClose()` reseta a navegação para `Tab`

---

### 5.7 Consultas (`src/screens/OnlineCalendar.js`)

Calendário de consultas agendadas.

**ViewModel:** `useOnlineCalendar()` — `src/hooks/useOnlineCalendar.js`

**Retorno do hook:** `{ selectedDate, appointments, handleDayPress }`

**Funcionalidades:**
- Calendário interativo (`react-native-calendars`) com localização em português
- `handleDayPress(date)` atualiza `selectedDate` e busca appointments com cache por data
- Lista do dia exibida via `AppointmentCard`
- Dados atualmente provenientes de `appointments.js` (mock)

---

### 5.8 Perfil (`src/screens/profile.js`)

Gerenciamento do perfil do usuário.

**ViewModel:** `useProfile()` — `src/hooks/useProfile.js`

**Retorno do hook:** `{ userInfo, studentInfo, photoSource, loading, error, clearError, handleUploadPhoto }`

**Dados carregados via `ApiService.getUserInfo()`:**

```json
{
  "profile": { "id": 1, "name": "Nome", "email": "email@exemplo.com", "phone": "11999999999" },
  "responsibleStudent": { "name": "Nome do estudante" }
}
```

**Funcionalidades:**
- Exibe avatar com a inicial do nome como placeholder
- Toque no avatar chama `handleUploadPhoto()` que abre o `ImagePicker`
- Upload de foto via `FormData` (campo `file`, `multipart/form-data`)
- Download e cache da foto via `expo-file-system`; o cache é limpo a cada acesso via `FileSystem.deleteAsync()`
- `useFocusEffect` no hook recarrega os dados sempre que a tela recebe foco
- `BASE_URL` importada de `src/services/http.js`

---

## 6. Componentes

### 6.1 CustomText (`src/components/CustomText.js`)

Wrapper do `Text` do React Native com suporte a variantes tipográficas e fontes Nunito.

**Props:** `variant`, `color`, `style`, `children`

**Variantes disponíveis:**

| Variante | Tamanho | Peso |
|---|---|---|
| `header` | 32px | Bold |
| `title` | 26px | Bold |
| `bodyLarge` | 20px | Regular |
| `bodyMedium` | 16px | Regular |
| `label` | 16px | Medium |
| `caption` | 12px | Regular |
| `captionBold` | 12px | Bold |

---

### 6.2 CustomTextInput (`src/components/CustomTextInput.js`)

Wrapper do `TextInput` com bordas estilizadas e toggle de visibilidade de senha. O componente é exportado como `default` com o nome interno `CustomInput`.

**Props:** `value`, `onChangeText`, `placeholder`, `secureTextEntry`, `multiline`

- Campos de senha exibem ícone de olho (Ionicons) para alternar visibilidade
- Cor do ícone: `GREEN_3`
- Fonte: Nunito Medium

---

### 6.3 CircularIndicator (`src/components/CircularIndicator.js`)

Wrapper do `react-native-circular-progress-indicator`.

**Props:** `value` (porcentagem), `style`

- Cor ativa: `GREEN_1`
- Cor inativa: cinza claro
- Exibe sufixo `%`

---

### 6.4 AlertBanner (`src/components/AlertBanner.js`)

Banner horizontal com destaque colorido para avisos.

**Props:** `title` (padrão: "Aviso!"), `message`

- Barra de acento `GREEN_1` posicionada absolutamente atrás do card, criando o efeito visual de destaque
- Fundo branco com sombra

---

### 6.5 PositiveButton (`src/components/buttons/PositiveButton.js`)

Botão de ação principal.

**Props:** `onPress`, `title`, `style`, `variant`, `enabled`

- Cor quando ativo: `GREEN_2`
- Cor quando desativado: `GRAY_1`
- Borda arredondada: 10px
- Texto branco e negrito

---

### 6.6 Card (`src/components/cards/Card.js`)

Container genérico com estilo de cartão.

**Props:** `children`, `backgroundColor` (padrão: branco), `style`

- Borda arredondada: 10px
- Padding: 20px
- Largura padrão: 80%

---

### 6.7 ExerciseCard (`src/components/cards/ExerciseCard.js`)

Card do próximo exercício exibido na HomeScreen.

**Props:** `exercise` (`{ name, region1, objective, exercisesCount, onPress }`)

- Exibe quantidade de exercícios, nome, região do corpo e objetivo
- Botão "Iniciar exercício" chama `exercise.onPress()` — o handler é parte do objeto `exercise`, não uma prop separada

---

### 6.8 AppointmentCard (`src/components/AppointmentCard.js`)

Card de consulta exibido no calendário.

**Props:** `time`, `title`, `category`

- Categoria `videocam`: ícone + cores `GREEN_4` e `GREEN_2`
- Categoria `navigate`: ícone + cores `ORAGEN_1` e branco

---

### 6.9 ErrorModal (`src/components/modals/ErrorModal.js`)

Modal de erro com tema vermelho.

**Props:** `visible`, `message`, `onClose`

- Ícone: `!` em círculo com fundo `ERROR_BG`
- Título fixo: "Algo deu errado"
- Botão de fechar em `GREEN_2`

---

### 6.10 LoadingModal (`src/components/modals/LoadingModal.js`)

Modal de carregamento com spinner.

**Props:** `visible`, `message` (padrão: "Aguarde...")

- `ActivityIndicator` na cor `GREEN_2`
- Não pode ser fechado pelo usuário

---

### 6.11 SuccessModal (`src/components/modals/SuccessModal.js`)

Modal de sucesso com tema verde.

**Props:** `visible`, `message`, `onClose`, `buttonLabel` (padrão: "Continuar")

- Ícone: `✓` em círculo com fundo `SUCCESS_BG`
- Título fixo: "Exercício Concluído!"

---

### 6.12 ConfirmModal (`src/components/modals/ConfirmModal.js`)

Modal de confirmação com dois botões para ações destrutivas ou irreversíveis.

**Props:** `visible`, `title`, `message`, `onConfirm`, `onCancel`, `confirmLabel` (padrão: "Confirmar"), `cancelLabel` (padrão: "Cancelar")

- Ícone: `?` em círculo com fundo `ERROR_BG`
- Botão cancelar: borda `GRAY_1`, texto cinza
- Botão confirmar: fundo `GREEN_2`, texto branco
- Atualmente usado no `HomeScreen` ao pressionar o botão voltar

---

### 6.13 CustomStepText (`src/components/texts/CustomStepText.js`)

Exibe um passo numerado nas instruções do exercício.

**Props:** `step` (número), `text` (instrução)

- Layout em linha (`flexDirection: row`): badge numerado com fundo `GREEN_2` à esquerda, texto ocupando o espaço restante à direita

---

## 7. Hooks

### 7.1 useRequest (`src/hooks/useRequest.js`)

Hook base que centraliza o gerenciamento de loading e erro. Todos os hooks ViewModel o utilizam internamente.

**Retorna:** `{ loading, error, clearError, setError, run }`

| Membro | Tipo | Descrição |
|---|---|---|
| `loading` | `boolean` | `true` enquanto a operação está em andamento |
| `error` | `string` | Mensagem de erro atual (`''` quando não há erro) |
| `clearError` | `() => void` | Limpa a mensagem de erro |
| `setError` | `(msg: string) => void` | Define uma mensagem de erro diretamente (ex.: validações de formulário) |
| `run` | `(fn, onError?) => Promise` | Executa `fn`, gerencia loading e captura erros |

**Assinatura de `run`:**

```js
run(fn, onError?)
```

- `fn`: função assíncrona a executar
- `onError`: pode ser uma **string** (mensagem fixa), uma **função** `(e) => string` (para tratar códigos de status HTTP), ou omitido (usa `e.message`)

---

### 7.2 useLogin (`src/hooks/useLogin.js`)

ViewModel da tela de Login.

**Assinatura:** `useLogin(navigation, route)`

**Retorna:** `{ email, setEmail, password, setPassword, loading, error, clearError, handleLogin, handleNavigateToRecover }`

- `handleLogin()` — valida campos e chama `signIn()` do `AuthContext`
- `handleNavigateToRecover()` — navega para `RecoverPasswordView`
- Lê `route.params?.sessionExpiredMessage` via `useEffect` e exibe via `setError`

---

### 7.3 useHome (`src/hooks/useHome.js`)

ViewModel da tela Home.

**Assinatura:** `useHome(navigation)`

**Retorna:** `{ progressValue, exercise, logoutVisible, setLogoutVisible, progressMessage, loading, error, clearError, handleStartExercise, handleLogout, user }`

- Carrega `ApiService.getHomeInfo()` no mount
- `progressMessage` — texto dinâmico baseado em faixas de progresso
- `useFocusEffect` captura o botão físico de voltar (Android) e exibe `ConfirmModal`
- `handleLogout()` — chama `signOut()` e reseta navegação para `LoginView`

---

### 7.4 useExercise (`src/hooks/useExercise.js`)

ViewModel da tela de Exercício.

**Assinatura:** `useExercise(prescriptionItemId, navigation)`

**Retorna:** `{ exerciseDetails, metrics, steps, successVisible, handleSuccessClose, loading, error, clearError, handleComplete }`

- Verifica conclusão prévia no `AsyncStorage` via `STORAGE_KEYS.EXERCISE(id)`
- `handleComplete()` — salva timestamp no `AsyncStorage` e exibe `SuccessModal`
- `handleSuccessClose()` — navega para `FeedbackView`

---

### 7.5 useFeedback (`src/hooks/useFeedback.js`)

ViewModel da tela de Feedback.

**Assinatura:** `useFeedback(prescriptionItemId, navigation)`

**Retorna:** `{ selectedLevel, setSelectedLevel, observations, setObservations, successVisible, handleSuccessClose, loading, error, clearError, handleSend, FEEDBACK_LEVELS }`

- `FEEDBACK_LEVELS` — array de opções de feedback também exportado como named export para uso direto
- `handleSend()` — `completeExercise()` → `sendFeedback()` → remove do `AsyncStorage`
- `handleSuccessClose()` — reseta navegação para `Tab`

---

### 7.6 useProfile (`src/hooks/useProfile.js`)

ViewModel da tela de Perfil.

**Assinatura:** `useProfile()`

**Retorna:** `{ userInfo, studentInfo, photoSource, loading, error, clearError, handleUploadPhoto }`

- `fetchUserData()` — carrega perfil e faz download da foto via `FileSystem` (limpando cache antes)
- `useFocusEffect` recarrega dados ao focar a tela
- `handleUploadPhoto()` — solicita permissão, abre `ImagePicker`, envia via `FormData`
- `BASE_URL` importada de `src/services/http.js`

---

### 7.7 useOnlineCalendar (`src/hooks/useOnlineCalendar.js`)

ViewModel da tela de Consultas.

**Assinatura:** `useOnlineCalendar()`

**Retorna:** `{ selectedDate, appointments, handleDayPress }`

- `handleDayPress(date)` — atualiza `selectedDate` e popula cache local por data
- `appointments` — lista do dia selecionado, derivada do cache ou de `getAppointmentsByDate()`

---

## 8. Contextos

### 8.1 AuthContext (`src/context/AuthContext.js`)

Gerencia o estado de autenticação de forma global. O `AuthProvider` envolve toda a aplicação em `App.js`.

**Estado exposto via `useAuth()`:**

| Membro | Tipo | Descrição |
|---|---|---|
| `user` | `object \| null` | Perfil do usuário `{ id, name, email, phone }` — `null` quando não autenticado |
| `signIn(email, password)` | `async function` | Realiza login, salva token no SecureStore, carrega perfil, aceita termos |
| `signOut()` | `async function` | Remove token do SecureStore e limpa AsyncStorage |

**`signIn` — fluxo interno:**
1. `authService.login(email, password)` → salva `access_token` no SecureStore
2. `homeService.getUserInfo()` → extrai `profile`
3. Salva `profile.name` no AsyncStorage via `STORAGE_KEYS.USER_NAME`
4. `authService.acceptTerms()` → aceita termos automaticamente
5. Define `user` no estado do contexto

**Uso:**

```js
import { useAuth } from '../context/AuthContext';

const { user, signIn, signOut } = useAuth();
```

---

## 9. Constantes

### 9.1 Chaves de Storage (`src/constants/storageKeys.js`)

Centraliza todas as chaves utilizadas no `AsyncStorage`, evitando strings literais espalhadas no código.

```js
export const STORAGE_KEYS = {
    USER_NAME: 'user_name',
    EXERCISE: (id) => `exercise_${id}`,
};
```

| Chave | Valor gerado | Usado em |
|---|---|---|
| `STORAGE_KEYS.USER_NAME` | `'user_name'` | `AuthContext` (signIn/signOut) |
| `STORAGE_KEYS.EXERCISE(id)` | `'exercise_123'` | `ExerciseScreen` (salvar), `FeedbackScreen` (remover) |

---

## 10. Serviços

A comunicação com a API é dividida em arquivos por domínio dentro de `src/services/`. Todos importam a instância HTTP centralizada de `http.js`.

### 10.1 HTTP (`src/services/http.js`)

Instância axios com interceptores globais.

**URL base:** `http://185.217.125.219:3000/api/v1`  
**Timeout:** 10 segundos

**Interceptor de requisição:** adiciona automaticamente `Authorization: Bearer <token>` lido do `SecureStore`.

**Interceptor de resposta:**
- Sucesso: retorna `response.data` diretamente
- Erro 401: remove o token e redireciona para `LoginView` com mensagem de sessão expirada
- Outros erros: lança um `Error` com `message` e `status`

---

### 10.2 Auth (`src/services/authService.js`)

| Função | Método | Rota | Parâmetros |
|---|---|---|---|
| `login(email, password)` | POST | `/auth/login` | `{ email, password, accessMode: 'APP', appId: 1 }` |
| `acceptTerms()` | POST | `/auth/consent/accept` | `{ consentTermId: 2 }` |

---

### 10.3 Home (`src/services/homeService.js`)

| Função | Método | Rota | Parâmetros |
|---|---|---|---|
| `getHomeInfo()` | GET | `/app/home` | — |
| `getUserInfo()` | GET | `/app/home/profile` | — |
| `getUserPhoto(userId)` | GET | `/app/home/profile/photo/:userId` | `userId` na rota |
| `postUserPhoto(formData)` | POST | `/app/home/profile/photo` | `FormData` com campo `file` |

---

### 10.4 Exercícios (`src/services/exerciseService.js`)

| Função | Método | Rota | Parâmetros |
|---|---|---|---|
| `getExerciseByPrescriptionItemId(id)` | GET | `/app/home/plan/exercises/:id` | `id` na rota |
| `completeExercise(exerciseId)` | POST | `/app/home/plan/exercises/:id/complete` | `exerciseId` na rota |

---

### 10.5 Feedback (`src/services/feedbackService.js`)

| Função | Método | Rota | Parâmetros |
|---|---|---|---|
| `sendFeedback(executionId, data)` | POST | `/app/home/plan/executions/:id/feedback` | `{ score: 0–10, notes: string }` |

---

### 10.6 Agregador (`src/services/api.js`)

Re-exporta todos os serviços em um único objeto `ApiService` para retrocompatibilidade com telas que ainda importam `ApiService`:

```js
const ApiService = { ...authService, ...homeService, ...exerciseService, ...feedbackService };
```

---

### 10.7 Consultas (`src/services/appointments.js`)

Serviço de dados mock para consultas agendadas (pendente de integração com o backend).

**Função:** `getAppointmentsByDate(dateString)` — retorna lista padrão com quatro agendamentos:

| Horário | Título | Categoria |
|---|---|---|
| 08:00 | Consulta com Dr. Carlos Silva | videocam |
| 10:30 | Avaliação com Nutricionista Ana Lima | videocam |
| 14:00 | Retorno - Cardiologia | videocam |
| 16:30 | Acompanhamento Psicológico | navigate |

---

### 10.8 Referência de Navegação (`src/services/navigationRef.js`)

Permite navegação imperativa a partir de fora de componentes React (usado pelo interceptor de erro 401 em `http.js`).

```js
navigate('LoginView', { sessionExpiredMessage: '...' });
reset({ index: 0, routes: [{ name: 'Tab' }] });
```

---

## 11. Estilos

### 11.1 Paleta de cores (`src/styles/Colors.js`)

| Constante | Valor | Uso principal |
|---|---|---|
| `GREEN_1` | `#1B4332` | Verde escuro — textos primários |
| `GREEN_2` | `#2D6A4F` | Verde médio — botões e destaques |
| `GREEN_3` | `#274E3D` | Verde escuro — headers |
| `GREEN_4` | `#CEE9D3` | Verde claro — fundos |
| `GREEN_5` | `#005F02` | Verde vivo — acentos |
| `ORAGEN_1` | `#ffbd87` | Laranja — categoria secundária |
| `WHITE` | `#ffffff` | Branco |
| `GRAY_1` | `#767775` | Cinza — textos secundários e botões desabilitados |
| `ERROR_BG` | `#FDECEA` | Fundo do ícone no `ErrorModal` |
| `ERROR_TEXT` | `#C0392B` | Cor do ícone `!` no `ErrorModal` |
| `SUCCESS_BG` | `#E8F5E9` | Fundo do ícone no `SuccessModal` |

---

### 11.2 Fontes (`src/styles/Fonts.js`)

Família: **Nunito** (carregada via `@expo-google-fonts/nunito`)

| Constante | Fonte |
|---|---|
| `FONT_FAMILY_REGULAR` | Nunito_400Regular |
| `FONT_FAMILY_MEDIUM` | Nunito_500Medium |
| `FONT_FAMILY_BOLD` | Nunito_700Bold |

| Constante | Tamanho |
|---|---|
| `FONT_SIZE_SMALL` | 12px |
| `FONT_SIZE_MEDIUM` | 16px |
| `FONT_SIZE_LARGE` | 20px |
| `FONT_SIZE_TITLE` | 26px |
| `FONT_SIZE_HEADER` | 32px |

---

### 11.3 Tipografia (`src/styles/Typography.js`)

Define os estilos usados pelo componente `CustomText` através da prop `variant`. As alturas de linha são ajustadas automaticamente para iOS.

---

## 12. Armazenamento Local

Todas as chaves estão centralizadas em `src/constants/storageKeys.js` (ver [Seção 9](#9-constantes)).

### AsyncStorage (`@react-native-async-storage/async-storage`)

Armazenamento não criptografado para dados de sessão e progresso.

| Chave (via STORAGE_KEYS) | Valor | Onde é usado |
|---|---|---|
| `STORAGE_KEYS.USER_NAME` → `'user_name'` | Nome do usuário (string) | `AuthContext` — gravado no `signIn`, lido na HomeScreen |
| `STORAGE_KEYS.EXERCISE(id)` → `'exercise_{id}'` | JSON com status e timestamp de conclusão | `ExerciseScreen` (salvar), `FeedbackScreen` (remover) |

### SecureStore (`expo-secure-store`)

Armazenamento criptografado para dados sensíveis.

| Chave | Valor | Onde é usado |
|---|---|---|
| `api_token` | Token JWT (string) | `http.js` (todas as requisições autenticadas), `AuthContext` (signIn/signOut) |

---

## 13. Ícones e Assets

### Ícones SVG (`src/icons/`)

Emojis de feedback usados na tela de Feedback, exportados como objeto `icons`:

| Arquivo | Nível |
|---|---|
| `emoji-sem-dor.svg` | Sem Dor |
| `emoji-leve.svg` | Leve |
| `emoji-moderado.svg` | Moderado |
| `emoji-intenso.svg` | Intenso |
| `emoji-exaustao.svg` | Exaustão |

### Assets (`assets/`)

| Arquivo | Uso |
|---|---|
| `icon.png` | Ícone do app |
| `adaptive-icon.png` | Ícone adaptativo Android |
| `splash-icon.png` | Tela de splash |
| `favicon.png` | Favicon para web |
| `LOGOPerfil.png` | Logo de perfil |
| `unifae_logo_small.png` | Logo UNIFAE (versão pequena) |

---

## 14. Fluxo Completo do Usuário

```
1. App abre
       │
       ▼
2. Tela de Login (LoginView)
   ├── Insere e-mail e senha
   ├── Validação local (formato, tamanho) via setError do useRequest
   └── AuthContext.signIn() → POST /auth/login
          │
          ▼
3. Token salvo no SecureStore
   Perfil carregado e salvo no AuthContext
   Nome salvo no AsyncStorage via STORAGE_KEYS.USER_NAME
   Termos aceitos automaticamente
          │
          ▼
4. DrawerNavigator → Home (HomeScreen)
   └── GET /app/home → progresso + próximo exercício
          │
          ▼
5. Toca em "Iniciar exercício"
   └── Navega para exercise (ExerciseScreen)
          │
          ▼
6. GET /app/home/plan/exercises/:id
   └── Exibe passos e métricas
          │
          ▼
7. Toca em "Concluir Exercício"
   ├── Status salvo no AsyncStorage via STORAGE_KEYS.EXERCISE(id)
   ├── SuccessModal exibido
   └── Navega para FeedbackView (FeedbackScreen)
          │
          ▼
8. Seleciona nível de dor e adiciona observações
   ├── POST /app/home/plan/exercises/:id/complete → executionId
   └── POST /app/home/plan/executions/:id/feedback
          │
          ▼
9. Exercício removido do AsyncStorage
   SuccessModal → volta para Home
          │
          ▼
10. Menu lateral → Consultas, Perfil ou Sair
    └── Sair: AuthContext.signOut() → limpa token → LoginView

    OU

    Botão voltar (Android) na Home
    └── ConfirmModal "Deseja encerrar sua sessão?"
        ├── Cancelar → permanece na Home
        └── Sair → AuthContext.signOut() → LoginView
```

---

## 15. Dependências

### Produção

| Pacote | Versão | Finalidade |
|---|---|---|
| `expo` | ~54.0.33 | Framework principal |
| `react-native` | 0.81.5 | Runtime móvel |
| `react` | 19.1.0 | UI declarativa |
| `axios` | ^1.16.0 | Requisições HTTP |
| `@react-navigation/native` | ^7.2.2 | Navegação |
| `@react-navigation/stack` | ^7.8.10 | Navegação em pilha |
| `@react-navigation/drawer` | ^7.9.8 | Menu lateral |
| `@react-navigation/bottom-tabs` | ^7.15.10 | Abas inferiores |
| `expo-secure-store` | ~15.0.8 | Armazenamento criptografado |
| `@react-native-async-storage/async-storage` | ^2.2.0 | Armazenamento local |
| `expo-image-picker` | ~17.0.11 | Seleção de imagens |
| `expo-file-system` | ~19.0.21 | Sistema de arquivos |
| `expo-font` | ~14.0.11 | Carregamento de fontes |
| `@expo-google-fonts/nunito` | ^0.4.2 | Fonte Nunito |
| `expo-splash-screen` | ~31.0.13 | Tela de splash |
| `react-native-calendars` | ^1.1314.0 | Componente de calendário |
| `react-native-circular-progress-indicator` | ^4.4.2 | Indicador circular |
| `react-native-gesture-handler` | ~2.28.0 | Gestos touch |
| `react-native-reanimated` | ~4.1.1 | Animações |
| `react-native-safe-area-context` | ~5.6.0 | Áreas seguras |
| `react-native-screens` | ~4.16.0 | Otimização de telas |
| `react-native-qrcode-svg` | ^6.3.21 | Geração de QR Code |
| `@react-native-community/datetimepicker` | 8.4.4 | Seletor de data/hora |

### Desenvolvimento

| Pacote | Versão | Finalidade |
|---|---|---|
| `babel-preset-expo` | ~54.0.10 | Transpilação |
| `jest-expo` | ^55.0.17 | Testes com Jest |
| `react-native-svg-transformer` | ^1.5.3 | Importação de SVGs |
