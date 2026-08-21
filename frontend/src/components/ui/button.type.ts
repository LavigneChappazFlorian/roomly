import type { Snippet } from "svelte";

export interface PropsBase {
  children: Snippet<[]>;
}
export interface PropsButton extends PropsBase {
  type?: "button" | "submit" | "reset";
  onclick?: (event: MouseEvent) => void;
}
