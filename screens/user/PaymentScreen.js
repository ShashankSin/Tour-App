"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

const PaymentScreen = ({ route, navigation }) => {
  const { itinerary, startDate, endDate, participants, totalPrice } = route.params
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handlePayment = () => {
    // In a real app, you would process the payment here
    // For this example, we'll just show a success message
    alert("Booking confirmed! Thank you for your purchase.")
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="p-4 border-b border-gray-200 flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-bold text-gray-800">Payment</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Booking Summary */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Booking Summary</Text>
          <View className="bg-white p-4 rounded-lg border border-gray-200">
            <Text className="font-bold text-gray-800 mb-2">{itinerary.title}</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Dates</Text>
              <Text className="font-medium text-gray-800">
                {formatDate(startDate)} - {formatDate(endDate)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Participants</Text>
              <Text className="font-medium text-gray-800">{participants}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Total Price</Text>
              <Text className="font-bold text-primary">${totalPrice}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Payment Method</Text>
          <View className="space-y-3">
            <TouchableOpacity
              className={`flex-row items-center p-4 rounded-lg border ${
                paymentMethod === "card" ? "border-primary bg-primary bg-opacity-10" : "border-gray-200 bg-white"
              }`}
              onPress={() => setPaymentMethod("card")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  paymentMethod === "card" ? "border-primary" : "border-gray-400"
                }`}
              >
                {paymentMethod === "card" && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <Ionicons name="card-outline" size={24} color={paymentMethod === "card" ? "#10b981" : "#666"} />
              <Text className={`ml-2 font-medium ${paymentMethod === "card" ? "text-primary" : "text-gray-800"}`}>
                Credit/Debit Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center p-4 rounded-lg border ${
                paymentMethod === "paypal" ? "border-primary bg-primary bg-opacity-10" : "border-gray-200 bg-white"
              }`}
              onPress={() => setPaymentMethod("paypal")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  paymentMethod === "paypal" ? "border-primary" : "border-gray-400"
                }`}
              >
                {paymentMethod === "paypal" && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <Ionicons name="logo-paypal" size={24} color={paymentMethod === "paypal" ? "#10b981" : "#666"} />
              <Text className={`ml-2 font-medium ${paymentMethod === "paypal" ? "text-primary" : "text-gray-800"}`}>
                PayPal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center p-4 rounded-lg border ${
                paymentMethod === "apple" ? "border-primary bg-primary bg-opacity-10" : "border-gray-200 bg-white"
              }`}
              onPress={() => setPaymentMethod("apple")}
            >
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  paymentMethod === "apple" ? "border-primary" : "border-gray-400"
                }`}
              >
                {paymentMethod === "apple" && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <Ionicons name="logo-apple" size={24} color={paymentMethod === "apple" ? "#10b981" : "#666"} />
              <Text className={`ml-2 font-medium ${paymentMethod === "apple" ? "text-primary" : "text-gray-800"}`}>
                Apple Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Details (only show if card payment method is selected) */}
        {paymentMethod === "card" && (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Card Details</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Card Number</Text>
                <TextInput
                  className="bg-white p-4 rounded-lg border border-gray-300"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>

              <View>
                <Text className="text-gray-700 mb-2 font-medium">Cardholder Name</Text>
                <TextInput
                  className="bg-white p-4 rounded-lg border border-gray-300"
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 mb-2 font-medium">Expiry Date</Text>
                  <TextInput
                    className="bg-white p-4 rounded-lg border border-gray-300"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    maxLength={5}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-gray-700 mb-2 font-medium">CVV</Text>
                  <TextInput
                    className="bg-white p-4 rounded-lg border border-gray-300"
                    placeholder="123"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Billing Address */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Billing Address</Text>
          <TouchableOpacity className="bg-white p-4 rounded-lg border border-gray-200 flex-row justify-between items-center">
            <Text className="text-gray-800">Add Billing Address</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="p-4 bg-white border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600">Total</Text>
          <Text className="text-xl font-bold text-primary">${totalPrice}</Text>
        </View>
        <TouchableOpacity className="bg-primary p-4 rounded-lg items-center" onPress={handlePayment}>
          <Text className="text-white font-bold text-lg">Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PaymentScreen

