import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="d-flex items-center">
        <div className="font-weight-bold text-primary">Commaa</div>
        <span className="ml-1">&copy; 2020 - {new Date().getFullYear()}</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
