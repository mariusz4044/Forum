import { Cache } from "swr";

export function getSWRKey(cache: Cache, find: string) {
  const matchingKeys = Array.from(cache.keys()).filter(
    (key) => typeof key === "string" && key.includes(find),
  );

  if (!matchingKeys.length) {
    throw new Error("Cannot find swd matching keys!");
  }

  return matchingKeys[0];
}
