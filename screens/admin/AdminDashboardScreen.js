'use client'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../contexts/AuthContext'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const AdminDashboardScreen = () => {
  const { user, signOut } = useAuth()

  // Sample data for charts
  const bookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [50, 75, 60, 120, 180, 90],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Bookings'],
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [25000, 35000, 28000, 45000, 60000, 38000],
      },
    ],
  }

  const pieChartData = [
    {
      name: 'Nepal',
      population: 45,
      color: '#10b981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Peru',
      population: 20,
      color: '#f97316',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Tanzania',
      population: 15,
      color: '#8b5cf6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Others',
      population: 20,
      color: '#64748b',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ]

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#10b981',
    },
  }

  // Sample stats
  const stats = [
    { title: 'Total Users', value: '1,245', icon: 'people', color: '#10b981' },
    { title: 'Companies', value: '32', icon: 'business', color: '#f97316' },
    { title: 'Total Revenue', value: '$231K', icon: 'cash', color: '#8b5cf6' },
    { title: 'Bookings', value: '578', icon: 'calendar', color: '#f59e0b' },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="p-6 flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </Text>
            <Text className="text-gray-600">
              Welcome, {user?.name || 'Admin'}
            </Text>
          </View>
          <TouchableOpacity
            className="p-2 bg-gray-200 rounded-full"
            onPress={signOut}
          >
            <Ionicons name="log-out-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 mb-4"
                style={{ width: '48%' }}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mb-2`}
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text className="text-gray-600">{stat.title}</Text>
                <Text className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Chart */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Revenue Overview
          </Text>
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

        {/* Bookings Chart */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Booking Trends
          </Text>
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

        {/* Destination Distribution */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Popular Destinations
          </Text>
          <View className="bg-white rounded-xl p-4">
            <PieChart
              data={pieChartData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary bg-opacity-20 items-center justify-center mr-4">
                <Ionicons name="people" size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">Manage Users</Text>
                <Text className="text-gray-600">
                  View and manage user accounts
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-secondary bg-opacity-20 items-center justify-center mr-4">
                <Ionicons name="business" size={20} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">
                  Manage Companies
                </Text>
                <Text className="text-gray-600">
                  View and manage company accounts
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-purple-500 bg-opacity-20 items-center justify-center mr-4">
                <Ionicons name="map" size={20} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">
                  Manage Itineraries
                </Text>
                <Text className="text-gray-600">
                  Review and approve itineraries
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-4 rounded-xl flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-amber-500 bg-opacity-20 items-center justify-center mr-4">
                <Ionicons name="settings" size={20} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">System Settings</Text>
                <Text className="text-gray-600">
                  Configure application settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminDashboardScreen
