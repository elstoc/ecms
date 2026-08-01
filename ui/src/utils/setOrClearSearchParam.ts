export const setOrClearSearchParam = (
  params: URLSearchParams,
  key: string,
  value: string | undefined,
): URLSearchParams => {
  if (value === undefined) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params;
};
