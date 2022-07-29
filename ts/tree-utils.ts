export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

export const arrayToTree = (array: (number|null)[]): TreeNode | null => {
      if (array.length === 0) {
        return null;
      }

      const remainingValues = [...array];
      const nodeQueue: TreeNode[] = []

      const rootValue = remainingValues.shift()!;
      const tree = new TreeNode(rootValue)
      nodeQueue.push(tree)

      while (remainingValues.length > 0) {
        const node = nodeQueue.shift()!;

        const leftValue = remainingValues.shift()
        if (leftValue !== null && leftValue !== undefined) {
          node.left = new TreeNode(leftValue)
          nodeQueue.push(node.left)
        }

        const rightValue = remainingValues.shift()
        if (rightValue !== null && rightValue !== undefined) {
          node.right = new TreeNode(rightValue)
          nodeQueue.push(node.right)
        }
      }

      return tree;
}

export const wrapTree = <T>(func: (root: TreeNode | null) => T) => {
    return (nodeArray: (number|null)[]) => {
        const tree = arrayToTree(nodeArray);
        return func(tree);
    }
}

export const copyTree = (node: TreeNode): TreeNode => {
    const left = node.left ? copyTree(node.left) : null;
    const right = node.right ? copyTree(node.right) : null;
    return new TreeNode(node.val, left, right);
}