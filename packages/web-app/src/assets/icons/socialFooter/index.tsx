import Facebook from "src/assets/images/social/facebook.svg";
import Instagram from "src/assets/images/social/instagram.svg";
import Telegram from "src/assets/images/social/telegram.svg";
import Twitter from "src/assets/images/social/twitter.svg";
import Linkedin from "src/assets/images/social/linkedin.svg";
import Google from "src/assets/images/social/google.svg";
import Vk from "src/assets/images/social/vk.svg";

export interface socialProps {
  icon: string
}

export default ({icon}:socialProps) => {
   switch (icon) {
    case 'facebook':
      return <img src={Facebook} alt={icon} />
    case 'instagram':
      return <img src={Instagram} alt={icon} />
    case 'telegram':
      return <img src={Telegram} alt={icon} />
    case 'linkedIn':
      return <img src={Linkedin} alt={icon} />
    case 'G+':
      return <img src={Google} alt={icon} />
    case 'twitter':
      return <img src={Twitter} alt={icon} />
    case 'vk':
    default:
      return <img src={Vk} alt={icon} />
  }
}
