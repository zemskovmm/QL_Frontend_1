import React, { useEffect, useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import Map from "../map";
import { loadMapApi } from "../../utils/GoogleMapsUtils";
import styles from "./googleMapBlock.module.css";
import cn from "classnames";
import preview from "./preview.png";

export interface GoogleMapBlockElement {
  elements: { title: string; text: string; lat: number; lng: number; zoom: number }[];
}

export const GoogleMapBlock = (props: GoogleMapBlockElement) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const addresses = props.elements.map(({ lat, lng, zoom }) => ({ lat, lng, zoom }));
  const [activeAddress, setActiveAddress] = useState(0);

  useEffect(() => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvW5-5pUX6a1CWaP_BlbbSNuZsO-8Zeio&libraries=places&language=no&region=NO&v=quarterly`;
    const scripts = document.getElementsByTagName("script");
    // Go through existing script tags, and return google maps api tag when found.
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf(mapsURL) === 0) {
        setScriptLoaded(true);
        break;
      }
    }

    if (!scriptLoaded) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener("load", function () {
        setScriptLoaded(true);
      });
    }
  }, []);

  return (
    <div className={cn(styles.mapblock, "pt-12")}>
      <div className="flex justify-center align-stretch">
        {props.elements.map((el, ind) => (
          <div
            key={ind}
            className={cn(
              styles.block,
              "flex flex-col items-center p-7 my-4 mx-2",
              ind === activeAddress ? styles.active : ""
            )}
            onClick={() => setActiveAddress(ind)}
          >
            <div className={styles.pin} />
            <h3 className="font-bold">{el.title}</h3>
            <br />
            <div dangerouslySetInnerHTML={{ __html: el.text }} />
          </div>
        ))}
      </div>
      <div className="flex w-full">
        {scriptLoaded && <Map mapTypeControl={true} mapAddresses={addresses} mapActiveAddress={activeAddress} />}
      </div>
    </div>
  );
};

export const GoogleMapBlockInfo: TypedBlockTypeInfo<GoogleMapBlockElement> = {
  id: "googleMapBlock",
  name: "GoogleMapBlock",
  preview: preview,
  renderer: GoogleMapBlock,
  initialData: {
    elements: [
      {
        title: "Новосибирск",
        text: `<p>Лофт Мельница, </br>
                  ул. Фабричная д.27, к.16 <br />
                  +7 987 654-32-10</p>`,
        lat: 48.8565,
        lng: 2.3524,
        zoom: 12,
      },
      {
        title: "Париж",
        text: `<p> 10 rue de la Lune <br/>
                +33 144 829 031 </p>`,
        lat: 49.356,
        lng: 2.35,
        zoom: 12,
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "title",
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
            id: "lat",
            type: "Number",
            name: "Latitude",
          },
          {
            id: "lng",
            type: "Number",
            name: "Longitude",
          },
          {
            id: "zoom",
            type: "Number",
            name: "Zoom",
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
    ],
  },
};
