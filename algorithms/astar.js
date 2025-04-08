/**
 * A* Pathfinding Algorithm Implementation
 * Used for calculating optimal trekking routes
 */

// Manhattan distance heuristic
const heuristic = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

// Find neighbors
const neighbors = (grid, node) => {
  const ret = []
  const x = node.x
  const y = node.y

  // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y])
  }

  // East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y])
  }

  // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1])
  }

  // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1])
  }

  return ret
}

// Search for path
const search = (grid, start, end) => {
  const openSet = [start]
  const closedSet = []

  while (openSet.length > 0) {
    // Find node with lowest f score
    let lowestIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i
      }
    }

    const current = openSet[lowestIndex]

    // If we found the end
    if (current === end) {
      const path = []
      let temp = current
      path.push(temp)
      while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
      }
      return path.reverse()
    }

    // Remove current from openSet and add to closedSet
    openSet.splice(lowestIndex, 1)
    closedSet.push(current)

    // Check neighbors
    const neighborNodes = neighbors(grid, current)
    for (let i = 0; i < neighborNodes.length; i++) {
      const neighbor = neighborNodes[i]

      // Skip if already evaluated
      if (closedSet.includes(neighbor)) {
        continue
      }

      // Calculate g score
      const tentativeG = current.g + 1

      // If not in openSet, add it
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor)
      } else if (tentativeG >= neighbor.g) {
        // Not a better path
        continue
      }

      // Best path so far
      neighbor.previous = current
      neighbor.g = tentativeG
      neighbor.h = heuristic(neighbor, end)
      neighbor.f = neighbor.g + neighbor.h
    }
  }

  // No path found
  return []
}

// For geographic coordinates
const findPathForCoordinates = (points) => {
  // Convert geographic coordinates to grid coordinates
  // This is a simplified version - in a real app, you'd use proper projection
  const grid = []
  const path = []

  // Create a simple path between points
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i]
    const end = points[i + 1]

    // Calculate intermediate points (simplified linear interpolation)
    const steps = 5 // Number of points between each coordinate pair
    for (let j = 0; j <= steps; j++) {
      const ratio = j / steps
      const lat = start.latitude + ratio * (end.latitude - start.latitude)
      const lng = start.longitude + ratio * (end.longitude - start.longitude)
      path.push({ latitude: lat, longitude: lng })
    }
  }

  return path
}

export default {
  heuristic,
  neighbors,
  search,
  findPathForCoordinates,
}
