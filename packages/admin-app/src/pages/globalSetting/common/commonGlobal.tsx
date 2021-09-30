import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { AdminInputBox } from "../../../components/common/AdminInputBox";
import { LinkDto, SocialLinkDto } from "../../../interfaces/GlobalSettingsDto";

export const GlobalSocialLink: FC<{ value: SocialLinkDto[]; name: string }> = ({ value, name }) => {
  return useObserver(() => (
    <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
      <span className="text-gray-700 text-xl pr-4 flex flex-col">
        {name}
        <span>We have: telegram, vk, facebook, instagram, linkedIn, G+, twitter, youtube</span>
      </span>
      <div className={`flex flex-col w-3/4`}>
        {value &&
          value.map((el, index) => (
            <div key={index} className={`flex flex-col`}>
              <AdminInputBox value={el.icon} label={"social name"} onChange={(e) => (el.icon = e.target.value)} />
              <AdminInputBox value={el.link} label={"link"} onChange={(e) => (el.link = e.target.value)} />
              <button
                onClick={() => value.splice(index, 1)}
                className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
              >
                remove
              </button>
            </div>
          ))}
        <button
          onClick={() => value.push({ icon: "", link: "" })}
          className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
        >
          Add
        </button>
      </div>
    </div>
  ));
};

export const GlobalLink: FC<{ value: LinkDto[]; name: string }> = ({ value, name }) => {
  return useObserver(() => (
    <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
      <span className="text-gray-700 text-xl pr-4">{name}</span>
      <div className={`flex flex-col w-3/4`}>
        {value &&
          value.map((el, index) => (
            <div key={index} className={`flex flex-col`}>
              <AdminInputBox value={el.name} label={"name"} onChange={(e) => (el.name = e.target.value)} />
              <AdminInputBox value={el.link} label={"link"} onChange={(e) => (el.link = e.target.value)} />
              <button
                onClick={() => value.splice(index, 1)}
                className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
              >
                remove
              </button>
            </div>
          ))}
        <button
          onClick={() => value.push({ name: "", link: "" })}
          className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
        >
          Add
        </button>
      </div>
    </div>
  ));
};
