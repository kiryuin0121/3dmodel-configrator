"use client";

import { setShoePartColorAtom, setShoePartTextureAtom, shoeConfigAtom, ShoePart } from "@/atoms/shoe";
import { nextSlideAtom, prevSlideAtom, SHOE_PARTS, slideNumAtom } from "@/atoms/slide";
import { useAtomValue, useSetAtom } from "jotai";

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
const COLORS = [
  { label: "ホワイト", code: "#ffffff" },
  { label: "ブラック", code: "#000000" },
  { label: "グレー", code: "#d1d5db" },
  { label: "レッド", code: "#ef4444" },
  { label: "オレンジ", code: "#f97316" },
  { label: "イエロー", code: "#eab308" },
  { label: "グリーン", code: "#22c55e" },
  { label: "シアン", code: "#06b6d4" },
  { label: "ブルー", code: "#3b82f6" },
  { label: "インディゴ", code: "#6366f1" },
  { label: "パープル", code: "#a855f7" },
  { label: "ピンク", code: "#ec4899" },
];

const UI = () => {
  const shoeConfig = useAtomValue(shoeConfigAtom);
  const setShoePartColor = useSetAtom(setShoePartColorAtom);
  const slideNum = useAtomValue(slideNumAtom);
  const nextSlide = useSetAtom(nextSlideAtom);
  const prevSlide = useSetAtom(prevSlideAtom);
  const setShoePartTexture = useSetAtom(setShoePartTextureAtom);
  const currentPart = SHOE_PARTS[slideNum];
  const isLeather = shoeConfig[currentPart].texture === "leather";
  return (
    <div
      className={`absolute inset-0 z-10 w-screen h-screen pointer-events-none`}
    >
      <section
        className={`absolute bottom-0 left-0 pointer-events-auto w-screen min-h-1/4 bg-neutral-100 space-y-8`}
      >
        <div className={`flex justify-center items-center gap-x-4 text-lg`}>
          <button
            className={`cursor-pointer`}
            onClick={prevSlide}
          >
            ←
          </button>
          <div className={`flex gap-x-2`}>

          <h2>{SHOE_PART_LABEL[currentPart]}</h2>
          <span className={`text-neutral-500`}>{slideNum+1}/{SHOE_PARTS.length}</span>
          </div>
          <button
            className={`cursor-pointer`}
            onClick={nextSlide}
          >
            →
          </button>
        </div>
        
         <div className={`flex justify-center gap-x-2`}>
          <button
            onClick={() => setShoePartTexture({ part: currentPart, texture: null })}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              !isLeather
                ? "bg-neutral-800 text-white border-neutral-800"
                : "bg-white text-neutral-600 border-neutral-300"
            }`}
          >
            メッシュ
          </button>
          <button
            onClick={() => setShoePartTexture({ part: currentPart, texture: "leather" })}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              isLeather
                ? "bg-neutral-800 text-white border-neutral-800"
                : "bg-white text-neutral-600 border-neutral-300"
            }`}
          >
            レザー
          </button>
        </div>
        <ul className={`flex gap-8 justify-center items-center`}>
          {
            COLORS.map((color)=>(
              <li key={color.code}>
                <button
                onClick={() =>
                  setShoePartColor({
                    part: currentPart,
                    color:color.code,
                  })
                }
                style={{backgroundColor:color.code}}
                className={`h-8 aspect-square rounded-full cursor-pointer`}
                />
                <p className={`text-xs`}>{color.label}</p>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

export default UI;
