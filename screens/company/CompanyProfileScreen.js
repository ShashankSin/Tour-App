import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../contexts/AuthContext'

const CompanyProfileScreen = () => {
  const { user, signOut } = useAuth()

  // Sample company data
  const [companyName, setCompanyName] = useState('Himalayan Adventures')
  const [email, setEmail] = useState('info@himalayanadventures.com')
  const [phone, setPhone] = useState('+977 1234567890')
  const [website, setWebsite] = useState('www.himalayanadventures.com')
  const [description, setDescription] = useState(
    'We are a premier trekking company based in Nepal, specializing in Himalayan treks and expeditions. With over 10 years of experience, we provide safe, memorable, and authentic trekking experiences.'
  )
  const [address, setAddress] = useState('Thamel, Kathmandu, Nepal')
  const [logo, setLogo] = useState(
    'https://placeholder.svg?height=200&width=200&text=HA'
  )
  const [coverImage, setCoverImage] = useState(
    'https://placeholder.svg?height=300&width=600&text=Himalayan+Adventures'
  )

  // Notification settings
  const [notifyBookings, setNotifyBookings] = useState(true)
  const [notifyMessages, setNotifyMessages] = useState(true)
  const [notifyReviews, setNotifyReviews] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setLogo(result.assets[0].uri)
    }
  }

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri)
    }
  }

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to a database
    alert('Profile updated successfully!')
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        {/* Cover Image */}
        <View className="relative h-48">
          <Image source={{ uri: coverImage }} className="w-full h-full" />
          <TouchableOpacity
            className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full"
            onPress={pickCoverImage}
          >
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Logo and Company Name */}
        <View className="items-center -mt-16 mb-4">
          <View className="relative">
            <Image
              source={{ uri: logo }}
              className="w-32 h-32 rounded-full border-4 border-white bg-white"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
              onPress={pickLogo}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mt-2">
            {companyName}
          </Text>
        </View>

        {/* Profile Form */}
        <View className="px-6 py-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Company Information
          </Text>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Company Name</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Phone</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Website</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={website}
              onChangeText={setWebsite}
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Address</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Description</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View className="px-6 py-4 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Notification Settings
          </Text>

          <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">New Booking Notifications</Text>
              <Switch
                value={notifyBookings}
                onValueChange={setNotifyBookings}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Message Notifications</Text>
              <Switch
                value={notifyMessages}
                onValueChange={setNotifyMessages}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-gray-800">Review Notifications</Text>
              <Switch
                value={notifyReviews}
                onValueChange={setNotifyReviews}
                trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="flex-row justify-between items-center p-4">
              <Text className="text-gray-800">Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
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

          <TouchableOpacity
            className="bg-red-50 p-4 rounded-lg border border-red-200 flex-row items-center justify-center"
            onPress={signOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className="bg-primary p-4 rounded-lg items-center"
          onPress={handleSaveProfile}
        >
          <Text className="text-white font-bold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CompanyProfileScreen
