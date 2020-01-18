/** in-place shuffles the given array (Knuth shuffle) */
export function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = random_int(i + 1);
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

export function choice<T>(items: Iterable<T>): T {
    const array = Array.from(items);
    return array[random_int(array.length)];
}

function random_int(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}
