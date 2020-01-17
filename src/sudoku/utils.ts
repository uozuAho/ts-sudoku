export function* zip(a: Array<any>, b: Array<any>) {
    const length = Math.min(a.length, b.length);
    for (let i = 0; i < length; i++) {
        yield [a[i], b[i]];
    }
}
