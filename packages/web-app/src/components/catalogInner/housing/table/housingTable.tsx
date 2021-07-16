import React, { FC } from "react";
import style from "./housingTable.module.css";

export const HousingTable = () => {
  return (
    <table className={`${style.tablePlans} mt-10 `}>
      <thead>
        <tr>
          <th className="text-left">Placement type</th>
          <th className="lg:text-center">Area</th>
          <th className="lg:text-center">Equipment</th>
          <th className="lg:text-center">Price</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={style.tablePlans__title}>Studio</td>
          <td className={style.tablePlans__area + " lg:text-center"} data-name="Area">
            from&nbsp;20&nbsp;m2
          </td>
          <td className={style.tablePlans__learnMore + " lg:text-center"}>
            <a href="#" data-modal-equipments="modal-equipments" data-catalog-object-placement-id="860">
              More details
            </a>
          </td>
          <td className={style.tablePlans__price + " lg:text-center"} data-name="Price">
            <span>from 483.00 €</span> / month
          </td>
          <td className={style.tablePlans__order}>
            <a
              href="#"
              data-user-request-bind-url="/en/userrequest/gettemplate?type=OrderPlacement&amp;catalogObjectId=241&amp;catalogObjectPlacementId=860&amp;price=483"
              className={style.button}
            >
              Create order
            </a>
          </td>
        </tr>
        <tr>
          <td className={style.tablePlans__title}>Studio</td>
          <td className={style.tablePlans__area + " lg:text-center"} data-name="Area">
            from&nbsp;20&nbsp;m2
          </td>
          <td className={style.tablePlans__learnMore + " lg:text-center"}>
            <a href="#" data-modal-equipments="modal-equipments" data-catalog-object-placement-id="860">
              More details
            </a>
          </td>
          <td className={style.tablePlans__price + " lg:text-center"} data-name="Price">
            <span>from 483.00 €</span> / month
          </td>
          <td className={style.tablePlans__order}>
            <a
              href="#"
              data-user-request-bind-url="/en/userrequest/gettemplate?type=OrderPlacement&amp;catalogObjectId=241&amp;catalogObjectPlacementId=860&amp;price=483"
              className={style.button}
            >
              Create order
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
