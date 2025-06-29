"use client";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Page from "@/components/Page";
import { type Character } from "@/types/character";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Character = () => {
  const router = useRouter();
  const [characters, _setCharacter] = useState<Character[]>([]);
  return (
    <Page title="Character" subtitle="List of Characters">
      <div className="flex">
        {characters.map((c) => {
          const lastLocation = c.visitedLocations.length
            ? c.visitedLocations[c.visitedLocations.length - 1]
            : "unknown";
          return (
            <Card
              key={`${c.fullName}:${lastLocation}`}
              className="flex flex-col align-middle items-center justify-center"
              onClick={() => router.push("/character/editor")}
            >
              <div>{c.fullName}</div>
              <div>{lastLocation}</div>
            </Card>
          );
        })}
        <Card
          className="flex flex-col align-middle items-center justify-center cursor-pointer"
          onClick={() => router.push("/character/editor")}
        >
          <div>Create New Character</div>
          <Icon name="icon-plus-circled" className="text-5xl align-middle" />
        </Card>
      </div>
    </Page>
  );
};

export default Character;
