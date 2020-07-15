export function findByProp<T, K extends keyof T>(prop: K, propToFind: T[K]) {
    return (item: T) => item[prop] === propToFind;
}
