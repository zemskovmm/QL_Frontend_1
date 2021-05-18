import React from "react"

import styles from "./Partners.module.css"
import cn from "classnames";

interface PartnersProps {
  title: string,
  url: string
}

const Partners:React.FC<PartnersProps> = ({title, url}) => (
  <section className={cn(styles.partners,"py-24")}>
    <div className="flex flex-col max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <h2 className={styles.title}><a className={styles.link} href={url}>{title}</a>{' '}<span>(91)</span></h2>
      <div className="flex justify-between items-center">
        <img src="/images/partners/1.png" alt="" />
        <img src="/images/partners/2.png" alt="" />
        <img src="/images/partners/3.png" alt="" />
        <img src="/images/partners/4.png" alt="" />
        <img src="/images/partners/5.png" alt="" />
        <img src="/images/partners/6.png" alt="" />
      </div>
    </div>
  </section>
)
export default Partners;
