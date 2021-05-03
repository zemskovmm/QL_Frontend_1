import {useObserver} from "mobx-react";
import React from "react";


export const Paginator = (props: { page: number, totalPages: number, setPage: (page: number) => void }) => {

    const {page, totalPages, setPage} = props;
    const Btn = (props: { page: number, index: number, totalButtons: number }) => {

        var isCurrent = page == props.page;
        var isFirst = props.index == 0;
        var isLast = props.index == props.totalButtons - 1;
        var isMiddle = !isFirst && !isLast;
        var classes = "w-full text-base bg-white hover:bg-gray-100 px-4 py-2 ";

        if (isFirst && isLast)
            classes += " rounded-xl"
        if (isFirst)
            classes += " rounded-l-xl";
        else if (isLast)
            classes += " rounded-r-xl"
        if (isCurrent)
            classes += " text-indigo-500";
        else
            classes += " text-gray-600";

        if (!isFirst && !isLast && props.index != props.totalButtons - 2)
            classes += " border-t border-b border-r";
        else if (props.index == props.totalButtons - 2)
            classes += " border-t border-b";
        else
            classes += " border";

        return <button type="button"
                       onClick={() => setPage(props.page)}
                       className={classes}>
            {props.page + 1}
        </button>;
    }

    const p = page;
    const pagesAfter = totalPages - p;
    const pages = [];
    var c: number;
    if (totalPages > 0) {
        if (p != 0)
            pages.push(0);

        if (p < 4) {
            for (c = 1; c < p; c++)
                pages.push(c);
        } else {
            //pages.push(-1);
            for (c = p - 2; c < p; c++)
                pages.push(c);
        }
        pages.push(p);

        if (pagesAfter < 4)
            for (c = p + 1; c < totalPages - 1; c++)
                pages.push(c);
        else {
            for (c = p + 1; c < p + 3; c++)
                pages.push(c);
            //pages.push(-1);
        }
        if (p != totalPages - 1)
            pages.push(totalPages - 1);

    }

    return <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
        <div className="flex items-center">
            {pages.map((p, idx) => <Btn page={p} index={idx} totalButtons={pages.length}/>)}
        </div>
    </div>;

}