import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./feedbackSliderBlock.module.css";

import Slider from "react-slick";
import cn from "classnames";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";

import ArrowPict from "./icon/arrow-left.svg";
import ClosePict from "./icon/close.svg";

import { ApiBaseUrl } from "../../api/apiClientBase";

import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface FeedbackSliderBlockElement {
  title: string;
  allFeedbacksTitle: string;
  allFeedbacksLink: string;
  readMore: string;
  elements: { avatar: number | null; name: string; about: string; text: string; allText: string }[];
}

export const FeedbackSliderBlock = (props: FeedbackSliderBlockElement) => {
  const [curSlide, setCurSlide] = useState(0);
  const [isShowModal, setShowModal] = useState(false);

  const settings = {
    dots: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: "25%",
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: cn(styles.slider, "relative"),
    dotsClass: cn(styles.dots, "justify-start items-start max-w-screen-xl"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="py-12">
      <h2 className={cn(styles.title, "px-10 max-w-screen-xl mx-auto w-full font-bold")}>{props.title}</h2>
      <Slider {...settings}>
        {props.elements.map((feedback, ind) => (
          <div className={styles.item} key={ind}>
            <img
              className={styles.avatar}
              src={feedback.avatar ? `${ApiBaseUrl}/api/media/${feedback.avatar}` : ""}
              alt=""
            />
            <div>
              <h3 className="font-bold">{feedback.name}</h3>
              <h4>{feedback.about}</h4>
              <div dangerouslySetInnerHTML={{ __html: feedback.text }} />
              <span
                className={styles.readall}
                onClick={() => {
                  setCurSlide(ind);
                  setShowModal(true);
                }}
              >
                {props.readMore}
              </span>
            </div>
          </div>
        ))}
      </Slider>
      <div className="px-10">
        <ButtonFormBlock
          name={props.allFeedbacksTitle}
          link={props.allFeedbacksLink}
          iconLink={ArrowPict}
          align={"justify-end"}
        />
      </div>
      {isShowModal && (
        <div className={cn(styles.modal, "flex")}>
          <div className={styles.overlay} onClick={() => setShowModal(false)} />
          <div className={styles.item}>
            <img
              className={styles.avatar}
              src={props.elements[curSlide].avatar ? `${ApiBaseUrl}/api/media/${props.elements[curSlide].avatar}` : ""}
              alt=""
            />
            <div>
              <h3 className="font-bold">{props.elements[curSlide].name}</h3>
              <h4>{props.elements[curSlide].about}</h4>
              <HtmlPresenter text={props.elements[curSlide].allText} />
            </div>
            <img className={styles.close} src={ClosePict} alt="" onClick={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const FeedbackSliderBlockInfo: TypedBlockTypeInfo<FeedbackSliderBlockElement> = {
  id: "feedbackSliderBlock",
  name: "FeedbackSliderBlock",
  preview: preview,
  renderer: FeedbackSliderBlock,
  initialData: {
    title: "Header",
    allFeedbacksTitle: "All Feedbacks",
    allFeedbacksLink: "#",
    readMore: "Read more",
    elements: [
      {
        name: "Name",
        avatar: null,
        about: "About",
        text: "Text",
        allText: "All text",
      },
      {
        name: "Name",
        avatar: null,
        about: "About",
        text: "Text",
        allText: "All text",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "avatar",
            name: "Avatar",
            type: "Custom",
            customType: "Image",
          },
          {
            id: "name",
            type: "String",
            name: "Name",
          },
          {
            id: "about",
            type: "String",
            name: "About",
          },
          {
            id: "text",
            type: "Custom",
            customType: "Html",
            name: "Text",
          },
          {
            id: "allText",
            type: "Custom",
            customType: "Html",
            name: "All Text",
          },
        ],
      },
    },
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "allFeedbacksTitle",
        type: "String",
        name: "AllFeedbacksTitle",
      },
      {
        id: "allFeedbacksLink",
        type: "String",
        name: "AllFeedbacksLink",
      },
      {
        id: "readMore",
        type: "String",
        name: "ReadMore",
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
