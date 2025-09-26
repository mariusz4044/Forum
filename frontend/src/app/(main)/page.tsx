"use client";

import { Section, SectionText } from "@/app/(main)/Section";
import Topic from "@/app/(main)/Topic";
import fetcherGet from "@/functions/fetcherGet";
import { Category, SectionProps } from "@/types/types";
import { Statistics } from "@/app/(main)/Statistics";
import LatestStats from "@/components/Homepage/LatestStats";

import useSWR from "swr";
import { Fragment } from "react";
import Loading from "@/components/Utils/Universal/Loading";

export default function Home() {
  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum`,
    fetcherGet,
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Please refresh the page!</p>;
  }

  return (
    <>
      <main className="w-full flex justify-center flex-row mt-10 gap-12 mb-10 max-sm:flex-col">
        <div className="w-[65%] h-full max-sm:w-full max-sm:p-4">
          {data.sections.map((section: SectionProps) => (
            <Fragment key={section.id}>
              <Section>
                <SectionText id={section.id}>{section.title}</SectionText>
              </Section>
              {section.categories.map((category: Category) => (
                <Topic key={category.id} category={category} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className="w-[20%] max-w-80 h-full max-sm:w-full max-sm:max-w-full max-sm:p-4">
          <Statistics data={data} />
          <LatestStats stats={data.stats} />
        </div>
      </main>
    </>
  );
}
