export function padEnd<T>(array: T[], minLength: number, fillValue: any = undefined) {
    return Object.assign(new Array(minLength).fill(fillValue), array);
}