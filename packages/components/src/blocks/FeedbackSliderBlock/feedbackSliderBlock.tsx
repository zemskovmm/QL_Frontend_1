import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";

import styles from "./feedbackSliderBlock.module.css"

import Carousel from "react-multi-carousel";
import cn from "classnames";

export interface FeedbackSliderBlockElement {
  elements: { title: string; text: string; position: string }[];
}

export const FeedbackSliderBlock = (props: FeedbackSliderBlockElement) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="py-20">
      <Carousel
          draggable
          responsive={responsive}
          itemClass={styles.item}
          arrows={false}
          centerMode
          showDots
          sliderClass={styles.slider}
          slidesToSlide={1}
          infinite
          ssr
          containerClass={styles.container}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
      </Carousel>
    </div>
  );
};

export const FeedbackSliderBlockInfo: TypedBlockTypeInfo<FeedbackSliderBlockElement> = {
  id: "feedbackSliderBlock",
  name: "FeedbackSliderBlock",
  renderer: FeedbackSliderBlock,
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
