import IconFacebook from "./IconFacebook";
import IconInstagram from "./IconInstagram";
import IconTelegram from "./IconTelegram";
import IconWhatsapp from "./IconWhatsapp";
import IconVk from "./IconVk";

export interface socialProps {
  icon: string;
}

export default ({ icon }: socialProps) => {
  switch (icon.toLowerCase()) {
    case "facebook":
      return <IconFacebook />;
    case "instagram":
      return <IconInstagram />;
    case "telegram":
      return <IconTelegram />;
    case "whatsapp":
      return <IconWhatsapp />;
    case "vk":
    default:
      return <IconVk />;
  }
};
