import { toast } from "react-toastify";

const SERVER_URL = process.env.SERVER_URL || "";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RequestProps {
  [key: string]: any;
}

interface ResponseProps {
  message?: string;
  error?: string;
  data?: Record<string, any>;
}

const tostOptions = {
  theme: "dark",
};

export const fetchData = async (endpoint: string, data: RequestProps) => {
  try {
    const res = await fetch(`${SERVER_URL}${endpoint}`, {
      method: data ? "POST" : "GET",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    const responseData = await res.json();

    // Log error responses (like 400, 401, 500, etc.)
    if (!res.ok && responseData.error) {
      toast.error(responseData.error, tostOptions);
    } else if (responseData.message) {
      toast.success(responseData.message, tostOptions);
    }

    return responseData;
  } catch (err) {
    console.error("fetchData network error");
  }
};
