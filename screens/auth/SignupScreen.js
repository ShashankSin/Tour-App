"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"

const SignupScreen = ({ route, navigation }) => {
  const { userType = "user" } = route.params || {}
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { signInWithEmailPassword, signInWithGoogle, signInWithApple } = useAuth()

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, you would create a new user account here
      // For this example, we'll just sign in with the provided credentials
      const result = await signInWithEmailPassword(email, password, userType)
      if (!result.success) {
        setError("Failed to create account")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle(userType)
    } catch (error) {
      setError("Google sign up failed")
      console.error(error)
    }
  }

  const handleAppleSignup = async () => {
    try {
      await signInWithApple(userType)
    } catch (error) {
      setError("Apple sign up failed")
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

        <View className="items-center my-6">
          <Image source={{ uri: "https://placeholder.svg?height=120&width=120" }} className="w-24 h-24 mb-4" />
          <Text className="text-2xl font-bold text-gray-800">
            {userType === "company" ? "Register Your Company" : "Create Account"}
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            {userType === "company"
              ? "Sign up to start offering trekking experiences"
              : "Sign up to discover amazing treks"}
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">
              {userType === "company" ? "Company Name" : "Full Name"}
            </Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder={userType === "company" ? "Enter company name" : "Enter your name"}
              value={name}
              onChangeText={setName}
            />
          </View>

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

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {error ? <Text className="text-red-500">{error}</Text> : null}
        </View>

        <TouchableOpacity
          className={`bg-primary p-4 rounded-lg items-center ${isLoading ? "opacity-70" : ""}`}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign Up</Text>
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
            onPress={handleGoogleSignup}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-black p-4 rounded-lg flex-1 items-center" onPress={handleAppleSignup}>
            <Ionicons name="logo-apple" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login", { userType })}>
            <Text className="text-primary font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen

