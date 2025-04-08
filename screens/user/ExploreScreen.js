import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

// Sample data for itineraries
const itineraries = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    location: 'Nepal',
    duration: '14 days',
    price: 1200,
    rating: 4.8,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Hard',
    category: 'Mountain',
  },
  {
    id: '2',
    title: 'Annapurna Circuit',
    location: 'Nepal',
    duration: '12 days',
    price: 1000,
    rating: 4.7,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Moderate',
    category: 'Mountain',
  },
  {
    id: '3',
    title: 'Inca Trail to Machu Picchu',
    location: 'Peru',
    duration: '4 days',
    price: 800,
    rating: 4.9,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Moderate',
    category: 'Historical',
  },
  {
    id: '4',
    title: 'Kilimanjaro Climb',
    location: 'Tanzania',
    duration: '7 days',
    price: 1500,
    rating: 4.6,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Hard',
    category: 'Mountain',
  },
  {
    id: '5',
    title: 'Torres del Paine Circuit',
    location: 'Chile',
    duration: '8 days',
    price: 1100,
    rating: 4.5,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Moderate',
    category: 'Nature',
  },
  {
    id: '6',
    title: 'Mont Blanc Circuit',
    location: 'France/Italy/Switzerland',
    duration: '11 days',
    price: 1300,
    rating: 4.7,
    image: 'https://placeholder.svg?height=200&width=300',
    difficulty: 'Moderate',
    category: 'Mountain',
  },
]

// Categories
const categories = [
  { id: 'all', name: 'All' },
  { id: 'mountain', name: 'Mountain' },
  { id: 'historical', name: 'Historical' },
  { id: 'nature', name: 'Nature' },
  { id: 'desert', name: 'Desert' },
  { id: 'coastal', name: 'Coastal' },
]

// Difficulty levels
const difficulties = [
  { id: 'all', name: 'All Levels' },
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'hard', name: 'Hard' },
]

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [showFilters, setShowFilters] = useState(false)

  const filteredItineraries = itineraries.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()

    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice
  })

  const renderItineraryItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
      onPress={() =>
        navigation.navigate('ItineraryDetail', { itinerary: item })
      }
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
        <View className="flex-row mt-2 pt-2 border-t border-gray-100">
          <View className="bg-gray-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-gray-700">{item.difficulty}</Text>
          </View>
          <View className="bg-gray-100 px-2 py-1 rounded-full ml-2">
            <Text className="text-xs text-gray-700">{item.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Explore Treks
          </Text>

          {/* Search Bar */}
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-white rounded-full px-4 py-2 border border-gray-300 flex-1">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="Search destinations, treks..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity
              className="ml-2 p-3 bg-primary rounded-full"
              onPress={() => setShowFilters(!showFilters)}
            >
              <Ionicons name="options-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        {showFilters && (
          <View className="px-6 py-3 bg-white border-t border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Filters
            </Text>

            <Text className="text-gray-700 font-medium mb-2">Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={`mr-2 px-4 py-2 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    className={
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'text-gray-800'
                    }
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-gray-700 font-medium mb-2">Difficulty</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty.id}
                  className={`mr-2 px-4 py-2 rounded-full ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-primary'
                      : 'bg-gray-200'
                  }`}
                  onPress={() => setSelectedDifficulty(difficulty.id)}
                >
                  <Text
                    className={
                      selectedDifficulty === difficulty.id
                        ? 'text-white'
                        : 'text-gray-800'
                    }
                  >
                    {difficulty.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onPress={() => {
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                  setPriceRange([0, 2000])
                }}
              >
                <Text className="text-gray-800">Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-lg"
                onPress={() => setShowFilters(false)}
              >
                <Text className="text-white">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Itineraries List */}
        <FlatList
          data={filteredItineraries}
          renderItem={renderItineraryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-12">
              <Ionicons name="search" size={48} color="#ccc" />
              <Text className="mt-4 text-gray-500 text-center">
                No treks found
              </Text>
              <Text className="text-gray-500 text-center">
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default ExploreScreen
