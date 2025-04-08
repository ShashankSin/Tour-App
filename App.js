import './global.css'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthNavigator from './navigation/AuthNavigator'
import MainNavigator from './navigation/MainNavigator'
import { AuthProvider, useAuth } from './contexts/AuthContext'
// Main app container
const AppContent = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null // Or a loading screen
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  )
}
