/**
 * CZero Deep Merge Utility
 * Properly merges nested config objects
 */

/**
 * Deep merge two objects, with source values overriding target
 * - Objects are recursively merged
 * - Arrays are replaced (not merged)
 * - Null/undefined in source removes the target value
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceValue = source[key];
    const targetValue = target[key];

    // If source explicitly sets null/undefined, use it
    if (sourceValue === null || sourceValue === undefined) {
      result[key] = sourceValue as T[keyof T];
      continue;
    }

    // If both are objects (not arrays), merge recursively
    if (
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue) &&
      targetValue !== null
    ) {
      result[key] = deepMerge(targetValue, sourceValue) as T[keyof T];
    } else {
      // Otherwise, source value wins
      result[key] = sourceValue as T[keyof T];
    }
  }

  return result;
}

/**
 * Deep merge multiple objects (left to right)
 */
export function deepMergeAll<T extends Record<string, any>>(
  ...objects: Partial<T>[]
): T {
  return objects.reduce(
    (acc, obj) => deepMerge(acc, obj),
    {} as T
  ) as T;
}
