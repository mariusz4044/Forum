export default (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());
