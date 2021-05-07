import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { LocalizedText } from "src/components/common/LocalizedText";
import { useState } from "react";

export const ContactUsForm = (props: { onDismiss: () => void }) => {
  return (
    <OverlayDialog cancel={props.onDismiss}>
      <h3>
        <LocalizedText id="contactUs_title" />
      </h3>
      <label>
        <LocalizedText id="contactUs_name" />
      </label>
      <input type="text" />
    </OverlayDialog>
  );
};

export const ContactUsFormButton = (props: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        href="#"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {props.children}
      </a>
      {isOpen ? <ContactUsForm onDismiss={() => setIsOpen(false)}/> : null}
    </>
  );
};
