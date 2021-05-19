import React, {useState} from "react"

import styles from "./Social.module.css"
import cn from "classnames";

interface SocialProps {
  tabs: {
    title: string,
    url: string,
  }[]
}

const Social:React.FC<SocialProps> = ({tabs}) => {

  const [activeTab, setActiveTab] = useState(0);

  return <div>
    <div className="flex w-full">
      {tabs.map(({title, url}, ind)=> (
        <a className={cn(styles.link, ind === activeTab ? styles.active : '')}
           key={ind}
           href={url}
           target="_blank"
           onClick={()=>setActiveTab(ind)}
        >{title}</a>
      ))}
    </div>
    <div className={styles.frame} />
  </div>
}
export default Social;
