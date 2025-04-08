'use client'

import { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  FlatList,
  Dimensions,
  Easing,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedView from '../../components/AnimatedView'
import Card from '../../components/Card'
import GradientButton from '../../components/GradientButton'
import AnimatedImage from '../../components/AnimatedImage'

const { width, height } = Dimensions.get('window')

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
    description:
      'Experience the breathtaking beauty of the Himalayas on this iconic trek to Everest Base Camp.',
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
    description:
      'Trek through diverse landscapes and traditional villages on this classic Himalayan adventure.',
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
    description:
      'Follow ancient pathways to the mystical lost city of the Incas through stunning mountain scenery.',
  },
]

// Categories with beautiful gradients
const categories = [
  {
    id: 'all',
    name: 'All',
    icon: 'globe-outline',
    gradient: ['#3b82f6', '#2563eb'],
  },
  {
    id: 'mountain',
    name: 'Mountain',
    icon: 'triangle-outline',
    gradient: ['#8b5cf6', '#6366f1'],
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: 'leaf-outline',
    gradient: ['#10b981', '#059669'],
  },
  {
    id: 'beach',
    name: 'Beach',
    icon: 'water-outline',
    gradient: ['#f59e0b', '#d97706'],
  },
  {
    id: 'desert',
    name: 'Desert',
    icon: 'sunny-outline',
    gradient: ['#ef4444', '#dc2626'],
  },
]

// Popular destinations with better images
const destinations = [
  {
    id: '1',
    name: 'Nepal',
    image: 'https://placeholder.svg?height=150&width=120&text=Nepal',
    gradient: ['#3b82f6', '#1d4ed8'],
  },
  {
    id: '2',
    name: 'Peru',
    image: 'https://placeholder.svg?height=150&width=120&text=Peru',
    gradient: ['#8b5cf6', '#7c3aed'],
  },
  {
    id: '3',
    name: 'New Zealand',
    image: 'https://placeholder.svg?height=150&width=120&text=New+Zealand',
    gradient: ['#10b981', '#047857'],
  },
  {
    id: '4',
    name: 'Switzerland',
    image: 'https://placeholder.svg?height=150&width=120&text=Switzerland',
    gradient: ['#f59e0b', '#b45309'],
  },
  {
    id: '5',
    name: 'Tanzania',
    image: 'https://placeholder.svg?height=150&width=120&text=Tanzania',
    gradient: ['#ef4444', '#b91c1c'],
  },
]

// Special offers with beautiful gradients
const specialOffers = [
  {
    title: 'Summer Sale',
    discount: '20% OFF',
    description: 'Book any trek before August',
    gradient: ['#f43f5e', '#e11d48'],
  },
  {
    title: 'Group Discount',
    discount: '15% OFF',
    description: 'For groups of 4 or more',
    gradient: ['#8b5cf6', '#7c3aed'],
  },
  {
    title: 'Early Bird',
    discount: '10% OFF',
    description: 'Book 3 months in advance',
    gradient: ['#10b981', '#059669'],
  },
]

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [weatherData, setWeatherData] = useState({
    temp: '24°C',
    condition: 'Sunny',
  })

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current
  const searchBarTranslateY = useRef(new Animated.Value(100)).current
  const searchBarOpacity = useRef(new Animated.Value(0)).current
  const floatingButtonScale = useRef(new Animated.Value(0)).current
  const weatherIconRotate = useRef(new Animated.Value(0)).current

  // Parallax effect for header
  const headerParallaxY = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [50, 0, -30],
    extrapolate: 'clamp',
  })

  // Animation for weather icon
  const weatherIconSpin = weatherIconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    // Animate search bar on mount
    Animated.parallel([
      Animated.timing(searchBarTranslateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(searchBarOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()

    // Animate floating button
    Animated.spring(floatingButtonScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start()

    // Animate weather icon
    Animated.loop(
      Animated.timing(weatherIconRotate, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  // Animation for header
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  })

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [240, 140],
    extrapolate: 'clamp',
  })

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.1, 1],
    extrapolate: 'clamp',
  })

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const renderCategoryItem = ({ item, index }) => (
    <AnimatedView animation="fadeIn" delay={200 + index * 50}>
      <TouchableOpacity
        className="mr-3 rounded-full overflow-hidden"
        onPress={() => setSelectedCategory(item.id)}
        style={{
          elevation: selectedCategory === item.id ? 5 : 2,
          shadowColor: selectedCategory === item.id ? item.gradient[0] : '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: selectedCategory === item.id ? 0.3 : 0.1,
          shadowRadius: selectedCategory === item.id ? 4 : 2,
        }}
      >
        <LinearGradient
          colors={
            selectedCategory === item.id
              ? item.gradient
              : ['#f3f4f6', '#e5e7eb']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-4 py-2 flex-row items-center"
        >
          <Ionicons
            name={item.icon}
            size={16}
            color={selectedCategory === item.id ? 'white' : '#6b7280'}
          />
          <Text
            className={`ml-1 ${
              selectedCategory === item.id
                ? 'text-white font-medium'
                : 'text-gray-700'
            }`}
          >
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedView>
  )

  const renderDestinationItem = ({ item, index }) => (
    <AnimatedView animation="fadeIn" delay={400 + index * 100}>
      <TouchableOpacity
        className="mr-4 relative rounded-xl overflow-hidden"
        style={{
          elevation: 5,
          shadowColor: item.gradient[0],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Image
          source={{ uri: item.image }}
          className="w-32 h-44"
          animationType="scale"
        />
        <LinearGradient
          colors={['transparent', item.gradient[0]]}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
        />
        <View className="absolute bottom-2 left-2 right-2">
          <Text className="text-white font-bold">{item.name}</Text>
        </View>
      </TouchableOpacity>
    </AnimatedView>
  )

  const renderTrekItem = ({ item, index }) => {
    return (
      <Card
        key={item.id}
        animation="scaleIn"
        delay={150 + index * 100}
        style={{
          width: width * 0.75,
          marginRight: 16,
          elevation: 8,
          shadowColor: '#2563eb',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
        onPress={() =>
          navigation.navigate('ItineraryDetail', { itinerary: item })
        }
      >
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full h-40 rounded-t-xl"
            animationType="fadeIn"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />
          <View className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text className="ml-1 text-yellow-700 font-bold text-xs">
              {item.rating}
            </Text>
          </View>
          <View className="absolute top-3 left-3 bg-primary bg-opacity-90 px-2 py-1 rounded-full">
            <Text className="text-white font-bold text-xs">
              {item.difficulty}
            </Text>
          </View>
        </View>

        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {item.title}
          </Text>

          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text className="ml-1 text-gray-600">{item.location}</Text>
          </View>

          <Text
            className="text-gray-600 text-sm mb-3 line-clamp-2"
            numberOfLines={2}
          >
            {item.description}
          </Text>

          <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text className="ml-1 text-gray-600 text-xs">
                {item.duration}
              </Text>
            </View>
            <Text className="font-bold text-primary text-lg">
              ${item.price}
            </Text>
          </View>
        </View>
      </Card>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View
        style={{
          height: headerHeight,
          opacity: headerOpacity,
          zIndex: 10,
          transform: [{ translateY: headerParallaxY }, { scale: headerScale }],
        }}
      >
        <LinearGradient
          colors={['#2563eb', '#3b82f6', '#60a5fa']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-6 pb-10 flex-1"
        >
          {/* Decorative elements */}
          <View className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white opacity-10" />
          <View className="absolute bottom-20 left-5 w-12 h-12 rounded-full bg-white opacity-10" />
          <View className="absolute top-20 left-20 w-8 h-8 rounded-full bg-white opacity-10" />

          <View className="flex-row justify-between items-center">
            <View>
              <AnimatedView animation="fadeIn" delay={100}>
                <Text className="text-white text-opacity-90">
                  Welcome back,
                </Text>
                <Text className="text-2xl font-bold text-white">
                  {user?.name || 'Traveler'}
                </Text>
              </AnimatedView>

              <AnimatedView
                animation="fadeIn"
                delay={150}
                className="flex-row items-center mt-1"
              >
                <Animated.View
                  style={{ transform: [{ rotate: weatherIconSpin }] }}
                >
                  <Ionicons
                    name={weatherData.condition === 'Sunny' ? 'sunny' : 'cloud'}
                    size={16}
                    color="white"
                  />
                </Animated.View>
                <Text className="text-white ml-1">
                  {weatherData.temp} • {weatherData.condition}
                </Text>
              </AnimatedView>
            </View>

            <View className="flex-row items-center">
              <TouchableOpacity
                className="mr-4 relative"
                onPress={() => navigation.navigate('Notifications')}
              >
                <AnimatedView animation="bounceIn" delay={200}>
                  <View className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Ionicons
                      name="notifications-outline"
                      size={22}
                      color="white"
                    />
                  </View>
                  <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white" />
                </AnimatedView>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <AnimatedView animation="bounceIn" delay={250}>
                  {user?.picture ? (
                    <Image
                      source={{ uri: user.picture }}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ) : (
                    <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                      <Text className="text-primary font-bold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </Text>
                    </View>
                  )}
                </AnimatedView>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <Animated.View
            className="mt-6"
            style={{
              transform: [{ translateY: searchBarTranslateY }],
              opacity: searchBarOpacity,
            }}
          >
            <View className="flex-row items-center bg-white rounded-full px-4 py-3 border border-gray-100 shadow-lg">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-gray-800"
                placeholder="Search destinations, treks..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity className="bg-gray-100 p-1 rounded-full">
                <Ionicons name="options-outline" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1 -mt-6"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
      >
        <View className="bg-gray-50 rounded-t-3xl pt-6 px-6">
          {/* Categories */}
          <AnimatedView animation="fadeIn" delay={150}>
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Categories
            </Text>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            />
          </AnimatedView>

          {/* Featured Treks */}
          <AnimatedView animation="slideUp" delay={100}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Featured Treks
              </Text>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.navigate('Explore')}
              >
                <Text className="text-primary mr-1">See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={itineraries}
              renderItem={renderTrekItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
              snapToInterval={width * 0.75 + 16}
              decelerationRate="fast"
              snapToAlignment="center"
            />
          </AnimatedView>

          {/* Popular Destinations */}
          <AnimatedView animation="slideUp" delay={300}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Popular Destinations
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-primary mr-1">See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={destinations}
              renderItem={renderDestinationItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            />
          </AnimatedView>

          {/* Budget Planner */}
          <AnimatedView animation="slideUp" delay={500} className="mb-6">
            <TouchableOpacity
              className="rounded-xl overflow-hidden"
              onPress={() => navigation.navigate('BudgetPlanner')}
              style={{
                elevation: 8,
                shadowColor: '#f97316',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <LinearGradient
                colors={['#f97316', '#fb923c', '#fdba74']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-5 rounded-xl"
              >
                <View className="flex-row items-center">
                  <View className="bg-white p-3 rounded-full mr-4 shadow-md">
                    <Ionicons
                      name="calculator-outline"
                      size={24}
                      color="#f97316"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-bold text-lg">
                      Budget Planner
                    </Text>
                    <Text className="text-white opacity-90">
                      Find the perfect trek for your budget
                    </Text>
                  </View>
                  <View className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Ionicons name="chevron-forward" size={20} color="white" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedView>

          {/* Upcoming Treks */}
          <AnimatedView animation="slideUp" delay={600} className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Upcoming Treks
            </Text>

            <Card
              animation="fadeIn"
              delay={650}
              style={{
                elevation: 8,
                shadowColor: '#4f46e5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <LinearGradient
                colors={['#4f46e5', '#6366f1', '#818cf8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-4 rounded-t-xl"
              >
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      Your Next Adventure
                    </Text>
                    <Text className="text-white opacity-90">
                      Annapurna Circuit
                    </Text>
                  </View>
                  <View className="bg-white p-2 rounded-full">
                    <Ionicons name="calendar" size={20} color="#4f46e5" />
                  </View>
                </View>
              </LinearGradient>

              <View className="p-4 bg-white rounded-b-xl">
                <View className="flex-row items-center mb-3">
                  <Ionicons name="calendar-outline" size={20} color="#6366f1" />
                  <Text className="ml-2 text-gray-700">
                    July 10 - July 22, 2023
                  </Text>
                </View>

                <View className="flex-row items-center mb-3">
                  <Ionicons name="people-outline" size={20} color="#6366f1" />
                  <Text className="ml-2 text-gray-700">2 Travelers</Text>
                </View>

                <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <Text className="text-gray-700">Confirmed</Text>
                </View>

                <View className="mt-4 pt-4 border-t border-gray-100">
                  <GradientButton
                    title="View Details"
                    colors={['#4f46e5', '#6366f1']}
                    onPress={() => {}}
                    icon={
                      <Ionicons
                        name="eye-outline"
                        size={16}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                    }
                  />
                </View>
              </View>
            </Card>
          </AnimatedView>

          {/* Special Offers */}
          <AnimatedView animation="slideUp" delay={700} className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Special Offers
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {specialOffers.map((offer, index) => (
                <AnimatedView
                  key={index}
                  animation="scaleIn"
                  delay={750 + index * 100}
                  className="mr-4"
                >
                  <TouchableOpacity
                    style={{
                      elevation: 8,
                      shadowColor: offer.gradient[0],
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                    }}
                  >
                    <LinearGradient
                      colors={offer.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="p-5 rounded-xl w-56 h-36 justify-between"
                    >
                      {/* Decorative elements */}
                      <View className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white opacity-10" />
                      <View className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white opacity-10" />

                      <Text className="text-white font-bold text-lg">
                        {offer.title}
                      </Text>
                      <View>
                        <Text className="text-white text-2xl font-bold">
                          {offer.discount}
                        </Text>
                        <Text className="text-white opacity-90">
                          {offer.description}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </AnimatedView>
              ))}
            </ScrollView>
          </AnimatedView>

          {/* Travel Tips */}
          <AnimatedView animation="slideUp" delay={800} className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Travel Tips
            </Text>

            <View className="bg-white rounded-xl p-4 shadow-md">
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color="#2563eb"
                  />
                </View>
                <Text className="text-lg font-bold text-gray-800">
                  Packing Essentials
                </Text>
              </View>

              <Text className="text-gray-600 mb-3">
                Make sure to pack these essential items for your next trekking
                adventure:
              </Text>

              <View className="space-y-2">
                {[
                  'Waterproof hiking boots',
                  'Weather-appropriate clothing',
                  'First aid kit',
                  'Water bottle and purification',
                  'Navigation tools',
                ].map((item, index) => (
                  <View key={index} className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    <Text className="text-gray-700">{item}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity className="mt-4 flex-row items-center">
                <Text className="text-primary font-medium mr-1">
                  Read more tips
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>
          </AnimatedView>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          transform: [{ scale: floatingButtonScale }],
        }}
      >
        <TouchableOpacity
          className="bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => navigation.navigate('Explore')}
          style={{
            elevation: 8,
            shadowColor: '#2563eb',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            className="w-full h-full rounded-full items-center justify-center"
          >
            <Ionicons name="compass" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

export default HomeScreen
