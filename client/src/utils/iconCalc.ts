import dir__icon from "../assets/images/icons/dir.svg"
import music__icon from "../assets/images/icons/music.svg"
import video__icon from "../assets/images/icons/video.svg"
import txt__icon from "../assets/images/icons/txt.svg"

type IconMap = {
  [key in string]: string
}

export const ICONS: IconMap = {
  dir: dir__icon,
  mp3: music__icon,
  mp4: video__icon,
  txt: txt__icon,
}
