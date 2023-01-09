import { AsyncIterable, AsyncPredicate } from './types';

/// !doc

/// ## someAsync
/// ```ts
/// someAsync<T>(iterable: AsyncIterable<T>, predicate: AsyncPredicate<T>): Promise<boolean>
/// ```
/// Checks if predicate (`array`, `Promise of array` or `array of Promises`) returns truthy for any element of collection.
/// Iteration is stopped once predicate returns truthy.
/// Resolves a boolean.
/// ```ts
/// await someAsync(Promise.resolve([0, 1, 2, 3, 4, 5, 6]), (item) => {
///     return item > 3
/// }); // => true
///
/// await someAsync(Promise.resolve([0, 1, 2, 3, 4, 5, 6]), (item) => {
///     return item > 7
/// }); // => false
/// ```
export async function someAsync<T>(iterable: AsyncIterable<T>, predicate: AsyncPredicate<T>): Promise<boolean> {
    const unwrappedIterable = await Promise.all(await iterable);
    for (const elem of unwrappedIterable) {
        if (await predicate(elem)) {
            return true;
        }
    }
    return false;
}
