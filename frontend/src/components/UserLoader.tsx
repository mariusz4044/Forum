"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/UserContext";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";

interface UserLoaderProps {
  children: React.ReactNode;
}

export default function UserLoader({ children }: UserLoaderProps) {
  const { user, setNewUser } = useUserContext();

  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/user`,
    fetcherGet,
    {
      shouldRetryOnError: false,
      refreshInterval: 0,
    },
  );

  useEffect(() => {
    if (data?.id) setNewUser(data);
  }, [data, user.id, setNewUser]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
