'use client'

import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'
import { formik } from 'formik'
import * as Yup from 'yup'

const LoginScreen = ({ route, navigation }) => {
  const { userType = 'user' } = route.params || {}
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { signInWithEmailPassword, signInWithGoogle, signInWithApple } =
    useAuth()

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await signInWithEmailPassword(email, password, userType)
      if (!result.success) {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(userType)
    } catch (error) {
      setError('Google sign in failed')
      console.error(error)
    }
  }

  const handleAppleLogin = async () => {
    try {
      await signInWithApple(userType)
    } catch (error) {
      setError('Apple sign in failed')
      console.error(error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-6 py-8">
        <TouchableOpacity
          className="p-2 w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View className="items-center my-8">
          <Image
            source={{ uri: 'https://placeholder.svg?height=120&width=120' }}
            className="w-24 h-24 mb-4"
          />
          <Text className="text-2xl font-bold text-gray-800">
            {userType === 'company' ? 'Company Login' : 'Welcome Back'}
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            {userType === 'company'
              ? 'Sign in to manage your trekking business'
              : 'Sign in to continue your adventure'}
          </Text>
        </View>

        <formik
          initalValues={{ email: '', password: '' }}
          onsubmit={handleEmailLogin}
        >
          <View className="space-y-4 mb-6">
            //! Email
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-gray-300"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            //! Password
            <View>
              <Text className="text-gray-700 mb-2 font-medium">Password</Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-gray-300"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            {error ? <Text className="text-red-500">{error}</Text> : null}
            <TouchableOpacity className="items-end">
              <Text className="text-primary font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </formik>

        <TouchableOpacity
          className={`bg-primary p-4 rounded-lg items-center ${
            isLoading ? 'opacity-70' : ''
          }`}
          onPress={handleEmailLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-0.5 bg-gray-300" />
          <Text className="mx-4 text-gray-500">Or continue with</Text>
          <View className="flex-1 h-0.5 bg-gray-300" />
        </View>

        <View className="flex-row justify-center space-x-4 mb-6">
          <TouchableOpacity
            className="bg-white p-4 rounded-lg border border-gray-300 flex-1 items-center"
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-black p-4 rounded-lg flex-1 items-center"
            onPress={handleAppleLogin}
          >
            <Ionicons name="logo-apple" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup', { userType })}
          >
            <Text className="text-primary font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen
