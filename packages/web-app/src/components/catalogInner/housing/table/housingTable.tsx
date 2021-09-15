import React, { FC, useState } from "react";
import style from "./housingTable.module.css";
import { ClientHousingAccommodationTypesDto } from "../../../../interfaces/clientHousingDto";
import { LocalizedText } from "../../../common/LocalizedText";
import { OverlayDialog } from "../../../common/dialog/OverlayDialog";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import notIcon from "../../../../assets/icons/done_outline.svg";
import { ClientCommonTraitLanguageDto } from "../../../../interfaces/clientCommonTraitLanguageDto";

export const HousingTable: FC<{ data: ClientHousingAccommodationTypesDto[] }> = ({ data }) => {
  const [dialog, setDialog] = useState(false);
  const [dialogData, setDialogData] = useState<ClientCommonTraitLanguageDto[]>([]);
  return (
    <>
      {dialog && (
        <OverlayDialog cancel={() => setDialog(false)}>
          <div className={`flex flex-wrap`}>
            {dialogData.map((el, index) => (
              <div className={`flex items-center mr-10 w-30 mb-10`} key={el.name + index}>
                <div className={`p-2 w-10 h-10 rounded-full mr-10`} style={{ backgroundColor: "#EFF3FA" }}>
                  <img src={el.iconId ? `${ApiBaseUrl}/api/media/scaled/${el.iconId}` : notIcon} alt="" />
                </div>
                <span style={{ color: "#373737" }} className={`text-sm`}>
                  {el.name}
                </span>
              </div>
            ))}
          </div>
        </OverlayDialog>
      )}
      <table className={`${style.tablePlans}`}>
        <thead>
          <tr>
            <th className="text-left">
              <LocalizedText id={"housing_tableTitle_type"} />
            </th>
            <th className={`lg:text-center ${style.tablePlans__theadBorder}`}>
              <LocalizedText id={"housing_tableTitle_area"} />
            </th>
            <th className="lg:text-center">
              <LocalizedText id={"housing_tableTitle_residents"} />
            </th>
            <th className={`lg:text-center ${style.tablePlans__theadBorder}`}>
              <LocalizedText id={"housing_tableTitle_equipment"} />
            </th>
            <th className="lg:text-center">
              <LocalizedText id={"housing_tableTitle_price"} />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => (
            <tr key={index + " tableHousing"}>
              <td className={style.tablePlans__title + " my-1"}>Type of allocation</td>
              <td
                className={style.tablePlans__area + " lg:text-center my-1"}
                style={{ borderLeft: "1px solid #EFF3FA", borderRight: "1px solid #EFF3FA" }}
              >
                {el.square} m&sup2;
              </td>
              <td className={style.tablePlans__area + " lg:text-center my-1"}>
                {el.residents} <LocalizedText id={"housing_tableTitle_residents"} />
              </td>
              <td
                className={style.tablePlans__learnMore + " lg:text-center my-1 cursor-pointer"}
                style={{ borderLeft: "1px solid #EFF3FA", borderRight: "1px solid #EFF3FA" }}
                onClick={() => {
                  setDialogData(el.traits.namedTraits["housing-equipment"]);
                  setDialog(true);
                }}
              >
                <LocalizedText id={"housing_tableTitle_more"} />
              </td>
              <td className={style.tablePlans__area + " lg:text-center my-1"}>
                <LocalizedText id={"catalogItems_price_upto"} /> {el.price}{" "}
                <LocalizedText id={"catalogItems_price_value"} /> / <LocalizedText id={"catalogItems_price_month"} />
              </td>
              <td className={style.tablePlans__order}>
                <a href="#" className={style.button}>
                  <LocalizedText id={"housing_tableTitle_order"} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
