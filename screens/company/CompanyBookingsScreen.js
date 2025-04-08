import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

// Sample data for bookings
const bookings = [
  {
    id: '1',
    customer: 'John Doe',
    itinerary: 'Everest Base Camp Trek',
    startDate: '2023-06-15',
    endDate: '2023-06-29',
    participants: 2,
    totalAmount: 2400,
    status: 'confirmed',
  },
  {
    id: '2',
    customer: 'Sarah Smith',
    itinerary: 'Annapurna Circuit',
    startDate: '2023-07-10',
    endDate: '2023-07-22',
    participants: 1,
    totalAmount: 1000,
    status: 'confirmed',
  },
  {
    id: '3',
    customer: 'Michael Johnson',
    itinerary: 'Inca Trail to Machu Picchu',
    startDate: '2023-08-05',
    endDate: '2023-08-09',
    participants: 3,
    totalAmount: 2400,
    status: 'pending',
  },
  {
    id: '4',
    customer: 'Emily Wilson',
    itinerary: 'Everest Base Camp Trek',
    startDate: '2023-09-12',
    endDate: '2023-09-26',
    participants: 2,
    totalAmount: 2400,
    status: 'cancelled',
  },
  {
    id: '5',
    customer: 'David Brown',
    itinerary: 'Annapurna Circuit',
    startDate: '2023-10-05',
    endDate: '2023-10-17',
    participants: 4,
    totalAmount: 4000,
    status: 'pending',
  },
]

const CompanyBookingsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.itinerary.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === 'all') return matchesSearch
    if (filter === 'confirmed')
      return matchesSearch && booking.status === 'confirmed'
    if (filter === 'pending')
      return matchesSearch && booking.status === 'pending'
    if (filter === 'cancelled')
      return matchesSearch && booking.status === 'cancelled'

    return matchesSearch
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text className="ml-1 text-green-800 text-xs font-medium">
              Confirmed
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
      case 'cancelled':
        return (
          <View className="bg-red-100 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="close-circle" size={16} color="#ef4444" />
            <Text className="ml-1 text-red-800 text-xs font-medium">
              Cancelled
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
          <Text className="text-2xl font-bold text-gray-800">Bookings</Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300 mt-4">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-gray-800"
              placeholder="Search bookings..."
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
              filter === 'confirmed' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('confirmed')}
          >
            <Text
              className={
                filter === 'confirmed' ? 'text-white' : 'text-gray-800'
              }
            >
              Confirmed
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
              filter === 'cancelled' ? 'bg-primary' : 'bg-gray-200'
            }`}
            onPress={() => setFilter('cancelled')}
          >
            <Text
              className={
                filter === 'cancelled' ? 'text-white' : 'text-gray-800'
              }
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <ScrollView className="flex-1 px-6 py-3">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 p-4"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-gray-800">
                    {booking.customer}
                  </Text>
                  {getStatusBadge(booking.status)}
                </View>
                <Text className="text-gray-600 mb-3">{booking.itinerary}</Text>

                <View className="flex-row flex-wrap">
                  <View className="mr-4 mb-2">
                    <Text className="text-gray-500 text-xs">Dates</Text>
                    <Text className="text-gray-700">
                      {formatDate(booking.startDate)} -{' '}
                      {formatDate(booking.endDate)}
                    </Text>
                  </View>

                  <View className="mr-4 mb-2">
                    <Text className="text-gray-500 text-xs">Participants</Text>
                    <Text className="text-gray-700">
                      {booking.participants}
                    </Text>
                  </View>

                  <View className="mb-2">
                    <Text className="text-gray-500 text-xs">Total Amount</Text>
                    <Text className="text-gray-700 font-bold">
                      ${booking.totalAmount}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mt-4 pt-4 border-t border-gray-100 justify-end">
                  <TouchableOpacity className="bg-gray-200 px-3 py-2 rounded-lg mr-2 flex-row items-center">
                    <Ionicons name="eye-outline" size={16} color="#333" />
                    <Text className="ml-1 text-gray-800 font-medium">View</Text>
                  </TouchableOpacity>

                  {booking.status === 'pending' && (
                    <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg mr-2 flex-row items-center">
                      <Ionicons
                        name="checkmark-outline"
                        size={16}
                        color="white"
                      />
                      <Text className="ml-1 text-white font-medium">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  )}

                  {booking.status !== 'cancelled' && (
                    <TouchableOpacity className="bg-red-500 px-3 py-2 rounded-lg flex-row items-center">
                      <Ionicons name="close-outline" size={16} color="white" />
                      <Text className="ml-1 text-white font-medium">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="calendar" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">
                No bookings found
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

export default CompanyBookingsScreen
