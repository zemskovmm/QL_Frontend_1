import IconFacebook from "./IconFacebook";
import IconInstagram from "./IconInstagram";
import IconTelegram from "./IconTelegram";
import IconVk from "./IconVk";

export interface socialProps {
  icon: string
}

export default ({icon}:socialProps) => {
   switch (icon) {
    case 'facebook':
      return <IconFacebook />
    case 'instagram':
      return <IconInstagram />
    case 'telegram':
       return <IconTelegram />
    case 'vk':
    default:
      return <IconVk />
  }
}
