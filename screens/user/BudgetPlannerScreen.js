'use client'

import { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedView from '../../components/AnimatedView'
import budgetOptimizer from '../../algorithms/budget-optimizer'

// Default budget items (hidden from UI but used for calculations)
const defaultBudgetItems = [
  { id: '1', name: 'Trek Package', cost: 1200, value: 10, required: true },
  { id: '2', name: 'Flights', cost: 800, value: 9, required: true },
  { id: '3', name: 'Travel Insurance', cost: 100, value: 8, required: true },
  { id: '4', name: 'Trekking Gear', cost: 300, value: 7, required: false },
  { id: '5', name: 'Extra Meals', cost: 150, value: 6, required: false },
  { id: '6', name: 'Souvenirs', cost: 100, value: 5, required: false },
  { id: '7', name: 'Guide Tips', cost: 50, value: 7, required: false },
  {
    id: '8',
    name: 'Local Transportation',
    cost: 80,
    value: 6,
    required: false,
  },
  {
    id: '9',
    name: 'Accommodation Upgrade',
    cost: 200,
    value: 4,
    required: false,
  },
]

const BudgetPlannerScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [budget, setBudget] = useState('3000')
  const [optimizedBudget, setOptimizedBudget] = useState(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [scenarios, setScenarios] = useState([])
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState(null)

  useEffect(() => {
    // Calculate total required cost on mount
    const requiredCost = defaultBudgetItems
      .filter((item) => item.required)
      .reduce((sum, item) => sum + item.cost, 0)

    // Set minimum budget to cover required items
    if (Number(budget) < requiredCost) {
      setBudget(requiredCost.toString())
    }
  }, [])

  const handleOptimizeBudget = () => {
    if (!budget || Number.parseFloat(budget) <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount')
      return
    }

    setIsOptimizing(true)
    setShowAnalysis(false)
    setSelectedScenario(null)

    // Simulate processing time
    setTimeout(() => {
      const result = budgetOptimizer.optimize(
        defaultBudgetItems,
        Number.parseFloat(budget)
      )
      setOptimizedBudget(result)

      // Generate different budget scenarios
      const scenarioResults = budgetOptimizer.simulateScenarios(
        defaultBudgetItems,
        Number.parseFloat(budget)
      )
      setScenarios(scenarioResults)

      setIsOptimizing(false)
    }, 1000)
  }

  const handleSaveBudget = () => {
    Alert.alert(
      'Budget Saved',
      'Your budget plan has been saved successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    )
  }

  const totalRequiredCost = defaultBudgetItems
    .filter((item) => item.required)
    .reduce((sum, item) => sum + item.cost, 0)

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-4">
          Budget Planner
        </Text>
        <TouchableOpacity
          className="ml-auto bg-emerald-600 p-2 rounded-full"
          onPress={handleSaveBudget}
        >
          <Ionicons name="save" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Budget Input */}
        <AnimatedView animation="fadeIn" delay={100} className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Your Budget
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
            <Ionicons name="cash-outline" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-800 text-lg"
              placeholder="Enter your budget"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />
          </View>
          <Text className="text-gray-500 mt-1">
            Minimum required: ${totalRequiredCost}
          </Text>
        </AnimatedView>

        {/* Optimize Budget Button */}
        <TouchableOpacity
          className="bg-emerald-600 py-3 rounded-lg items-center mb-6"
          onPress={handleOptimizeBudget}
        >
          <Text className="text-white font-bold text-lg">
            Optimize My Budget
          </Text>
        </TouchableOpacity>

        {/* Optimization Results */}
        {isOptimizing ? (
          <View className="items-center py-4">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-gray-600 mt-2">
              Optimizing your budget...
            </Text>
          </View>
        ) : (
          optimizedBudget && (
            <AnimatedView
              animation="fadeIn"
              delay={100}
              className="bg-gray-50 p-4 rounded-lg mb-6"
            >
              <Text className="text-lg font-bold text-gray-800 mb-2">
                Optimized Budget Plan
              </Text>

              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Total Budget:</Text>
                <Text className="text-gray-800 font-medium">${budget}</Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Allocated:</Text>
                <Text className="text-gray-800 font-medium">
                  ${optimizedBudget.totalCost.toFixed(2)}
                </Text>
              </View>

              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-600">Remaining:</Text>
                <Text className="text-emerald-600 font-medium">
                  ${optimizedBudget.remainingBudget.toFixed(2)} (
                  {optimizedBudget.savings}%)
                </Text>
              </View>

              {/* Budget Allocation Visualization */}
              <View className="mb-4">
                <Text className="text-gray-800 font-medium mb-2">
                  Budget Allocation:
                </Text>
                <View className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  {/* Required Items */}
                  <View
                    className="absolute h-full bg-blue-500"
                    style={{
                      width: `${(totalRequiredCost / Number(budget)) * 100}%`,
                    }}
                  />
                  {/* Optional Items */}
                  <View
                    className="absolute h-full bg-emerald-500"
                    style={{
                      width: `${
                        ((optimizedBudget.totalCost - totalRequiredCost) /
                          Number(budget)) *
                        100
                      }%`,
                      left: `${(totalRequiredCost / Number(budget)) * 100}%`,
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-1">
                  <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                    <Text className="text-xs text-gray-600">
                      Required (${totalRequiredCost})
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-emerald-500 mr-1" />
                    <Text className="text-xs text-gray-600">
                      Optional ($
                      {(optimizedBudget.totalCost - totalRequiredCost).toFixed(
                        2
                      )}
                      )
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-gray-300 mr-1" />
                    <Text className="text-xs text-gray-600">
                      Remaining (${optimizedBudget.remainingBudget.toFixed(2)})
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-4 p-3 bg-emerald-100 rounded-lg">
                <Text className="text-emerald-800">
                  This budget plan was optimized using a Greedy Algorithm to
                  maximize value while staying within your budget. The algorithm
                  selects items with the highest value-to-cost ratio first,
                  ensuring you get the most value for your money.
                </Text>
              </View>
            </AnimatedView>
          )
        )}

        {/* Budget Scenarios */}
        {scenarios.length > 0 && (
          <AnimatedView animation="slideUp" delay={200} className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Budget Scenarios
            </Text>

            {scenarios.map((scenario, index) => (
              <AnimatedView
                key={index}
                animation="fadeIn"
                delay={250 + index * 50}
                className="mb-3"
              >
                <TouchableOpacity
                  onPress={() =>
                    setSelectedScenario(
                      selectedScenario === index ? null : index
                    )
                  }
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={
                      index === 0
                        ? ['#f97316', '#fb923c']
                        : index === 1
                        ? ['#2563eb', '#3b82f6']
                        : index === 2
                        ? ['#8b5cf6', '#a78bfa']
                        : ['#10b981', '#34d399']
                    }
                    className="p-3 rounded-t-lg"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-white font-bold">
                        {scenario.name} Budget (${scenario.budget.toFixed(0)})
                      </Text>
                      <Ionicons
                        name={
                          selectedScenario === index
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={20}
                        color="white"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <View className="bg-white border-x border-b border-gray-200 p-3 rounded-b-lg">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600">Items:</Text>
                    <Text className="text-gray-800">
                      {scenario.selectedItems.length}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600">Spending:</Text>
                    <Text className="text-gray-800">
                      ${scenario.totalCost.toFixed(0)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Savings:</Text>
                    <Text className="text-emerald-600">
                      ${scenario.remainingBudget.toFixed(0)}
                    </Text>
                  </View>

                  {/* Expanded Itinerary Details */}
                  {selectedScenario === index && (
                    <View className="mt-2 pt-2 border-t border-gray-200">
                      <Text className="font-bold text-gray-800 mb-2">
                        Itinerary Details:
                      </Text>
                      {scenario.selectedItems.map((item) => (
                        <View
                          key={item.id}
                          className="flex-row justify-between py-2 border-b border-gray-100"
                        >
                          <View className="flex-row items-center">
                            <View
                              className={`w-2 h-2 rounded-full mr-2 ${
                                item.required ? 'bg-blue-500' : 'bg-emerald-500'
                              }`}
                            />
                            <Text className="text-gray-700">{item.name}</Text>
                          </View>
                          <Text className="font-medium text-gray-800">
                            ${item.cost}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </AnimatedView>
            ))}
          </AnimatedView>
        )}
      </ScrollView>
    </View>
  )
}

export default BudgetPlannerScreen
