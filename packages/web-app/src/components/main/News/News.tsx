import React from "react"

import styles from "./News.module.css"
import cn from "classnames";
import Social from "src/components/main/Social/Social";

interface NewsProps {
  title: string,
  url: string,
  social? : {
    url: string,
    title: string
  }[],
  news: {
    link: string,
    img: string,
    description: string,
    date: string
  }[]
}

const News:React.FC<NewsProps> = ({title, url, news,social}) => (
  <section className={"py-24"}>
    <div className="flex flex-col max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <h2 className={styles.title}><a className={styles.link} href={url}>{title}</a>{' '}<span>(9)</span></h2>
      <div className="flex">
        <div className={cn(styles.news,"flex flex-wrap w-3/4")}>
          {news.map(({link, img,description,date}, ind)=> (
            <a key={ind} href={url}>
              <img src={img} alt="" />
              <div>
                <span>{date}</span>
                <p>{description}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="w-1/4">
          {social && <Social tabs={social}/>}
        </div>
      </div>

    </div>
  </section>
)
export default News;
