export const ensurePresent = <T>(
  value: T,
  valueName = 'value'
): NonNullable<T> => {
  if (value === null || value === undefined) {
    throw new Error(
      `Expected ${valueName} to be present, but got ${value}`
    )
  }
  return value
}
