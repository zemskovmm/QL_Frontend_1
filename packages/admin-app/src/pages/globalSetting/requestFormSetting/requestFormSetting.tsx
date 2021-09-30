import React, { FC, Suspense } from "react";
import { useObserver } from "mobx-react";
import { HtmlEditor } from "../../../components";
import { AdminInputBox } from "../../../components/common/AdminInputBox";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";

export const RequestFormSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div className={`px-1`}>
      <AdminInputBox
        label={`Title`}
        value={s.requestFormTitle}
        onChange={(e) => (s.requestFormTitle = e.target.value)}
      />
      <AdminInputBox
        label={`Subtitle Left`}
        value={s.requestFormLeftTitle}
        onChange={(e) => (s.requestFormLeftTitle = e.target.value)}
      />
      <AdminInputBox
        label={`Subtitle Right`}
        value={s.requestFormRightTitle}
        onChange={(e) => (s.requestFormRightTitle = e.target.value)}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <div className={`flex flex-col`}>
          <span className="text-gray-700 text-xl pr-4 text-center mb-3">Post script</span>
          <HtmlEditor
            data={s.requestFormPostText}
            onChange={(value) => {
              s.requestFormPostText = value;
            }}
          />
        </div>
      </Suspense>
    </div>
  ));
};
