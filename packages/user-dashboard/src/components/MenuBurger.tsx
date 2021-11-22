import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import BURGER_ICON from "@project/components/src/assets/icons/burger.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { LeftNavigation } from "./LeftNavigation";

type PropsType = {
  className?: string;
};

export const MenuBurger: FunctionalComponent<PropsType> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((it) => !it);
  };

  return (
    <span className={`relative ${className}`} onClick={handleOpen}>
      <Icon src={BURGER_ICON} alt="menu" size="5" />
      {isOpen && (
        <div className="z-10 fixed inset-0">
          <LeftNavigation className="fixed right-0 top-0 h-full w-64 border drop-shadow bg-white rounded" />
        </div>
      )}
    </span>
  );
};
