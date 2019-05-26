import Coordinate from "./Coordinate";

class GraphNode {
  x: number;
  y: number;
  value: number;
  distanceToNode: number;
  previousNode: GraphNode | null;
  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.distanceToNode = Number.MAX_SAFE_INTEGER;
    this.previousNode = null;
  }
}

function getOptimalPath(gameState: Array<Array<number>>) {
  // Initialization
  let nodes: Array<Array<GraphNode>> = [];
  let unvisitedNodes: Array<GraphNode> = [];
  for (let row = 0; row < gameState.length; row++) {
    nodes[row] = [];
    for (let column = 0; column < gameState.length; column++) {
      const value: number = gameState[row][column];
      let node: GraphNode = new GraphNode(column, row, value);
      nodes[row].push(node);
      unvisitedNodes.push(node);
    }
  }

  // Grab the first node, which is the start node.
  let currentNode: GraphNode = unvisitedNodes.shift()!;
  currentNode.distanceToNode = 0;

  // Continue going through nodes until the exit node is reached.
  while (
    !(
      currentNode.x === gameState.length - 1 &&
      currentNode.y === gameState.length - 1
    )
  ) {
    // Go through all of the current node's unvisited edges and update their distances.
    for (let newNode of getAdjacentNodes(currentNode, nodes)) {
      if (unvisitedNodes.includes(newNode)) {
        const currentDistance = newNode.distanceToNode;
        const newDistance = currentNode.distanceToNode + newNode.value;
        if (newDistance < currentDistance) {
          newNode.distanceToNode = newDistance;
          newNode.previousNode = currentNode;
        }
      }
    }

    // Get the next node, which is the one with the minimum distance to it.
    unvisitedNodes.sort(function(a, b) {
      return a.distanceToNode - b.distanceToNode;
    });
    currentNode = unvisitedNodes.shift()!;
  }

  // Trace the path back from the last node.
  let shortestPath: Array<Coordinate> = [];
  let pathTotal = 0;
  while (true) {
    shortestPath.push(new Coordinate(currentNode.x + 1, currentNode.y + 1));
    pathTotal += currentNode.value;
    if (currentNode.previousNode != null) {
      currentNode = currentNode.previousNode;
    } else {
      break;
    }
  }

  return [shortestPath, pathTotal];
}

function getAdjacentNodes(node: GraphNode, allNodes: Array<Array<GraphNode>>) {
  let adjacentNodes: Array<GraphNode> = [];
  const x = node.x.valueOf();
  const y = node.y.valueOf();

  // Add adjacent nodes if not on the left, top, right, or bottom edge.
  if (node.y > 0) adjacentNodes.push(allNodes[y - 1][x]);
  if (node.x > 0) adjacentNodes.push(allNodes[y][x - 1]);
  if (node.y < allNodes.length - 1) adjacentNodes.push(allNodes[y + 1][x]);
  if (node.x < allNodes.length - 1) adjacentNodes.push(allNodes[y][x + 1]);
  return adjacentNodes;
}

export default getOptimalPath;
