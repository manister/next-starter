export const chunk = <T>(arr: T[]): [T, T][] => {
  return arr.flatMap((_, i, a) => {
    const pair = a.slice(i, i + 2) as [T, T]
    return i % 2 ? [] : [pair]
  })
}

export const arrShallowEq = <T>(arr1: T[], arr2: T[]): boolean => {
  return arr1.every((item, i) => item === arr2[i])
}
