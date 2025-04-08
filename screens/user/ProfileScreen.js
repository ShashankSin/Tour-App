import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../contexts/AuthContext'

const ProfileScreen = () => {
  const { user, signOut } = useAuth()

  // Sample user data
  const [profileImage, setProfileImage] = useState(
    user?.picture || 'https://placeholder.svg?height=200&width=200&text=User'
  )

  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Sample booking history
  const bookings = [
    {
      id: '1',
      trek: 'Everest Base Camp Trek',
      date: 'Jun 15, 2023',
      status: 'completed',
    },
    {
      id: '2',
      trek: 'Annapurna Circuit',
      date: 'Aug 10, 2023',
      status: 'upcoming',
    },
  ]

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <View className="bg-green-100 px-2 py-1 rounded-full">
            <Text className="text-green-800 text-xs font-medium">
              Completed
            </Text>
          </View>
        )
      case 'upcoming':
        return (
          <View className="bg-blue-100 px-2 py-1 rounded-full">
            <Text className="text-blue-800 text-xs font-medium">Upcoming</Text>
          </View>
        )
      case 'cancelled':
        return (
          <View className="bg-red-100 px-2 py-1 rounded-full">
            <Text className="text-red-800 text-xs font-medium">Cancelled</Text>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-6 items-center">
          <View className="relative">
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
              onPress={pickImage}
            >
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold text-gray-800 mt-4">
            {user?.name || 'User Name'}
          </Text>
          <Text className="text-gray-600">
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        {/* Booking History */}
        <View className="px-6 py-4 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            My Bookings
          </Text>

          {bookings.length > 0 ? (
            <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              {bookings.map((booking, index) => (
                <TouchableOpacity
                  key={booking.id}
                  className={`p-4 ${
                    index < bookings.length - 1
                      ? 'border-b border-gray-200'
                      : ''
                  }`}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="font-bold text-gray-800">
                        {booking.trek}
                      </Text>
                      <Text className="text-gray-600 mt-1">{booking.date}</Text>
                    </View>
                    {getStatusBadge(booking.status)}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-lg border border-gray-300 p-6 items-center">
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text className="mt-2 text-gray-500">No bookings yet</Text>
            </View>
          )}

          <TouchableOpacity className="mt-4 bg-gray-200 p-3 rounded-lg items-center">
            <Text className="text-gray-800 font-medium">View All Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View className="px-6 py-4 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-4">Settings</Text>

          <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row justify-between items-center p-4">
              <Text className="text-gray-800">Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View className="px-6 py-4 border-t border-gray-200 mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">Account</Text>

          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-300 flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-800">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-300 flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="lock-closed-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-800">Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-300 flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="card-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-800">Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-300 flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={20} color="#666" />
              <Text className="ml-2 text-gray-800">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-50 p-4 rounded-lg border border-red-200 flex-row items-center justify-center"
            onPress={signOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
