import CallIcon from "src/assets/images/social/call.svg";
import EmailIcon from "src/assets/images/social/email.svg";
import FacebookIcon from "src/assets/images/social/facebook.svg";
import InstagramIcon from "src/assets/images/social/instagram.svg";
import TelegramIcon from "src/assets/images/social/telegram.svg";
import TwitterIcon from "src/assets/images/social/twitter.svg";
import LinkedinIcon from "src/assets/images/social/linkedin.svg";
import LocationIcon from "src/assets/images/social/location.svg";
import SkypeIcon from "src/assets/images/social/skype.svg";
import GoogleIcon from "src/assets/images/social/google.svg";
import VkIcon from "src/assets/images/social/vk.svg";
import WhatsappIcon from "src/assets/images/social/whatsapp.svg";
import YoutubeIcon from "src/assets/images/social/youtube.svg";

export interface socialProps {
  className?:string,
  icon: string;
}

const ICONS: { [key:string]: string } = {
  'call': CallIcon,
  'email': EmailIcon,
  'facebook': FacebookIcon,
  'instagram': InstagramIcon,
  'telegram': TelegramIcon,
  'linkedin': LinkedinIcon,
  'location': LocationIcon,
  'skype': SkypeIcon,
  'g+': GoogleIcon,
  'twitter': TwitterIcon,
  'vk': VkIcon,
  'whatsapp': WhatsappIcon,
  'youtube': YoutubeIcon,
  
}

export default ({className, icon }: socialProps) => {
  if(icon in ICONS){
    return <img className={className} src={ ICONS[icon] } alt={icon} />;
  }

  return <img alt={icon} />;
};
