export function zip(a: Array<any>, b: Array<any>): Array<any> {
    const length = Math.min(a.length, b.length);
    // todo: generator
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push([a[i], b[i]]);
    }
    return result;
}
