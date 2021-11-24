import styles from "./OverlayDialog.module.css";
import { Portal } from "@project/components/src/utils/Portal";
import iconClose from "src/assets/icons/cross-remove.svg";

export const OverlayDialog = (props: {
  children?: any;
  cancel: () => void;
  className?: string;
  paddingBottom?: string;
}) => {
  return (
    <Portal>
      <div className={styles.overlayDialogOverlay} onClick={(_) => props.cancel()}>
        <div
          className={styles.overlayDialogContainer + ` ${props.className} ${props.paddingBottom ?? "lg:pb-11"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.overlayDialogContainer__buttonClose} onClick={(_) => props.cancel()}>
            <img src={iconClose} alt="" />
          </button>
          {props.children}
        </div>
      </div>
    </Portal>
  );
};
