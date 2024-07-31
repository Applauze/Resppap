import {
  Rubik,
  Roboto_Serif,
  Shadows_Into_Light,
  PT_Sans,
} from "next/font/google";

export const rubik_init = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600"],
});
export const roboto_serif_init = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto_serif",
  weight: ["300", "400", "500", "600"],
});
export const shadows_Into_Light_init = Shadows_Into_Light({
  subsets: ["latin"],
  display: "swap",
  variable: "--shadows_Into_Light",
  weight: ["400"],
});
export const pt_Sans_init = PT_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--pt_Sans_init",
  weight: ["400"],
});

export const rubik = rubik_init.className;
export const roboto_serif = roboto_serif_init.className;
export const shadows_Into_Light = shadows_Into_Light_init.className;
export const pt_Sans = pt_Sans_init.className;
