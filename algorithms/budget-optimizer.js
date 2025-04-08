/**
 * Greedy Budget Optimizer Algorithm
 * Used for optimizing trek budget planning
 *
 * This is a classic implementation of the Greedy Algorithm for the Knapsack Problem:
 * 1. Sort items by value/cost ratio (descending)
 * 2. Take items in order until budget is exhausted
 * 3. Special handling for required items
 */

// Helper function to calculate value/cost ratio
const calculateRatio = (item) => {
  return item.value / item.cost
}

// Helper function to sort items by value/cost ratio (descending)
const sortByValueCostRatio = (items) => {
  return [...items].sort((a, b) => calculateRatio(b) - calculateRatio(a))
}

// Helper function to format currency
const formatCurrency = (amount) => {
  return Number.parseFloat(amount).toFixed(2)
}

/**
 * Greedy Algorithm Implementation
 * Optimizes budget allocation by selecting items with the best value/cost ratio first
 */
const optimize = (items, budget) => {
  // Analysis data to track algorithm steps
  const analysis = {
    steps: [],
    requiredItems: [],
    optionalItems: [],
    selectedOptionalItems: [],
    rejectedItems: [],
    companyRecommendedBudget: 0,
    userBudget: budget,
    budgetDeficit: 0,
    valueMaximized: 0,
  }

  // Step 1: Separate required and optional items
  const requiredItems = items.filter((item) => item.required)
  const optionalItems = items.filter((item) => !item.required)

  analysis.requiredItems = requiredItems
  analysis.optionalItems = optionalItems
  analysis.steps.push({
    step: 1,
    description: 'Separating required and optional items',
    requiredCount: requiredItems.length,
    optionalCount: optionalItems.length,
  })

  // Step 2: Calculate cost of required items
  const requiredCost = requiredItems.reduce((sum, item) => sum + item.cost, 0)

  analysis.steps.push({
    step: 2,
    description: 'Calculating cost of required items',
    requiredCost: requiredCost,
  })

  // Calculate company recommended budget (required items + 30% buffer)
  analysis.companyRecommendedBudget = requiredCost * 1.3

  // Step 3: Check if budget can cover required items
  if (requiredCost > budget) {
    analysis.budgetDeficit = requiredCost - budget
    analysis.steps.push({
      step: 3,
      description: 'Budget insufficient for required items',
      budgetDeficit: analysis.budgetDeficit,
    })

    return {
      selectedItems: requiredItems,
      totalCost: requiredCost,
      remainingBudget: budget - requiredCost,
      savings: 0,
      error: 'Budget insufficient for required items',
      analysis: analysis,
    }
  }

  analysis.steps.push({
    step: 3,
    description: 'Budget sufficient for required items',
    remainingBudget: budget - requiredCost,
  })

  // Step 4: Calculate remaining budget for optional items
  const remainingBudget = budget - requiredCost

  analysis.steps.push({
    step: 4,
    description: 'Calculating remaining budget for optional items',
    remainingBudget: remainingBudget,
  })

  // Step 5: Sort optional items by value/cost ratio (greedy choice property)
  const sortedOptionalItems = sortByValueCostRatio(optionalItems)

  // Add ratio information to each item for analysis
  const sortedOptionalWithRatio = sortedOptionalItems.map((item) => ({
    ...item,
    ratio: calculateRatio(item).toFixed(4),
  }))

  analysis.steps.push({
    step: 5,
    description: 'Sorting optional items by value/cost ratio',
    sortedItems: sortedOptionalWithRatio,
  })

  // Step 6: Greedy selection - take items in order of best value/cost ratio
  let currentRemainingBudget = remainingBudget
  const selectedOptionalItems = []
  const rejectedItems = []
  let totalValueGained = 0

  analysis.steps.push({
    step: 6,
    description: 'Selecting optional items using greedy approach',
  })

  // Detailed selection steps
  const selectionSteps = []

  for (const item of sortedOptionalItems) {
    const ratio = calculateRatio(item)

    if (item.cost <= currentRemainingBudget) {
      selectedOptionalItems.push(item)
      currentRemainingBudget -= item.cost
      totalValueGained += item.value

      selectionSteps.push({
        item: item.name,
        cost: item.cost,
        value: item.value,
        ratio: ratio.toFixed(4),
        remainingBudget: currentRemainingBudget,
        selected: true,
        reason: 'Best value-to-cost ratio within remaining budget',
      })
    } else {
      rejectedItems.push(item)

      selectionSteps.push({
        item: item.name,
        cost: item.cost,
        value: item.value,
        ratio: ratio.toFixed(4),
        remainingBudget: currentRemainingBudget,
        selected: false,
        reason: 'Insufficient remaining budget',
      })
    }
  }

  analysis.selectionSteps = selectionSteps
  analysis.selectedOptionalItems = selectedOptionalItems
  analysis.rejectedItems = rejectedItems
  analysis.valueMaximized = totalValueGained

  // Step 7: Combine required and selected optional items
  const allSelectedItems = [...requiredItems, ...selectedOptionalItems]
  const totalCost = budget - currentRemainingBudget
  const savingsPercentage = ((currentRemainingBudget / budget) * 100).toFixed(1)

  analysis.steps.push({
    step: 7,
    description: 'Finalizing budget allocation',
    totalItems: allSelectedItems.length,
    totalCost: totalCost,
    remainingBudget: currentRemainingBudget,
    savingsPercentage: savingsPercentage,
  })

  return {
    selectedItems: allSelectedItems,
    totalCost: totalCost,
    remainingBudget: currentRemainingBudget,
    savings: savingsPercentage,
    analysis: analysis,
  }
}

/**
 * Advanced optimization with fractional knapsack approach
 * This is a variation of the greedy algorithm that allows taking fractions of items
 * (Not used in the current implementation but included for educational purposes)
 */
const optimizeWithFractionalKnapsack = (items, budget) => {
  // Sort items by value/cost ratio (descending)
  const sortedItems = sortByValueCostRatio(items)

  let remainingBudget = budget
  const selectedItems = []
  const fractionalItems = []

  // Greedy selection
  for (const item of sortedItems) {
    if (item.cost <= remainingBudget) {
      // Take the whole item
      selectedItems.push(item)
      remainingBudget -= item.cost
    } else if (remainingBudget > 0) {
      // Take a fraction of the item
      const fraction = remainingBudget / item.cost
      fractionalItems.push({
        ...item,
        fraction: fraction,
        partialCost: item.cost * fraction,
        partialValue: item.value * fraction,
      })
      remainingBudget = 0
    }
  }

  return {
    selectedItems,
    fractionalItems,
    totalCost: budget - remainingBudget,
    remainingBudget,
    savings: ((remainingBudget / budget) * 100).toFixed(1),
  }
}

// Simulate different budget scenarios using the greedy algorithm
const simulateScenarios = (items, baseBudget) => {
  const scenarios = []

  // Create scenarios with different budget levels
  const budgetLevels = [
    { name: 'Minimum', factor: 0.8 },
    { name: 'Standard', factor: 1.0 },
    { name: 'Comfortable', factor: 1.2 },
    { name: 'Luxury', factor: 1.5 },
  ]

  for (const level of budgetLevels) {
    const budget = baseBudget * level.factor
    const result = optimize(items, budget)

    scenarios.push({
      name: level.name,
      budget,
      ...result,
    })
  }

  return scenarios
}

/**
 * Dynamic Programming approach to the 0/1 Knapsack Problem
 * (Alternative to greedy algorithm - included for comparison)
 * This is the optimal solution but has higher time complexity: O(n*W)
 * where n is the number of items and W is the budget
 */
const optimizeWithDynamicProgramming = (items, budget) => {
  // Convert budget to integer (cents) to work with DP table
  const W = Math.floor(budget * 100)
  const n = items.length

  // Create DP table
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(W + 1).fill(0))

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const item = items[i - 1]
    const weight = Math.floor(item.cost * 100)

    for (let w = 0; w <= W; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + item.value)
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }

  // Backtrack to find selected items
  const selectedItems = []
  let w = W

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1])
      w -= Math.floor(items[i - 1].cost * 100)
    }
  }

  const totalCost = selectedItems.reduce((sum, item) => sum + item.cost, 0)
  const remainingBudget = budget - totalCost

  return {
    selectedItems,
    totalCost,
    remainingBudget,
    savings: ((remainingBudget / budget) * 100).toFixed(1),
  }
}

export default {
  optimize,
  optimizeWithRequirements: optimize, // Alias for backward compatibility
  simulateScenarios,
  // Advanced algorithms (not used in the current implementation)
  optimizeWithFractionalKnapsack,
  optimizeWithDynamicProgramming,
}
