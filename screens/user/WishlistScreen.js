'use client'

import { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedView from '../../components/AnimatedView'
import Card from '../../components/Card'
import GradientButton from '../../components/GradientButton'
import AnimatedImage from '../../components/AnimatedImage'

// Sample data for wishlist
const initialWishlistItems = [
  {
    id: '1',
    title: 'Everest Base Camp Trek',
    location: 'Nepal',
    duration: '14 days',
    price: 1200,
    rating: 4.8,
    image: 'https://placeholder.svg?height=200&width=300&text=Everest',
  },
  {
    id: '3',
    title: 'Inca Trail to Machu Picchu',
    location: 'Peru',
    duration: '4 days',
    price: 800,
    rating: 4.9,
    image: 'https://placeholder.svg?height=200&width=300&text=Inca+Trail',
  },
  {
    id: '5',
    title: 'Torres del Paine Circuit',
    location: 'Chile',
    duration: '8 days',
    price: 1100,
    rating: 4.5,
    image: 'https://placeholder.svg?height=200&width=300&text=Torres',
  },
]

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState(initialWishlistItems)
  const [refreshing, setRefreshing] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  // Animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  })

  const removeFromWishlist = (id) => {
    // Create a reference to the item being removed for animation
    const itemToRemove = wishlist.find((item) => item.id === id)

    // Animate the removal
    if (itemToRemove) {
      Animated.timing(itemToRemove.scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // After animation completes, remove the item from state
        setWishlist(wishlist.filter((item) => item.id !== id))
      })
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const renderWishlistItem = ({ item, index }) => (
    <AnimatedView animation="slideUp" delay={100 * index}>
      <Card animation="none" style={{ marginBottom: 16 }}>
        <View className="flex-row overflow-hidden">
          <AnimatedImage
            source={{ uri: item.image }}
            className="w-32 h-full"
            animationType="fadeIn"
          />

          <View className="flex-1 p-3">
            <View className="flex-row justify-between items-start">
              <View className="flex-1 mr-2">
                <Text className="text-lg font-bold text-gray-800">
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {item.location}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-full">
                <Ionicons name="star" size={14} color="#f59e0b" />
                <Text className="ml-1 text-yellow-700 font-medium text-xs">
                  {item.rating}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-2">
              <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text className="ml-1 text-gray-600 text-xs">
                  {item.duration}
                </Text>
              </View>
              <Text className="ml-auto font-bold text-primary">
                ${item.price}
              </Text>
            </View>

            <View className="flex-row mt-3 pt-3 border-t border-gray-100">
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() =>
                  navigation.navigate('ItineraryDetail', { itinerary: item })
                }
              >
                <LinearGradient
                  colors={['#2563eb', '#3b82f6']}
                  className="py-2 rounded-lg items-center"
                >
                  <Text className="text-white font-medium">View</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1"
                onPress={() => removeFromWishlist(item.id)}
              >
                <LinearGradient
                  colors={['#ef4444', '#f87171']}
                  className="py-2 rounded-lg items-center"
                >
                  <Text className="text-white font-medium">Remove</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </AnimatedView>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Animated Header */}
      <Animated.View
        style={{
          height: headerHeight,
          opacity: headerOpacity,
          zIndex: 10,
        }}
      >
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-6 flex-1 justify-end"
        >
          <AnimatedView animation="fadeIn" delay={50}>
            <Text className="text-2xl font-bold text-white">My Wishlist</Text>
            <Text className="text-white text-opacity-80">
              {wishlist.length} {wishlist.length === 1 ? 'trek' : 'treks'} saved
            </Text>
          </AnimatedView>
        </LinearGradient>
      </Animated.View>

      {wishlist.length > 0 ? (
        <Animated.FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <AnimatedView animation="bounceIn" delay={100}>
            <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
              <Ionicons name="heart" size={48} color="#d1d5db" />
            </View>
          </AnimatedView>

          <AnimatedView animation="fadeIn" delay={200}>
            <Text className="text-xl font-bold text-gray-800 text-center mb-2">
              Your wishlist is empty
            </Text>
            <Text className="text-gray-500 text-center mb-8">
              Save your favorite treks here to plan your next adventure
            </Text>
          </AnimatedView>

          <AnimatedView animation="slideUp" delay={300}>
            <GradientButton
              title="Explore Treks"
              colors={['#2563eb', '#3b82f6']}
              onPress={() => navigation.navigate('Explore')}
            />
          </AnimatedView>
        </View>
      )}

      {/* Floating Action Button */}
      {wishlist.length > 0 && (
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => navigation.navigate('Explore')}
          style={{
            elevation: 5,
            shadowColor: '#2563eb',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default WishlistScreen
