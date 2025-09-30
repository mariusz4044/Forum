export class FetchError extends Error {
  info: unknown;
  status: number;

  constructor(message: string, status: number, info: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    let errorInfo: unknown;
    try {
      errorInfo = await res.json();
    } catch (e) {
      errorInfo = await res.text();
    }

    throw new FetchError(
      "An error occurred while fetching the data.",
      res.status,
      errorInfo,
    );
  }

  return res.json();
};

export default fetcher;
