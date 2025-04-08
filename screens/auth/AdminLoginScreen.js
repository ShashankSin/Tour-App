"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"

const AdminLoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { signInWithEmailPassword } = useAuth()

  const handleAdminLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, you would validate admin credentials against a secure backend
      // For this example, we'll use a hardcoded check
      if (username === "admin" && password === "admin123") {
        await signInWithEmailPassword("admin@example.com", "admin123", "admin")
      } else {
        setError("Invalid admin credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1 px-6 py-8">
        <TouchableOpacity
          className="p-2 w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View className="items-center my-12">
          <Image source={{ uri: "https://placeholder.svg?height=120&width=120" }} className="w-24 h-24 mb-4" />
          <Text className="text-2xl font-bold text-gray-800">Admin Access</Text>
          <Text className="text-base text-gray-600 text-center mt-2">Sign in to access administrative controls</Text>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Username</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="Enter admin username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="Enter admin password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error ? <Text className="text-red-500">{error}</Text> : null}
        </View>

        <TouchableOpacity
          className={`bg-gray-800 p-4 rounded-lg items-center ${isLoading ? "opacity-70" : ""}`}
          onPress={handleAdminLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Admin Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AdminLoginScreen

