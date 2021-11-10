import React, { useContext, useState } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";
import { without } from "lodash";

export interface BasicInputFileListBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  buttonName: string;
}

export const BasicInputFileListBlock = (props: BasicInputFileListBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  const [fileState, setFileState] = useState(true);

  return (
    <div className="py-3 flex flex-col">
      <label className={`flex cursor-pointer justify-between w-full`}>
        <span className={`mr-10`}>{props.label}</span>
        <div style={{ padding: "4px", border: "1px solid #E7E7E7", background: "#F6FAFF" }} className={`flex `}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 17" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.72214 0.097713C7.5578 0.193431 7.54581 0.556956 7.54581 5.45578V10.7112L5.95167 9.12832C5.07495 8.25779 4.28469 7.54555 4.19561 7.54555C3.98371 7.54555 3.7169 7.81678 3.7169 8.0323C3.7169 8.1258 4.64158 9.1261 5.77181 10.2553C7.54279 12.0245 7.85958 12.3 8.06412 12.2483C8.19471 12.2154 9.17431 11.3112 10.2412 10.2389C11.7841 8.68812 12.1808 8.23472 12.1808 8.02182C12.1808 7.7651 11.9461 7.54555 11.6717 7.54555C11.606 7.54555 10.8549 8.23391 10.0025 9.07522L8.45266 10.6048V5.46364C8.45266 0.61086 8.44228 0.313027 8.26836 0.155647C8.05687 -0.0357878 7.96759 -0.0452589 7.72214 0.097713ZM0.0956546 11.5179C0.0105117 11.6206 -0.0146786 12.2085 0.00779102 13.5752L0.0391277 15.4886L0.345138 15.9237C0.702033 16.4309 1.17289 16.7734 1.71367 16.919C1.96265 16.9861 4.23985 17.0126 8.17234 16.9944C14.1766 16.9665 14.251 16.9637 14.6494 16.7487C15.1213 16.4941 15.5089 16.0993 15.7712 15.606C15.9283 15.3105 15.9642 14.9732 15.9924 13.524C16.0147 12.381 15.988 11.7234 15.9136 11.5844C15.7883 11.3505 15.3892 11.3017 15.2248 11.5002C15.1649 11.5723 15.1059 12.365 15.0864 13.357C15.0494 15.2464 15.0159 15.361 14.3588 15.8516C14.0849 16.0561 13.9839 16.0594 8.01707 16.0594C2.37013 16.0594 1.93081 16.0469 1.62168 15.8781C0.97701 15.5262 0.896401 15.2518 0.895998 13.4079C0.895796 12.4682 0.850958 11.6806 0.791307 11.5691C0.669084 11.3409 0.26715 11.3113 0.0956546 11.5179Z"
              fill="#CECECE"
            />
          </svg>
        </div>
        {cl ? (
          <input
            id={String(props.schema?.id)}
            type="file"
            style={{ width: "1px", height: "1px", opacity: "0" }}
            className={"left-0 top-0 absolute"}
            onChange={async (e) => {
              if (e.target.files) {
                const data = new FormData();
                data.append("UploadedFile", e.target.files[0]);
                try {
                  const response: any = await cl?.postMedia(data);
                  cl.personalInfo[props.schema.id] = [...cl.personalInfo[props.schema.id], response.id];
                  setFileState(false);
                  setFileState(true);
                  e.target.value = "";
                } catch (e) {
                  alert("File not allowed");
                }
              }
            }}
          />
        ) : (
          "input file list"
        )}
      </label>
      <div className={`flex flex-col`}>
        {cl && fileState
          ? cl.personalInfo[props.schema.id]?.map((el: number) => (
              <div className={`flex items-center justify-between mt-2 w-full`}>
                {el}
                <button
                  type={"button"}
                  style={{ padding: "2px", border: "1px solid #E7E7E7", background: "#F6FAFF" }}
                  className={`flex `}
                  onClick={async () => {
                    try {
                      cl?.deleteMedia(el);
                      cl.personalInfo[props.schema.id] = without(cl.personalInfo[props.schema.id], el);
                      setFileState(false);
                      setFileState(true);
                    } catch (e) {
                      alert(e);
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 14 13" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.6319 0.631874C11.5147 0.514717 11.3248 0.514717 11.2076 0.631874L7.00077 4.83872L2.79316 0.631107C2.676 0.513949 2.48605 0.51395 2.36889 0.631107L1.02539 1.97461C0.908233 2.09177 0.908233 2.28172 1.02539 2.39887L5.233 6.60648L1.02527 10.8142C0.908115 10.9314 0.908115 11.1213 1.02527 11.2385L2.36878 12.582C2.48593 12.6991 2.67588 12.6991 2.79304 12.582L7.00077 8.37425L11.2077 12.5812C11.3249 12.6984 11.5148 12.6984 11.632 12.5812L12.9755 11.2377C13.0927 11.1206 13.0927 10.9306 12.9755 10.8134L8.76853 6.60648L12.9754 2.39964C13.0925 2.28248 13.0925 2.09253 12.9754 1.97538L11.6319 0.631874Z"
                      fill="#CECECE"
                    />
                  </svg>
                </button>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
