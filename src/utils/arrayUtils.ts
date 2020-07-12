export function findByProp<T extends Record<string, any>>(
    prop: string | number,
    propToFind: string | number | boolean
) {
    return (item: T) => item[prop] === propToFind;
}
