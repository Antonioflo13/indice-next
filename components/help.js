import React, { useState, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Icons from "../data/icons";
import Label from "./label";
import ModalsIcons from "./modalsIcons";
import SharedStateContext from "./shared-state-context";

const Help = () => {
  const intl = useIntl();
  const { setContactShown } = useContext(SharedStateContext);
  const [show, setShown] = useState(false);
  const [selectSingleIcon, setSelectSingleIcon] = useState();
  const whatappIcon = Icons(intl).find(x => x.id === 2);
  return (
    <>
      <div className="w-full flex flex-col items-start md:items-end md:text-right">
        <p className="text-xs whitespace-pre-line">
          <FormattedMessage id="faq.concierge" />
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            onClick={() => {
              setShown(true);
              setSelectSingleIcon(whatappIcon);
            }}
          >
            <Label>
              <FormattedMessage id="whatsapp" />
            </Label>
          </div>
          <Label onClick={() => setContactShown(true)}>
            <FormattedMessage id="contact_us" />
          </Label>
        </div>
      </div>
      {show && (
        <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
      )}
    </>
  );
};

export default Help;
