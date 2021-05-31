import React, {useState} from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./feedbackSliderBlock.module.css"

import Carousel from "react-multi-carousel";
import cn from "classnames";
import {ButtonFormBlock} from "../ButtonFormBlock/buttonFormBlock";

import ArrowPict from '../../assets/img/arrow-left.svg'
import ClosePict from '../../assets/img/close.svg'
import {ApiBaseUrl} from "../../api/apiClientBase";

export interface FeedbackSliderBlockElement {
  title: string;
  allFeedbacksTitle: string,
  allFeedbacksLink: string,
  elements: { avatar: number | null; name: string; about: string; text: string; allText: string  }[];
}

export const FeedbackSliderBlock = (props: FeedbackSliderBlockElement) => {
  const [curSlide, setCurSlide] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="py-12">
      <h2 className={cn(styles.title,"px-10 max-w-screen-xl mx-auto w-full font-bold")}>{props.title}</h2>
      <div className="relative">
       <Carousel
          responsive={responsive}
          itemClass={styles.item}
          arrows={false}
          infinite
          centerMode
          showDots
          renderDotsOutside
          sliderClass={styles.slider}
          dotListClass={cn(styles.dots, "justify-start items-start max-w-screen-xl")}
          slidesToSlide={1}
          containerClass={styles.container}
        >
         {props.elements.map((feedback, ind) => <div key={ind}>
             <img src={feedback.avatar ? `${ApiBaseUrl}/api/media/${feedback.avatar}` : ''} alt="" />
             <div>
               <h3 className="font-bold">{feedback.name}</h3>
               <h4>{feedback.about}</h4>
               <div dangerouslySetInnerHTML={{ __html: feedback.text }}  />
               <span className={styles.readall} onClick={()=>{setCurSlide(ind);setShowModal(true)}}>Читать полностью</span>
             </div>
           </div>
         )}
        </Carousel>
        <div className="px-10">
          <ButtonFormBlock name={props.allFeedbacksTitle} link={props.allFeedbacksLink} iconLink={ArrowPict} align={"justify-end"} />
        </div>
    </div>
    {isShowModal && <div className={cn(styles.modal,"flex")}>
      <div className={styles.overlay} onClick={()=>setShowModal(false)}/>
      <div className={styles.item}>
        <div>
          <img src={props.elements[curSlide].avatar ? `${ApiBaseUrl}/api/media/${props.elements[curSlide].avatar}` : ''} alt="" />
          <div>
            <h3 className="font-bold">{props.elements[curSlide].name}</h3>
            <h4>{props.elements[curSlide].about}</h4>
            <div dangerouslySetInnerHTML={{ __html: props.elements[curSlide].allText }}  />
          </div>
        </div>
        <img className={styles.close} src={ClosePict} onClick={()=>setShowModal(false)}/>
      </div>
    </div>}
    </div>
  );
};

export const FeedbackSliderBlockInfo: TypedBlockTypeInfo<FeedbackSliderBlockElement> = {
  id: "feedbackSliderBlock",
  name: "FeedbackSliderBlock",
  renderer: FeedbackSliderBlock,
  initialData: {
    title: "Header",
    allFeedbacksTitle: "All Feedbacks",
    allFeedbacksLink: "#",
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
            customType: "Image"
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
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
