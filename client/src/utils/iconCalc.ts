import dir__icon from "../assets/images/icons/dir.svg"
import music__icon from "../assets/images/icons/music.svg"
import txt__icon from "../assets/images/icons/txt.svg"
import video__icon from "../assets/images/icons/video.svg"
import img__icon from "../assets/images/icons/img.svg"

type IconMap = {
  [key in string]: string
}

export const ICONS: IconMap = {
  dir: dir__icon,
  mp3: music__icon,
  mp4: video__icon,
  txt: txt__icon,
  doc: txt__icon,
  docx: txt__icon,
  pages: txt__icon,
  pdf: txt__icon, // create pdf icon
  jpg: img__icon,
  jpeg: img__icon,
  png: img__icon,
  svg: img__icon,
  // archive icon
  // unknown icon
}
