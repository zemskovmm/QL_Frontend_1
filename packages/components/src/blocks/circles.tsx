import React from 'react';
import {TypedBlockTypeInfo} from "./blocks-info";
import styles from './circles.module.css';

export interface CirclesBlockElement {
  header: string;
  number: string;
  text: string;
}

export interface CirclesBlockProps {
  elements: CirclesBlockElement[];
}

export const CirclesBlock = (props: CirclesBlockProps) => {
  return <div className="grid grid-flow-col auto-cols-max">
    {props.elements.map(e => <div className={styles.circleItem}>
      <div className={styles.circleArticle}>{e.header}</div>
      <div className={styles.circleCount}>{e.number}</div>
      <div className={styles.circleText}>{e.text}</div>
    </div>)}
  </div>
}

export const CirclesBlockInfo: TypedBlockTypeInfo<CirclesBlockProps> =
  {
    id: "circles",
    name: "Circles",
    renderer: CirclesBlock,
    initialData: {
      elements: [
        {
          header: "Header",
          number: "9000",
          text: "Text"
        },
        {
          header: "Header2",
          number: "9000",
          text: "Text"
        },
      ]
    },
    definition: {
      subTypes: {
        "element": {
          fields: [
            {
              id: "header",
              type: "String",
              name: "Header"
            },
            {
              id: "number",
              type: "Number",
              name: "Number"
            },
            {
              id: "text",
              type: "String",
              name: "Text"
            }
          ]
        }
      },
      fields: [
        {
          id: "elements",
          name: "Elements",
          type: "List",
          listType: "element"
        }
      ]
    }
  }
