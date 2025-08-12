import { HTTP_METHOD } from "next/dist/server/web/http";
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

export const fetchData = async (
  endpoint: string,
  data: RequestProps,
  method?: HTTP_METHOD,
) => {
  try {
    console.log();
    const res = await fetch(`${SERVER_URL}${endpoint}`, {
      method: method || (data ? "POST" : "GET"),
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
  } catch (err: any) {
    console.error("fetchData network error", err);
  }
};
