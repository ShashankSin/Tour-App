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

// Sample data for itineraries
const itineraries = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    company: 'Himalayan Adventures',
    location: 'Nepal',
    duration: '14 days',
    price: 1200,
    status: 'approved',
    image: 'https://placeholder.svg?height=200&width=300',
  },
  {
    id: '2',
    title: 'Annapurna Circuit',
    company: 'Himalayan Adventures',
    location: 'Nepal',
    duration: '12 days',
    price: 1000,
    status: 'approved',
    image: 'https://placeholder.svg?height=200&width=300',
  },
  {
    id: '3',
    title: 'Inca Trail to Machu Picchu',
    company: 'Andes Explorers',
    location: 'Peru',
    duration: '4 days',
    price: 800,
    status: 'pending',
    image: 'https://placeholder.svg?height=200&width=300',
  },
  {
    id: '4',
    title: 'Kilimanjaro Climb',
    company: 'Kilimanjaro Guides',
    location: 'Tanzania',
    duration: '7 days',
    price: 1500,
    status: 'pending',
    image: 'https://placeholder.svg?height=200&width=300',
  },
  {
    id: '5',
    title: 'Torres del Paine Circuit',
    company: 'Patagonia Expeditions',
    location: 'Chile',
    duration: '8 days',
    price: 1100,
    status: 'rejected',
    image: 'https://placeholder.svg?height=200&width=300',
  },
]

const AdminItinerariesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredItineraries = itineraries.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === 'all') return matchesSearch
    if (filter === 'approved')
      return matchesSearch && item.status === 'approved'
    if (filter === 'pending') return matchesSearch && item.status === 'pending'
    if (filter === 'rejected')
      return matchesSearch && item.status === 'rejected'

    return matchesSearch
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text className="ml-1 text-green-800 text-xs font-medium">
              Approved
            </Text>
          </View>
        )
      case 'pending':
        return (
          <View className="bg-amber-100 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="time" size={16} color="#f59e0b" />
            <Text className="ml-1 text-amber-800 text-xs font-medium">
              Pending
            </Text>
          </View>
        )
      case 'rejected':
        return (
          <View className="bg-red-100 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="close-circle" size={16} color="#ef4444" />
            <Text className="ml-1 text-red-800 text-xs font-medium">
              Rejected
            </Text>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">Itineraries</Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300 mt-4">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search itineraries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row px-6 py-3 flex-wrap">
          <TouchableOpacity
            className={`mr-2 mb-2 px-4 py-2 rounded-full ${
              filter === 'all' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('all')}
          >
            <Text className={filter === 'all' ? 'text-white' : 'text-gray-800'}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-2 mb-2 px-4 py-2 rounded-full ${
              filter === 'approved' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('approved')}
          >
            <Text
              className={filter === 'approved' ? 'text-white' : 'text-gray-800'}
            >
              Approved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-2 mb-2 px-4 py-2 rounded-full ${
              filter === 'pending' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('pending')}
          >
            <Text
              className={filter === 'pending' ? 'text-white' : 'text-gray-800'}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-2 mb-2 px-4 py-2 rounded-full ${
              filter === 'rejected' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('rejected')}
          >
            <Text
              className={filter === 'rejected' ? 'text-white' : 'text-gray-800'}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </View>

        {/* Itineraries List */}
        <ScrollView className="flex-1 px-6 py-3">
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
              >
                <Image source={{ uri: item.image }} className="w-full h-40" />
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800">
                      {item.title}
                    </Text>
                    {getStatusBadge(item.status)}
                  </View>
                  <Text className="text-gray-600 mb-2">By {item.company}</Text>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600">{item.location}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text className="ml-1 text-gray-600">
                        {item.duration}
                      </Text>
                    </View>
                    <Text className="font-bold text-primary">
                      ${item.price}
                    </Text>
                  </View>

                  <View className="flex-row mt-4 pt-4 border-t border-gray-100 justify-end">
                    <TouchableOpacity className="bg-gray-200 px-3 py-2 rounded-lg mr-2 flex-row items-center">
                      <Ionicons name="eye-outline" size={16} color="#333" />
                      <Text className="ml-1 text-gray-800 font-medium">
                        View
                      </Text>
                    </TouchableOpacity>
                    {item.status === 'pending' && (
                      <>
                        <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg mr-2 flex-row items-center">
                          <Ionicons
                            name="checkmark-outline"
                            size={16}
                            color="white"
                          />
                          <Text className="ml-1 text-white font-medium">
                            Approve
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-500 px-3 py-2 rounded-lg flex-row items-center">
                          <Ionicons
                            name="close-outline"
                            size={16}
                            color="white"
                          />
                          <Text className="ml-1 text-white font-medium">
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="map" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">
                No itineraries found
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

export default AdminItinerariesScreen
