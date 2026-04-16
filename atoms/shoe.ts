import { atom } from "jotai";
type ShoePartTexture = null|"leather";
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
  laces: { color: "white" ,texture:null},
  mesh: { color: "white" ,texture:null},
  caps: { color: "white" ,texture:null},
  inner: { color: "white" ,texture:null},
  sole: { color: "white" ,texture:null},
  stripes: { color: "white" ,texture:null},
  band: { color: "white" ,texture:null},
  patch: { color: "white" ,texture:null},
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