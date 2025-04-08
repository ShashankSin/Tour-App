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

// Sample data for companies
const companies = [
  {
    id: '1',
    name: 'Himalayan Adventures',
    location: 'Nepal',
    rating: 4.8,
    itineraries: 12,
    bookings: 145,
    verified: true,
    image: 'https://placeholder.svg?height=100&width=100&text=HA',
  },
  {
    id: '2',
    name: 'Andes Explorers',
    location: 'Peru',
    rating: 4.6,
    itineraries: 8,
    bookings: 98,
    verified: true,
    image: 'https://placeholder.svg?height=100&width=100&text=AE',
  },
  {
    id: '3',
    name: 'Alpine Trekkers',
    location: 'Switzerland',
    rating: 4.7,
    itineraries: 10,
    bookings: 112,
    verified: false,
    image: 'https://placeholder.svg?height=100&width=100&text=AT',
  },
  {
    id: '4',
    name: 'Kilimanjaro Guides',
    location: 'Tanzania',
    rating: 4.5,
    itineraries: 5,
    bookings: 76,
    verified: true,
    image: 'https://placeholder.svg?height=100&width=100&text=KG',
  },
  {
    id: '5',
    name: 'Patagonia Expeditions',
    location: 'Chile',
    rating: 4.9,
    itineraries: 7,
    bookings: 89,
    verified: true,
    image: 'https://placeholder.svg?height=100&width=100&text=PE',
  },
]

const AdminCompaniesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === 'all') return matchesSearch
    if (filter === 'verified') return matchesSearch && company.verified
    if (filter === 'pending') return matchesSearch && !company.verified

    return matchesSearch
  })

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="p-6 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">Companies</Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300 mt-4">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search companies..."
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
              filter === 'verified' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('verified')}
          >
            <Text
              className={filter === 'verified' ? 'text-white' : 'text-gray-800'}
            >
              Verified
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${
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
        </View>

        {/* Companies List */}
        <ScrollView className="flex-1 px-6 py-3">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <View
                key={company.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: company.image }}
                    className="w-16 h-16 rounded-lg"
                  />
                  <View className="ml-4 flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-lg font-bold text-gray-800">
                        {company.name}
                      </Text>
                      {company.verified ? (
                        <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color="#10b981"
                          />
                          <Text className="ml-1 text-green-800 text-xs font-medium">
                            Verified
                          </Text>
                        </View>
                      ) : (
                        <View className="bg-amber-100 px-2 py-1 rounded-full flex-row items-center">
                          <Ionicons name="time" size={16} color="#f59e0b" />
                          <Text className="ml-1 text-amber-800 text-xs font-medium">
                            Pending
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="flex-row items-center mt-1">
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="#666"
                      />
                      <Text className="ml-1 text-gray-600">
                        {company.location}
                      </Text>
                    </View>
                    <View className="flex-row mt-2">
                      <View className="flex-row items-center mr-4">
                        <Ionicons name="star" size={16} color="#f59e0b" />
                        <Text className="ml-1 text-gray-700">
                          {company.rating}
                        </Text>
                      </View>
                      <View className="flex-row items-center mr-4">
                        <Ionicons name="map-outline" size={16} color="#666" />
                        <Text className="ml-1 text-gray-600">
                          {company.itineraries} itineraries
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color="#666"
                        />
                        <Text className="ml-1 text-gray-600">
                          {company.bookings} bookings
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
                  {!company.verified && (
                    <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg mr-2 flex-row items-center">
                      <Ionicons
                        name="checkmark-outline"
                        size={16}
                        color="white"
                      />
                      <Text className="ml-1 text-white font-medium">
                        Verify
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
              <Ionicons name="business" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">
                No companies found
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

export default AdminCompaniesScreen
