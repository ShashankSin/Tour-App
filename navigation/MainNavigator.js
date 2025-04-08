"use client"
import { createStackNavigator } from "@react-navigation/stack"
import { useAuth } from "../contexts/AuthContext"

// User navigators
import UserTabNavigator from "./UserTabNavigator"
import ItineraryDetailScreen from "../screens/user/ItineraryDetailScreen"
import BookingScreen from "../screens/user/BookingScreen"
import PaymentScreen from "../screens/user/PaymentScreen"
import BudgetPlannerScreen from "../screens/user/BudgetPlannerScreen"

// Company navigators
import CompanyTabNavigator from "./CompanyTabNavigator"
import CreateItineraryScreen from "../screens/company/CreateItineraryScreen"
import EditItineraryScreen from "../screens/company/EditItineraryScreen"

// Admin navigators
import AdminTabNavigator from "./AdminTabNavigator"

const Stack = createStackNavigator()

const MainNavigator = () => {
  const { user } = useAuth()

  // Determine which navigator to show based on user type
  const renderNavigator = () => {
    switch (user?.type) {
      case "admin":
        return (
          <>
            <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />
          </>
        )
      case "company":
        return (
          <>
            <Stack.Screen name="CompanyTabs" component={CompanyTabNavigator} />
            <Stack.Screen name="CreateItinerary" component={CreateItineraryScreen} />
            <Stack.Screen name="EditItinerary" component={EditItineraryScreen} />
          </>
        )
      default: // 'user'
        return (
          <>
            <Stack.Screen name="UserTabs" component={UserTabNavigator} />
            <Stack.Screen name="ItineraryDetail" component={ItineraryDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
          </>
        )
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#f9fafb" },
      }}
    >
      {renderNavigator()}
    </Stack.Navigator>
  )
}

export default MainNavigator

