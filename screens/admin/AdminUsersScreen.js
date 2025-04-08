import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

// Sample data for users
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'United States',
    joined: 'Jan 2023',
    bookings: 5,
    status: 'active',
    image: 'https://placeholder.svg?height=100&width=100&text=JD',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    location: 'United Kingdom',
    joined: 'Mar 2023',
    bookings: 3,
    status: 'active',
    image: 'https://placeholder.svg?height=100&width=100&text=SS',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    location: 'Canada',
    joined: 'Feb 2023',
    bookings: 2,
    status: 'inactive',
    image: 'https://placeholder.svg?height=100&width=100&text=MJ',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    location: 'Australia',
    joined: 'Apr 2023',
    bookings: 1,
    status: 'active',
    image: 'https://placeholder.svg?height=100&width=100&text=EW',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.b@example.com',
    location: 'Germany',
    joined: 'May 2023',
    bookings: 0,
    status: 'inactive',
    image: 'https://placeholder.svg?height=100&width=100&text=DB',
  },
]

const AdminUsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === 'all') return matchesSearch
    if (filter === 'active') return matchesSearch && user.status === 'active'
    if (filter === 'inactive')
      return matchesSearch && user.status === 'inactive'

    return matchesSearch
  })

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">Users</Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300 mt-4">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row px-6 py-3">
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${
              filter === 'all' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('all')}
          >
            <Text className={filter === 'all' ? 'text-white' : 'text-gray-800'}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${
              filter === 'active' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('active')}
          >
            <Text
              className={filter === 'active' ? 'text-white' : 'text-gray-800'}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${
              filter === 'inactive' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('inactive')}
          >
            <Text
              className={filter === 'inactive' ? 'text-white' : 'text-gray-800'}
            >
              Inactive
            </Text>
          </TouchableOpacity>
        </View>

        {/* Users List */}
        <ScrollView className="flex-1 px-6 py-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <View
                key={user.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: user.image }}
                    className="w-16 h-16 rounded-full"
                  />
                  <View className="ml-4 flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-lg font-bold text-gray-800">
                        {user.name}
                      </Text>
                      {user.status === 'active' ? (
                        <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
                          <Ionicons name="ellipse" size={8} color="#10b981" />
                          <Text className="ml-1 text-green-800 text-xs font-medium">
                            Active
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-gray-100 px-2 py-1 rounded-full flex-row items-center">
                          <Ionicons name="ellipse" size={8} color="#9ca3af" />
                          <Text className="ml-1 text-gray-800 text-xs font-medium">
                            Inactive
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-600 mt-1">{user.email}</Text>
                    <View className="flex-row mt-2">
                      <View className="flex-row items-center mr-4">
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="ml-1 text-gray-600">
                          {user.location}
                        </Text>
                      </View>
                      <View className="flex-row items-center mr-4">
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="ml-1 text-gray-600">
                          Joined {user.joined}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="bookmark-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="ml-1 text-gray-600">
                          {user.bookings} bookings
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="flex-row mt-4 pt-4 border-t border-gray-100 justify-end">
                  <TouchableOpacity className="bg-gray-200 px-3 py-2 rounded-lg mr-2 flex-row items-center">
                    <Ionicons name="eye-outline" size={16} color="#333" />
                    <Text className="ml-1 text-gray-800 font-medium">View</Text>
                  </TouchableOpacity>
                  {user.status === 'active' ? (
                    <TouchableOpacity className="bg-amber-500 px-3 py-2 rounded-lg mr-2 flex-row items-center">
                      <Ionicons name="ban-outline" size={16} color="white" />
                      <Text className="ml-1 text-white font-medium">
                        Suspend
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg mr-2 flex-row items-center">
                      <Ionicons
                        name="checkmark-outline"
                        size={16}
                        color="white"
                      />
                      <Text className="ml-1 text-white font-medium">
                        Activate
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className="bg-red-500 px-3 py-2 rounded-lg flex-row items-center">
                    <Ionicons name="trash-outline" size={16} color="white" />
                    <Text className="ml-1 text-white font-medium">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="people" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">
                No users found
              </Text>
              <Text className="text-gray-500 text-center">
                Try adjusting your search
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AdminUsersScreen
