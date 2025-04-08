"use client"

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Google from "expo-auth-session/providers/google"
import * as AppleAuthentication from "expo-apple-authentication"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  })

  useEffect(() => {
    // Check for stored user
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      // Handle Google sign in success
      fetchUserInfo(authentication.accessToken)
    }
  }, [response])

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const userInfo = await response.json()
      handleSignIn({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        type: "user", // Default to user type
      })
    } catch (error) {
      console.error("Error fetching Google user info:", error)
    }
  }

  const handleSignIn = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const signInWithGoogle = async (userType = "user") => {
    try {
      const result = await promptAsync()
      if (result.type === "success") {
        // User type will be set in fetchUserInfo
      }
    } catch (error) {
      console.error("Google sign in error:", error)
    }
  }

  const signInWithApple = async (userType = "user") => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      // Handle Apple sign in success
      handleSignIn({
        id: credential.user,
        email: credential.email,
        name: credential.fullName?.givenName || "Apple User",
        type: userType,
      })
    } catch (error) {
      console.error("Apple sign in error:", error)
    }
  }

  const signInWithEmailPassword = async (email, password, userType = "user") => {
    try {
      // In a real app, you would validate with a backend
      // This is a simplified example
      const userData = {
        id: "user-" + Date.now(),
        email,
        name: email.split("@")[0],
        type: userType,
      }

      handleSignIn(userData)
      return { success: true }
    } catch (error) {
      console.error("Email sign in error:", error)
      return { success: false, error }
    }
  }

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const value = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithApple,
    signInWithEmailPassword,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

