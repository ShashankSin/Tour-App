'use client'

import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Animated,
  Share,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedView from '../../components/AnimatedView'
import GradientButton from '../../components/GradientButton'
import AnimatedHeader from '../../components/AnimatedHeader'
import BottomSheet from '../../components/BottomSheet'
import astar from '../../algorithms/astar'

// Sample trek route for demonstration
const trekRoute = [
  { latitude: 27.7172, longitude: 85.324, title: 'Start Point' }, // Kathmandu
  { latitude: 27.8, longitude: 85.4, title: 'Checkpoint 1' },
  { latitude: 27.85, longitude: 85.5, title: 'Checkpoint 2' },
  { latitude: 27.9, longitude: 85.6, title: 'Checkpoint 3' },
  { latitude: 27.95, longitude: 85.7, title: 'Checkpoint 4' },
  { latitude: 28.0, longitude: 85.8, title: 'End Point' }, // EBC
]

const { width } = Dimensions.get('window')

const ItineraryDetailScreen = ({ route, navigation }) => {
  const { itinerary } = route.params
  const [liked, setLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showMapDetails, setShowMapDetails] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [optimizedPath, setOptimizedPath] = useState([])

  const flatListRef = useRef(null)
  const scrollY = useRef(new Animated.Value(0)).current
  const heartScale = useRef(new Animated.Value(1)).current

  // Sample images for the itinerary
  const images = [
    itinerary.image,
    'https://placeholder.svg?height=200&width=300&text=Image2',
    'https://placeholder.svg?height=200&width=300&text=Image3',
    'https://placeholder.svg?height=200&width=300&text=Image4',
  ]

  useEffect(() => {
    // Calculate optimized path using A* algorithm
    const path = astar.findPathForCoordinates(trekRoute)
    setOptimizedPath(path)
  }, [])

  const handleImageChange = (event) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width)
    setCurrentImageIndex(slideIndex)
  }

  const handleLikePress = () => {
    setLiked(!liked)

    // Add animation effect when liking
    if (!liked) {
      Animated.sequence([
        Animated.spring(heartScale, {
          toValue: 1.3,
          friction: 2,
          useNativeDriver: true,
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing trek: ${itinerary.title} in ${itinerary.location}. It's a ${itinerary.duration} adventure for only $${itinerary.price}!`,
        title: `${itinerary.title} - TrekGuide`,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  // Animation values
  const bookingBarTranslateY = scrollY.interpolate({
    inputRange: [0, 300, 301],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Animated Header with Back Button */}
      <AnimatedHeader
        title={itinerary.title}
        scrollY={scrollY}
        navigation={navigation}
        rightComponent={
          <View className="flex-row">
            <TouchableOpacity
              className="p-2 bg-black bg-opacity-50 rounded-full mr-2"
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 bg-black bg-opacity-50 rounded-full"
              onPress={handleLikePress}
            >
              <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={22}
                  color={liked ? '#f43f5e' : 'white'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Image Carousel */}
      <Animated.View
        style={{
          height: 300,
          opacity: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
          zIndex: 5,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleImageChange}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, height: 300 }} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
          }}
        />

        {/* Pagination Dots */}
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
          {images.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
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
        {/* Content */}
        <View className="bg-white rounded-t-3xl -mt-10 pt-6 px-6">
          <AnimatedView animation="slideUp" delay={100}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-gray-800">
                {itinerary.title}
              </Text>
              <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-full">
                <Ionicons name="star" size={16} color="#f59e0b" />
                <Text className="ml-1 font-bold text-yellow-700">
                  {itinerary.rating}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="flex-row items-center mr-4 bg-gray-100 px-3 py-1 rounded-full">
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text className="ml-1 text-gray-600">{itinerary.location}</Text>
              </View>
              <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-full">
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text className="ml-1 text-gray-600">{itinerary.duration}</Text>
              </View>
            </View>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={200} className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Overview
            </Text>
            <Text className="text-gray-600 leading-6">
              Experience the adventure of a lifetime with our {itinerary.title}{' '}
              trek. This incredible journey takes you through breathtaking
              landscapes, challenging terrains, and offers unforgettable views
              of the world's highest peaks. The trek is designed for adventurers
              of all levels, with experienced guides to ensure your safety and
              comfort throughout the journey.
            </Text>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={300} className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-gray-800">
                Itinerary Map
              </Text>
              <TouchableOpacity
                className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center"
                onPress={() => setShowMapDetails(true)}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#2563eb"
                />
                <Text className="ml-1 text-blue-700 text-sm">Details</Text>
              </TouchableOpacity>
            </View>

            <View className="h-64 rounded-xl overflow-hidden shadow-md">
              <MapView
                className="w-full h-full"
                initialRegion={{
                  latitude: 27.85,
                  longitude: 85.5,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
              >
                {trekRoute.map((marker, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                  >
                    <View className="bg-primary p-2 rounded-full border-2 border-white">
                      <Text className="text-white font-bold">{index + 1}</Text>
                    </View>
                  </Marker>
                ))}
                <Polyline
                  coordinates={
                    optimizedPath.length > 0 ? optimizedPath : trekRoute
                  }
                  strokeColor="#2563eb"
                  strokeWidth={3}
                  lineDashPattern={[1, 0]}
                />
              </MapView>
            </View>
            <Text className="text-gray-500 text-sm mt-2 italic">
              Route calculated using A* pathfinding algorithm for optimal
              trekking path
            </Text>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={400} className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Highlights
            </Text>
            <View className="space-y-2">
              {[
                'Stunning mountain views',
                'Local cultural experiences',
                'Professional guides',
                'Comfortable accommodations',
                'All meals included',
              ].map((highlight, index) => (
                <AnimatedView
                  key={index}
                  animation="slideLeft"
                  delay={450 + index * 100}
                >
                  <View className="flex-row items-center bg-gray-50 p-3 rounded-lg">
                    <LinearGradient
                      colors={['#2563eb', '#3b82f6']}
                      className="w-2 h-8 rounded-full mr-3"
                    />
                    <Text className="text-gray-700">{highlight}</Text>
                  </View>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={500} className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              What's Included
            </Text>
            <View className="space-y-2">
              {[
                'Airport transfers',
                'Accommodation during trek',
                'Meals (breakfast, lunch, dinner)',
                'Experienced guides',
                'Permits and fees',
              ].map((item, index) => (
                <AnimatedView
                  key={index}
                  animation="slideRight"
                  delay={550 + index * 100}
                >
                  <View className="flex-row items-center bg-blue-50 p-3 rounded-lg">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#2563eb"
                    />
                    <Text className="ml-2 text-gray-700">{item}</Text>
                  </View>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={600} className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Daily Itinerary
            </Text>
            <View className="space-y-3">
              {[
                {
                  day: 1,
                  title: 'Arrival & Orientation',
                  description:
                    'Arrive at the starting point and meet your guides for orientation.',
                },
                {
                  day: 2,
                  title: 'Begin Trek',
                  description:
                    'Start your trek through beautiful valleys and forests.',
                },
                {
                  day: 3,
                  title: 'Mountain Pass',
                  description:
                    'Trek through a challenging mountain pass with stunning views.',
                },
                {
                  day: 4,
                  title: 'Local Village',
                  description:
                    'Visit a local village and experience the culture.',
                },
                {
                  day: 5,
                  title: 'Summit Day',
                  description:
                    'Reach the highest point of the trek with panoramic views.',
                },
                {
                  day: 6,
                  title: 'Descent',
                  description:
                    'Begin your descent back through different scenic routes.',
                },
                {
                  day: 7,
                  title: 'Return',
                  description:
                    'Return to the starting point and celebrate your achievement.',
                },
              ].map((day, index) => (
                <AnimatedView
                  key={index}
                  animation="fadeIn"
                  delay={650 + index * 100}
                >
                  <View className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <LinearGradient
                      colors={['#2563eb', '#3b82f6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="px-4 py-2"
                    >
                      <View className="flex-row items-center">
                        <View className="bg-white w-6 h-6 rounded-full items-center justify-center mr-2">
                          <Text className="text-primary font-bold text-xs">
                            {day.day}
                          </Text>
                        </View>
                        <Text className="text-white font-bold">
                          {day.title}
                        </Text>
                      </View>
                    </LinearGradient>
                    <View className="p-3">
                      <Text className="text-gray-600">{day.description}</Text>
                    </View>
                  </View>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={700} className="mb-20">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Reviews
            </Text>
            <View className="space-y-3">
              {[
                {
                  name: 'John D.',
                  rating: 5,
                  comment:
                    'Amazing experience! The guides were knowledgeable and the views were breathtaking.',
                },
                {
                  name: 'Sarah M.',
                  rating: 4,
                  comment:
                    'Great trek, well organized. Food could have been better but overall excellent.',
                },
                {
                  name: 'Michael T.',
                  rating: 5,
                  comment:
                    "One of the best treks I've ever done. Highly recommended!",
                },
              ].map((review, index) => (
                <AnimatedView
                  key={index}
                  animation="slideUp"
                  delay={750 + index * 100}
                >
                  <View className="bg-gray-50 p-4 rounded-lg">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-bold text-gray-800">
                        {review.name}
                      </Text>
                      <View className="flex-row">
                        {[...Array(5)].map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < review.rating ? 'star' : 'star-outline'}
                            size={16}
                            color="#f59e0b"
                          />
                        ))}
                      </View>
                    </View>
                    <Text className="text-gray-600">{review.comment}</Text>
                  </View>
                </AnimatedView>
              ))}
            </View>
          </AnimatedView>
        </View>
      </Animated.ScrollView>

      {/* Booking Bar */}
      <Animated.View
        className="p-4 bg-white border-t border-gray-200 flex-row items-center justify-between shadow-lg"
        style={{
          transform: [{ translateY: bookingBarTranslateY }],
        }}
      >
        <View>
          <Text className="text-gray-600">Price per person</Text>
          <Text className="text-2xl font-bold text-gray-800">
            ${itinerary.price}
          </Text>
        </View>

        <GradientButton
          title="Book Now"
          colors={['#2563eb', '#1d4ed8']}
          onPress={() => navigation.navigate('Booking', { itinerary })}
        />
      </Animated.View>

      {/* Map Details Bottom Sheet */}
      <BottomSheet
        isVisible={showMapDetails}
        onClose={() => setShowMapDetails(false)}
      >
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Trek Route Details
        </Text>
        <Text className="text-gray-600 mb-4">
          This trek follows an optimized path calculated using the A* algorithm,
          which finds the most efficient route between checkpoints while
          considering terrain difficulty and elevation changes.
        </Text>

        <View className="mb-4">
          <Text className="font-bold text-gray-800 mb-2">Checkpoints:</Text>
          {trekRoute.map((point, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <View className="w-6 h-6 bg-primary rounded-full items-center justify-center mr-2">
                <Text className="text-white font-bold">{index + 1}</Text>
              </View>
              <Text className="text-gray-700">{point.title}</Text>
            </View>
          ))}
        </View>

        <View className="mb-4">
          <Text className="font-bold text-gray-800 mb-2">
            Elevation Profile:
          </Text>
          <View className="h-20 bg-gray-100 rounded-lg p-2">
            {/* Simplified elevation graph */}
            <View className="flex-row items-end h-full">
              <View
                style={{ height: '30%' }}
                className="flex-1 bg-blue-200 rounded-sm mx-0.5"
              />
              <View
                style={{ height: '50%' }}
                className="flex-1 bg-blue-300 rounded-sm mx-0.5"
              />
              <View
                style={{ height: '80%' }}
                className="flex-1 bg-blue-400 rounded-sm mx-0.5"
              />
              <View
                style={{ height: '90%' }}
                className="flex-1 bg-blue-500 rounded-sm mx-0.5"
              />
              <View
                style={{ height: '70%' }}
                className="flex-1 bg-blue-400 rounded-sm mx-0.5"
              />
              <View
                style={{ height: '40%' }}
                className="flex-1 bg-blue-300 rounded-sm mx-0.5"
              />
            </View>
          </View>
        </View>

        <GradientButton
          title="Close"
          colors={['#6b7280', '#4b5563']}
          onPress={() => setShowMapDetails(false)}
        />
      </BottomSheet>
    </SafeAreaView>
  )
}

export default ItineraryDetailScreen
