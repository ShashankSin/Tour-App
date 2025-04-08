"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Sample data for itineraries
const itineraries = [
  {
    id: "1",
    title: "Everest Base Camp Trek",
    location: "Nepal",
    duration: "14 days",
    price: 1200,
    rating: 4.8,
    bookings: 45,
    image: "https://placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Annapurna Circuit",
    location: "Nepal",
    duration: "12 days",
    price: 1000,
    rating: 4.7,
    bookings: 38,
    image: "https://placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Inca Trail to Machu Picchu",
    location: "Peru",
    duration: "4 days",
    price: 800,
    rating: 4.9,
    bookings: 52,
    image: "https://placeholder.svg?height=200&width=300",
  },
]

const CompanyItinerariesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredItineraries = itineraries.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "popular") return matchesSearch && item.bookings > 40
    if (filter === "recent") return matchesSearch // In a real app, you would filter by date

    return matchesSearch
  })

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="p-6 border-b border-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">Itineraries</Text>
            <TouchableOpacity
              className="bg-primary p-2 rounded-full"
              onPress={() => navigation.navigate("CreateItinerary")}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300">
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
        <View className="flex-row px-6 py-3">
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${filter === "all" ? "bg-primary" : "bg-gray-200"}`}
            onPress={() => setFilter("all")}
          >
            <Text className={filter === "all" ? "text-white" : "text-gray-800"}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${filter === "popular" ? "bg-primary" : "bg-gray-200"}`}
            onPress={() => setFilter("popular")}
          >
            <Text className={filter === "popular" ? "text-white" : "text-gray-800"}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`mr-4 px-4 py-2 rounded-full ${filter === "recent" ? "bg-primary" : "bg-gray-200"}`}
            onPress={() => setFilter("recent")}
          >
            <Text className={filter === "recent" ? "text-white" : "text-gray-800"}>Recent</Text>
          </TouchableOpacity>
        </View>

        {/* Itineraries List */}
        <ScrollView className="flex-1 px-6 py-3">
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
                onPress={() => navigation.navigate("EditItinerary", { itinerary: item })}
              >
                <Image source={{ uri: item.image }} className="w-full h-40" />
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#f59e0b" />
                      <Text className="ml-1 text-gray-700">{item.rating}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text className="ml-1 text-gray-600">{item.location}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text className="ml-1 text-gray-600">{item.duration}</Text>
                    </View>
                    <Text className="font-bold text-primary">${item.price}</Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <Text className="text-gray-600">{item.bookings} bookings</Text>
                    <View className="flex-row">
                      <TouchableOpacity className="p-2">
                        <Ionicons name="create-outline" size={20} color="#666" />
                      </TouchableOpacity>
                      <TouchableOpacity className="p-2">
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="search" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">No itineraries found</Text>
              <Text className="text-gray-500 text-center">Try adjusting your search</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CompanyItinerariesScreen

