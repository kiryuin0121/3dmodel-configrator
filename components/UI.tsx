"use client";

import { setShoePartColorAtom, shoeConfigAtom, ShoePart } from "@/atoms/shoe";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

const SHOE_PARTS: ShoePart[] = [
  "mesh",
  "stripes",
  "laces",
  "caps",
  "inner",
  "sole",
  "band",
  "patch",
];
const SHOE_PART_LABEL: Record<ShoePart, string> = {
  laces: "シューレース",
  mesh: "アッパー",
  stripes: "ストライプ",
  caps: "シューホール",
  inner: "インナー",
  sole: "ミッドソール",
  band: "シュータン",
  patch: "バックタブ",
};
const UI = () => {
  const shoeConfig = useAtomValue(shoeConfigAtom);
  const setShoePartColor = useSetAtom(setShoePartColorAtom);
  const [slideNum, setSlideNum] = useState(0);
  return (
    <div
      className={`absolute inset-0 z-10 w-screen h-screen pointer-events-none`}
    >
      <section
        className={`absolute bottom-0 left-0 pointer-events-auto w-screen min-h-1/4 bg-neutral-100 `}
      >
        <div className={`flex justify-center items-center gap-x-4`}>
          <button
            className={`cursor-pointer`}
            onClick={() =>
              setSlideNum((slideNum) =>
                slideNum === 0 ? SHOE_PARTS.length - 1 : slideNum - 1,
              )
            }
          >
            ←
          </button>
          <h2>{SHOE_PART_LABEL[SHOE_PARTS[slideNum]]}</h2>
          <button
            className={`cursor-pointer`}
            onClick={() =>
              setSlideNum((slideNum) => (slideNum + 1) % SHOE_PARTS.length)
            }
          >
            →
          </button>
        </div>

        <ul></ul>
      </section>
    </div>
  );
};

export default UI;
