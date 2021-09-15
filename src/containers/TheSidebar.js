import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CButton,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";
import LocaleSwitcher from "src/components/locale-switcher";
import { FormattedMessage } from "react-intl";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <span className="font-weight-bold h4 text-secondary mb-0">COMMAA</span>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />

        <CSidebarNavItem className="m-4">
          <LocaleSwitcher />
        </CSidebarNavItem>
        <CSidebarNavItem className="m-4">
          <CButton
            color="danger"
            className="d-block"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <FormattedMessage id="logout" />
          </CButton>
        </CSidebarNavItem>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
