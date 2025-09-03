"use client";

import { Section, SectionText } from "@/app/(main)/Section";
import Topic from "@/app/(main)/Topic";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import { Category } from "@/types/types";

import { Statistics } from "@/app/(main)/Statistics";
import LatestStats from "@/components/Homepage/LatestStats";

export default function Home() {
  const { data } = useSWR(`${process.env.SERVER_URL}/api/forum`, fetcherGet, {
    shouldRetryOnError: false,
  });

  if (data?.length === 0 || !data) {
    return;
  }

  const structure = [];
  for (const section of data.sections) {
    structure.push(
      <Section key={section.title}>
        <SectionText id={section.id}>{section.title}</SectionText>
      </Section>,
    );

    section.categories.forEach((category: Category) => {
      structure.push(<Topic key={`cat-${category.id}`} category={category} />);
    });
  }

  return (
    <>
      <main className="w-full flex justify-center flex-row mt-10 gap-12 mb-10 max-sm:flex-col">
        <div className="w-[65%] h-full max-sm:w-full max-sm:p-4">
          {structure.length > 0 && structure}
          <LatestStats stats={data.stats} />
        </div>
        <div className="w-[20%] max-w-80 h-full max-sm:w-full max-sm:max-w-full max-sm:p-4">
          <Statistics data={data} />
        </div>
      </main>
    </>
  );
}
