import { FONT_SIZE } from "./globalVars";

export function toRem(px: number) {
  return px / FONT_SIZE + 'rem';
}