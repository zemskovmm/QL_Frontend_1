import styles from "./OverlayDialog.module.css";
import { Portal } from "@project/components/src/utils/Portal";

export const OverlayDialog = (props: { children?: any; cancel: () => void }) => {
  return (
    <Portal>
      <div className={styles.overlayDialogOverlay} onClick={(_) => props.cancel()}></div>
      <div className={styles.overlayDialogContainerMargin} onClick={(_) => props.cancel()}>
        <div className={styles.overlayDialogContainer} onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </Portal>
  );
};
