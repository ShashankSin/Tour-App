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
import * as ImagePicker from 'expo-image-picker'

const EditItineraryScreen = ({ route, navigation }) => {
  const { itinerary } = route.params

  const [title, setTitle] = useState(itinerary.title)
  const [location, setLocation] = useState(itinerary.location)
  const [duration, setDuration] = useState(itinerary.duration)
  const [price, setPrice] = useState(itinerary.price.toString())
  const [description, setDescription] = useState(
    'Experience the adventure of a lifetime with our trek. This incredible journey takes you through breathtaking landscapes, challenging terrains, and offers unforgettable views.'
  )
  const [images, setImages] = useState([itinerary.image])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri])
    }
  }

  const handleSave = () => {
    // In a real app, you would update the itinerary in a database
    alert('Itinerary updated successfully!')
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Edit Itinerary</Text>
        <TouchableOpacity className="p-2" onPress={handleSave}>
          <Ionicons name="checkmark" size={24} color="#10b981" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Images */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Images</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-2"
          >
            {images.map((uri, index) => (
              <View key={index} className="relative mr-2">
                <Image source={{ uri }} className="w-32 h-24 rounded-lg" />
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  onPress={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              className="w-32 h-24 bg-gray-200 rounded-lg items-center justify-center"
              onPress={pickImage}
            >
              <Ionicons name="add" size={32} color="#666" />
            </TouchableOpacity>
          </ScrollView>
          <Text className="text-gray-500 text-xs">Add up to 5 images</Text>
        </View>

        {/* Basic Info */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Basic Information
          </Text>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Title</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="e.g. Everest Base Camp Trek"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Location</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="e.g. Nepal"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 mb-2 font-medium">Duration</Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-gray-300"
                placeholder="e.g. 14 days"
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View className="flex-1 ml-2">
              <Text className="text-gray-700 mb-2 font-medium">
                Price (USD)
              </Text>
              <TextInput
                className="bg-white p-4 rounded-lg border border-gray-300"
                placeholder="e.g. 1200"
                value={price}
                onChangeText={setPrice}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Description</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-300"
              placeholder="Describe your trek..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Itinerary Details */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Itinerary Details
          </Text>

          {[1, 2, 3].map((day) => (
            <View
              key={day}
              className="bg-white p-4 rounded-lg border border-gray-300 mb-3"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-gray-800">Day {day}</Text>
                <TouchableOpacity>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                placeholder={`Describe day ${day} activities...`}
                defaultValue={
                  day === 1
                    ? 'Arrival and orientation'
                    : day === 2
                    ? 'Begin trek to first checkpoint'
                    : 'Continue trek with stunning views'
                }
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          ))}

          <TouchableOpacity className="flex-row items-center justify-center p-3 bg-gray-200 rounded-lg">
            <Ionicons name="add" size={20} color="#666" />
            <Text className="ml-2 text-gray-700">Add Day</Text>
          </TouchableOpacity>
        </View>

        {/* Inclusions */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            What's Included
          </Text>

          {['Accommodation', 'Meals', 'Guide', 'Permits'].map((item, index) => (
            <View
              key={index}
              className="flex-row items-center bg-white p-4 rounded-lg border border-gray-300 mb-3"
            >
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <TextInput
                className="flex-1 ml-2"
                placeholder="e.g. Accommodation"
                defaultValue={item}
              />
              <TouchableOpacity>
                <Ionicons name="close-circle" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity className="flex-row items-center justify-center p-3 bg-gray-200 rounded-lg">
            <Ionicons name="add" size={20} color="#666" />
            <Text className="ml-2 text-gray-700">Add Item</Text>
          </TouchableOpacity>
        </View>

        {/* Map Location */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Map Location
          </Text>
          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-300 items-center justify-center h-40">
            <Ionicons name="map-outline" size={48} color="#666" />
            <Text className="mt-2 text-gray-600">Edit Location on Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className="bg-primary p-4 rounded-lg items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-lg">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EditItineraryScreen
