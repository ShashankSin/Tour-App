import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import CompanyDashboardScreen from "../screens/company/CompanyDashboardScreen"
import CompanyItinerariesScreen from "../screens/company/CompanyItinerariesScreen"
import CompanyBookingsScreen from "../screens/company/CompanyBookingsScreen"
import CompanyProfileScreen from "../screens/company/CompanyProfileScreen"

const Tab = createBottomTabNavigator()

const CompanyTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline"
          } else if (route.name === "Itineraries") {
            iconName = focused ? "map" : "map-outline"
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "business" : "business-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={CompanyDashboardScreen} />
      <Tab.Screen name="Itineraries" component={CompanyItinerariesScreen} />
      <Tab.Screen name="Bookings" component={CompanyBookingsScreen} />
      <Tab.Screen name="Profile" component={CompanyProfileScreen} />
    </Tab.Navigator>
  )
}

export default CompanyTabNavigator

