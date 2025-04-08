"use client"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { LineChart, BarChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const CompanyDashboardScreen = ({ navigation }) => {
  const { user } = useAuth()

  // Sample data for charts
  const bookingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Bookings"],
  }

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [12000, 19000, 15000, 25000, 30000, 18000],
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#10b981",
    },
  }

  // Sample stats
  const stats = [
    { title: "Total Bookings", value: "315", icon: "calendar", color: "#10b981" },
    { title: "Active Itineraries", value: "8", icon: "map", color: "#f97316" },
    { title: "Revenue", value: "$119K", icon: "cash", color: "#8b5cf6" },
    { title: "Customer Rating", value: "4.8", icon: "star", color: "#f59e0b" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-800">Dashboard</Text>
          <Text className="text-gray-600">{user?.name || "Company"} Overview</Text>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <View key={index} className="bg-white rounded-xl shadow-sm p-4 mb-4" style={{ width: "48%" }}>
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mb-2`}
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text className="text-gray-600">{stat.title}</Text>
                <Text className="text-2xl font-bold text-gray-800">{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bookings Chart */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Booking Trends</Text>
          <View className="bg-white rounded-xl p-4">
            <LineChart
              data={bookingsData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        {/* Revenue Chart */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Revenue</Text>
          <View className="bg-white rounded-xl p-4">
            <BarChart
              data={revenueData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={0}
              fromZero
            />
          </View>
        </View>

        {/* Recent Bookings */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Recent Bookings</Text>
            <TouchableOpacity>
              <Text className="text-primary">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-xl p-4">
            {[
              { id: 1, name: "John Doe", trek: "Everest Base Camp", date: "15 Jun 2023", amount: "$1,200" },
              { id: 2, name: "Sarah Smith", trek: "Annapurna Circuit", date: "10 Jun 2023", amount: "$1,000" },
              { id: 3, name: "Mike Johnson", trek: "Inca Trail", date: "05 Jun 2023", amount: "$800" },
            ].map((booking, index) => (
              <View key={booking.id} className={`py-3 ${index !== 2 ? "border-b border-gray-100" : ""}`}>
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="font-bold text-gray-800">{booking.name}</Text>
                    <Text className="text-gray-600">{booking.trek}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-primary">{booking.amount}</Text>
                    <Text className="text-gray-500">{booking.date}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CompanyDashboardScreen

