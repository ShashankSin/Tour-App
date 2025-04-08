import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "../screens/user/HomeScreen"
import ExploreScreen from "../screens/user/ExploreScreen"
import WishlistScreen from "../screens/user/WishlistScreen"
import ProfileScreen from "../screens/user/ProfileScreen"

const Tab = createBottomTabNavigator()

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Wishlist") {
            iconName = focused ? "heart" : "heart-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default UserTabNavigator

