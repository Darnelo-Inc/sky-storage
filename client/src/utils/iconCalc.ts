import dir__icon from "../assets/images/icons/dir.png"

type IconMap = {
  [key in string]: any
}

const enum TYPES {
  dir,
  mp3,
  mp4,
  txt,
}

export const ICONS: IconMap = {
  [TYPES.dir]: dir__icon,
}
