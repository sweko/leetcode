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

export const wrapTreeWithParam = <TParam, TResult>(func:(root: TreeNode | null, param: TParam) => TResult) => ([root, param]:[(number|null)[], TParam]) => func(arrayToTree(root), param);

export const copyTree = (node: TreeNode): TreeNode => {
    const left = node.left ? copyTree(node.left) : null;
    const right = node.right ? copyTree(node.right) : null;
    return new TreeNode(node.val, left, right);
}

export const treeToArray = (root: TreeNode | null) : (number|null)[] => {
  const queue: (TreeNode| null)[] = [];
  queue.push(root);
  const result: (number|null)[] = [];

  while (queue.length !== 0) {
    const node = queue.shift() as TreeNode | null;
    if (node === null) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    queue.push(node.left);
    queue.push(node.right)
  }
  while (result[result.length -1] === null) {
    result.pop();
  }
  return result;
}

export const wrapTreeResult = (func: (...args: any[]) => TreeNode | null) => {
  return (...args: any[]) => {
      const result = func(...args);
      if (result === null) {
          return [];
      }
      return treeToArray(result)
  }
}