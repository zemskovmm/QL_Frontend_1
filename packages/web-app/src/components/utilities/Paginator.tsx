import React from "react";
import style from "./Paginetor.module.css";

export const Paginator = (props: { page: number; totalPages: number; setPage: (page: number) => void }) => {
  const { page, totalPages, setPage } = props;
  const Btn = (props: { page: number; index: number; totalButtons: number }) => {
    return (
      <button
        type="button"
        onClick={() => setPage(props.page)}
        className={`${style.btn} ${page === props.page ? style.btn_active : ""}`}
      >
        {props.page + 1}
      </button>
    );
  };

  const p = page;
  const pagesAfter = totalPages - p;
  const pages = [];
  var c: number;
  if (totalPages > 0) {
    if (p != 0) pages.push(0);

    if (p < 4) {
      for (c = 1; c < p; c++) pages.push(c);
    } else {
      //pages.push(-1);
      for (c = p - 2; c < p; c++) pages.push(c);
    }
    pages.push(p);

    if (pagesAfter < 4) for (c = p + 1; c < totalPages - 1; c++) pages.push(c);
    else {
      for (c = p + 1; c < p + 3; c++) pages.push(c);
      //pages.push(-1);
    }
    if (p != totalPages - 1) pages.push(totalPages - 1);
  }

  return (
    <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">
        {pages.map((p, idx) => (
          <Btn key={idx} page={p} index={idx} totalButtons={pages.length} />
        ))}
      </div>
    </div>
  );
};
