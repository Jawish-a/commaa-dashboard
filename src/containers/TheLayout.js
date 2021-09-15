import { CContainer } from "@coreui/react";
import React from "react";
import { TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = ({ children }) => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <CContainer fluid>
            <div className="c-main">{children}</div>
          </CContainer>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
