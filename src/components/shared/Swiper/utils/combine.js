/* eslint-disable */
/**
 * Combine two object and return the combined object.
 * @param first
 * @param second
 */
export default function combine(first, second) {
    const out = {};
    if (first) {
        for (const key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (const key in second) {
            out[key] = second[key];
        }
    }
    return out;
}
