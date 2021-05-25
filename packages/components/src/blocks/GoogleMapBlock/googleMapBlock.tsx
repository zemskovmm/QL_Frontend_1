import React, { Component, useState, FC } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./googleMapBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";

export interface GoogleMapBlockElement {
  elements: { title: string; text: string; position: string }[];
}

export const GoogleMapBlock = (props: GoogleMapBlockElement) => {
  return (
    <div className="py-28">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.googleMapBlock}>
          <div className={styles.googleMapBlock__switch}>
            <span className={styles.googleMapBlock__switchItem}></span>
            <span className={styles.googleMapBlock__switchItem}></span>
          </div>
          <div className={styles.googleMapBlock__markerList}>
            {props.elements.map((el) => (
              <div className={styles.googleMapBlock__marker}>
                <div className={styles.googleMapBlock__markerIcon}>
                  <img src="" alt="" />
                </div>
                <div className={styles.googleMapBlock__markerTitle}></div>
                <div className={styles.googleMapBlock__markerText}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleMapBlockInfo: TypedBlockTypeInfo<GoogleMapBlockElement> = {
  id: "googleMapBlock",
  name: "GoogleMapBlock",
  renderer: GoogleMapBlock,
  initialData: {
    elements: [
      {
        title: "string",
        text: "string",
        position: "56.47471952064302, 84.97663043004275",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "name",
            type: "String",
            name: "Name",
          },
          {
            id: "text",
            type: "Custom",
            customType: "Html",
            name: "Text",
          },
          {
            id: "position",
            type: "String",
            name: "Position",
          },
        ],
      },
    },
    fields: [
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
