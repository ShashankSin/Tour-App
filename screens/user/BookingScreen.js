"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { Calendar } from "react-native-calendars"

const BookingScreen = ({ route, navigation }) => {
  const { itinerary } = route.params
  const [selectedStartDate, setSelectedStartDate] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState("")
  const [participants, setParticipants] = useState(1)

  // Calculate end date based on duration
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return ""

    const durationDays = Number.parseInt(duration)
    const date = new Date(startDate)
    date.setDate(date.getDate() + durationDays)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedStartDate(day.dateString)

    // Extract number from duration string (e.g., "14 days" -> 14)
    const durationMatch = itinerary.duration.match(/\d+/)
    const durationDays = durationMatch ? Number.parseInt(durationMatch[0]) : 0

    const endDate = calculateEndDate(day.dateString, durationDays)
    setSelectedEndDate(endDate)
  }

  // Generate marked dates for calendar
  const getMarkedDates = () => {
    const markedDates = {}

    if (selectedStartDate) {
      markedDates[selectedStartDate] = {
        selected: true,
        startingDay: true,
        color: "#10b981",
        textColor: "white",
      }

      if (selectedEndDate) {
        // Mark end date
        markedDates[selectedEndDate] = {
          selected: true,
          endingDay: true,
          color: "#10b981",
          textColor: "white",
        }

        // Mark dates in between
        const start = new Date(selectedStartDate)
        const end = new Date(selectedEndDate)

        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().split("T")[0]

          if (dateString !== selectedStartDate) {
            markedDates[dateString] = {
              selected: true,
              color: "#10b981",
              textColor: "white",
            }
          }
        }
      }
    }

    return markedDates
  }

  // Handle participant count
  const decreaseParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1)
    }
  }

  const increaseParticipants = () => {
    setParticipants(participants + 1)
  }

  // Calculate total price
  const totalPrice = itinerary.price * participants

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedStartDate) {
      alert("Please select a start date")
      return
    }

    navigation.navigate("Payment", {
      itinerary,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      participants,
      totalPrice,
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="p-4 border-b border-gray-200 flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-bold text-gray-800">Book Your Trek</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Trek Info */}
        <View className="flex-row mb-6">
          <Image source={{ uri: itinerary.image }} className="w-24 h-24 rounded-lg" />
          <View className="ml-4 flex-1 justify-center">
            <Text className="text-lg font-bold text-gray-800">{itinerary.title}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text className="ml-1 text-gray-600">{itinerary.location}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text className="ml-1 text-gray-600">{itinerary.duration}</Text>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Select Start Date</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={getMarkedDates()}
            minDate={new Date().toISOString().split("T")[0]}
            theme={{
              selectedDayBackgroundColor: "#10b981",
              todayTextColor: "#10b981",
              arrowColor: "#10b981",
            }}
          />

          {selectedStartDate && (
            <View className="mt-4 p-4 bg-gray-100 rounded-lg">
              <Text className="text-gray-800">
                <Text className="font-bold">Trek Period:</Text> {selectedStartDate} to {selectedEndDate}
              </Text>
            </View>
          )}
        </View>

        {/* Participants */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Number of Participants</Text>
          <View className="flex-row items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <Text className="text-gray-800">Participants</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                onPress={decreaseParticipants}
              >
                <Ionicons name="remove" size={20} color="#333" />
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-bold text-gray-800">{participants}</Text>
              <TouchableOpacity
                className="w-8 h-8 bg-primary rounded-full items-center justify-center"
                onPress={increaseParticipants}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Price Summary */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Price Summary</Text>
          <View className="bg-white p-4 rounded-lg border border-gray-200">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Trek Price (per person)</Text>
              <Text className="font-medium text-gray-800">${itinerary.price}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Participants</Text>
              <Text className="font-medium text-gray-800">x {participants}</Text>
            </View>
            <View className="border-t border-gray-200 my-2" />
            <View className="flex-row justify-between">
              <Text className="font-bold text-gray-800">Total</Text>
              <Text className="font-bold text-primary">${totalPrice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-primary p-4 rounded-lg items-center" onPress={handleProceedToPayment}>
          <Text className="text-white font-bold text-lg">Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BookingScreen

