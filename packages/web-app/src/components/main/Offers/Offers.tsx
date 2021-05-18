import React from "react"

import styles from "./Offers.module.css"
import cn from "classnames";

interface OffersProps {
  title: string,
  subtitle?: string,
  offers: {
      img: string,
      title: string,
      url: string
    }[]
}

const Offers:React.FC<OffersProps> = ({title, subtitle, offers}) => (
  <section className={cn(styles.offers,"py-24")}>
    <div className="flex flex-col max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <div className="flex items-end mb-10">
        <h2>{title}</h2>
        {subtitle && <h3>{subtitle}</h3>}
      </div>
      <div className={cn(styles.links,"flex justify-between mb-12")}>
        {offers.map(({img,title,url}, ind)=> <a key={ind} href={url}>
            <img src={img} alt="" />
            <span>{title}</span>
          </a>
        )}
      </div>
    </div>
  </section>
)
export default Offers;
