"use client";

import { useParams } from "next/navigation";

export default function topicView() {
  const { category } = useParams();

  return <h1>Hello in</h1>;
}
