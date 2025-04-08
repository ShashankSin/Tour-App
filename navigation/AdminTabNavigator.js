import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen"
import AdminCompaniesScreen from "../screens/admin/AdminCompaniesScreen"
import AdminUsersScreen from "../screens/admin/AdminUsersScreen"
import AdminItinerariesScreen from "../screens/admin/AdminItinerariesScreen"

const Tab = createBottomTabNavigator()

const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = focused ? "analytics" : "analytics-outline"
          } else if (route.name === "Companies") {
            iconName = focused ? "business" : "business-outline"
          } else if (route.name === "Users") {
            iconName = focused ? "people" : "people-outline"
          } else if (route.name === "Itineraries") {
            iconName = focused ? "map" : "map-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Companies" component={AdminCompaniesScreen} />
      <Tab.Screen name="Users" component={AdminUsersScreen} />
      <Tab.Screen name="Itineraries" component={AdminItinerariesScreen} />
    </Tab.Navigator>
  )
}

export default AdminTabNavigator

