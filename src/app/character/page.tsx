"use client";
import Page from "@/components/Page";
import { type Character } from "@/types/character";
import { useState } from "react";

const Character = () => {
  const [characters, _setCharacter] = useState<Character[]>([]);
  return (
    <Page title="Character" subtitle="List of Characters">
      {characters.map((c) => {
        const lastLocation = c.visitedLocations.length
          ? c.visitedLocations[c.visitedLocations.length - 1]
          : "";
        return (
          <div key={`${c.fullName}:${lastLocation}`}>
            <div>{c.fullName}</div>
            <div>{lastLocation}</div>
          </div>
        );
      })}
    </Page>
  );
};

export default Character;
