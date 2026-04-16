import { atom } from "jotai";
type ShoePartTexture = "none"|"leather";
type ShoePartMaterial = {
  color: string;
  texture:ShoePartTexture;
};
export type ShoePart =
  | "laces"
  | "mesh"
  | "caps"
  | "inner"
  | "sole"
  | "stripes"
  | "band"
  | "patch";
type ShoeConfig = Record<ShoePart,ShoePartMaterial>;
export const shoeConfigAtom = atom<ShoeConfig>({
  laces: { color: "white" ,texture:"none"},
  mesh: { color: "white" ,texture:"none"},
  caps: { color: "white" ,texture:"none"},
  inner: { color: "white" ,texture:"none"},
  sole: { color: "white" ,texture:"none"},
  stripes: { color: "white" ,texture:"none"},
  band: { color: "white" ,texture:"none"},
  patch: { color: "white" ,texture:"none"},
});
export const setShoePartColorAtom = atom(null,(get,set,update:{part:ShoePart,color:string}) => {
  const {part,color} = update;
  const shoeConfig= get(shoeConfigAtom);
  set(shoeConfigAtom,{...shoeConfig,[part]:{...shoeConfig[part],color}});
});
export const setShoePartTextureAtom = atom(null,(get,set,update:{part:ShoePart,texture:ShoePartTexture}) => {
  const {part,texture} = update;
  const shoeConfig = get(shoeConfigAtom);
  set(shoeConfigAtom,{...shoeConfig,[part]:{...shoeConfig[part],texture}})
});