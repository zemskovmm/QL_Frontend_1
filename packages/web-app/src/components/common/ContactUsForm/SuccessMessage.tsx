import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { useLocalizedText } from "src/components/common/LocalizedText";
import React, { FC, useState } from "react";
import { useIntl } from "react-intl";

export const SuccessMessage = (props: { onDismiss: () => void }) => {
  const intl = useIntl();
  return (
    <OverlayDialog cancel={props.onDismiss}>
      <div
        className={"text-center"}
        dangerouslySetInnerHTML={{ __html: useLocalizedText({ id: "contactUs_thanks" }, intl) }}
      />
    </OverlayDialog>
  );
};

