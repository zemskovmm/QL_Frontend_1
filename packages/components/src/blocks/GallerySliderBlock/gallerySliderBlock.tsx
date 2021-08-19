import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./gallerySliderBlock.module.css";

import Slider, { Settings } from "react-slick";
import cn from "classnames";

import { ApiBaseUrl } from "../../api/apiClientBase";

import ArrowPict from "./icon/arrow.svg";
import ZoomPict from "./icon/zoom.svg";
import preview from "./preview.png";
import ClosePict from "../FeedbackSliderBlock/icon/close.svg";

export interface GallerySliderBlockElement {
  title: string | React.ReactNode;
  elements: { image: number | null }[];
}

interface GallerySliderArrow {
  onClick: () => void;
  className?: string;
}

const SliderArrow = ({ className, onClick }: GallerySliderArrow) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={ArrowPict} alt="" />
    </div>
  );
};

export const GallerySliderBlock = (props: GallerySliderBlockElement) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [choosenSlide, setChoosenSlide] = useState(0);
  const [isShowModal, setShowModal] = useState(false);

  const settings: Settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: props.elements.length > 3,
    lazyLoad: "ondemand",
    className: cn(styles.slider, "relative"),
    prevArrow: <SliderArrow onClick={() => onclick} />,
    nextArrow: <SliderArrow onClick={() => onclick} />,
    afterChange: (ind) => setCurrentSlide(ind),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: props.elements.length > 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          infinite: props.elements.length > 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          arrows: false,
          centerPadding: "30px",
        },
      },
    ],
  };

  if (props.elements.length === 0) return null;

  return (
    <div className="py-12">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className={cn(styles.titlepart, "px-10 flex justify-between")}>
          <h2 className={cn(styles.title, "font-bold")}>{props.title}</h2>
          <span className={styles.counter}>
            <b>{currentSlide + 1}</b>/{props.elements.length}
          </span>
        </div>

        <Slider {...settings}>
          {props.elements.map(({ image }, ind) => (
            <div key={ind}>
              <div className="inline-block relative">
                <img src={`${ApiBaseUrl}/api/media/scaled/${image}?dimension=370`} alt="" />
                <img
                  onClick={() => {
                    setChoosenSlide(ind);
                    setShowModal(true);
                  }}
                  className={styles.zoom}
                  src={ZoomPict}
                  alt=""
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isShowModal && (
        <div className={cn(styles.modal, "flex")}>
          <div className={styles.overlay} onClick={() => setShowModal(false)} />
          <div className={styles.modalcontent}>
            <img src={`${ApiBaseUrl}/api/media/${props.elements[choosenSlide].image}`} alt="" />
            <img className={styles.close} src={ClosePict} alt="" onClick={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export const GallerySliderBlockInfo: TypedBlockTypeInfo<GallerySliderBlockElement> = {
  id: "gallerySliderBlock",
  name: "GallerySliderBlock",
  preview: preview,
  renderer: GallerySliderBlock,
  initialData: {
    title: "Header",
    elements: [
      {
        image: null,
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "image",
            name: "Image",
            type: "Custom",
            customType: "Image",
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
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
