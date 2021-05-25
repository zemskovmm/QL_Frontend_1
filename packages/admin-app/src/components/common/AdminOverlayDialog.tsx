import styles from "./AdminOverlayDialog.module.css";
import { Portal } from "@project/components/src/utils/Portal";
import React, {useContext} from "react";

const OverlayDialogZIndex = React.createContext(8000);


const AdminOverlayDialogRenderer = (props: { children?: any; cancel: () => void }) => {
  const currentIndex = useContext(OverlayDialogZIndex);
  return (
    <Portal>
      <div style={{ zIndex: currentIndex }} className={styles.overlayDialogOverlay} onClick={(_) => props.cancel()} />
      <div
        style={{ zIndex: currentIndex + 1 }}
        className={styles.overlayDialogContainerMargin}
        onClick={(_) => props.cancel()}
      >
        <div className={styles.overlayDialogContainer} onClick={(e) => e.stopPropagation()}>
          <OverlayDialogZIndex.Provider value={currentIndex + 2}>{props.children}</OverlayDialogZIndex.Provider>
        </div>
      </div>
    </Portal>
  );
};

export const AdminOverlayDialog = (props: { children?: any; cancel: () => void }) => {
  return <AdminOverlayDialogRenderer {...props} />;
};
