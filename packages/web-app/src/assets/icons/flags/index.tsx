import En from "src/assets/images/flags/en.svg";
import Ru from "src/assets/images/flags/ru.svg";
import Fr from "src/assets/images/flags/fr.svg";
import Esp from "src/assets/images/flags/esp.svg";
import Cn from "src/assets/images/flags/cn.svg";
import EnFr from "src/assets/images/flags/enfr.svg";

export interface socialProps {
  icon: string;
}

const Flags = ({ icon }: socialProps) => {
  switch (icon) {
    case "fr/en":
      return <img src={EnFr} alt={icon} />;
    case "fr":
      return <img src={Fr} alt={icon} />;
    case "ru":
      return <img src={Ru} alt={icon} />;
    case "esp":
      return <img src={Esp} alt={icon} />;
    case "cn":
      return <img src={Cn} alt={icon} />;
    case "en":
    default:
      return <img src={En} alt="en" />;
  }
};

export default Flags;
