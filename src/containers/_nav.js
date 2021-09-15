import React from "react";
import CIcon from "@coreui/icons-react";
import { FormattedMessage } from "react-intl";
import { freeSet } from "@coreui/icons";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  /* USERS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="users" />,
    route: "/dashboard/users",
    icon: {
      content: freeSet["cilGroup"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all users" />,
        to: "/dashboard/users",
      },
    ],
  },

  /* ORDERS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="orders" />,
    route: "/dashboard/orders",
    icon: {
      content: freeSet["cilCart"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all orders" />,
        to: "/dashboard/orders",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: <FormattedMessage id="add order" />,
      //   to: "/dashboard/orders/add",
      // },
    ],
  },
  /* COUPONS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="coupons" />,
    route: "/dashboard/coupons",
    icon: {
      content: freeSet["cilMoney"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all coupons" />,
        to: "/dashboard/coupons",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add coupon" />,
        to: "/dashboard/coupons/add",
      },
    ],
  },
  /* SLIDER MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="slider" />,
    route: "/dashboard/slider",
    icon: {
      content: freeSet["cilImage"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all slides" />,
        to: "/dashboard/slider",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add slide" />,
        to: "/dashboard/slider/add",
      },
    ],
  },

  /* PRODUCTS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="categories" />,
    route: "/dashboard/categories",
    icon: {
      content: freeSet["cilTags"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all categories" />,
        to: "/dashboard/categories",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add category" />,
        to: "/dashboard/categories/add",
      },
    ],
  },
  /* BRANDS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="brands" />,
    route: "/dashboard/brands",
    icon: {
      content: freeSet["cilStar"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all brands" />,
        to: "/dashboard/brands",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add brand" />,
        to: "/dashboard/brands/add",
      },
    ],
  },
  /* PRODUCTS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="products" />,
    route: "/dashboard/products",
    icon: {
      content: freeSet["cilTags"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all products" />,
        to: "/dashboard/products",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add product" />,
        to: "/dashboard/products/add",
      },
    ],
  },
  /* FASHION MODEL MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="fashion models" />,
    route: "/dashboard/fashion-models",
    icon: {
      content: freeSet["cilUserFemale"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all fashion models" />,
        to: "/dashboard/fashion-models",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add fashion model" />,
        to: "/dashboard/fashion-models/add",
      },
    ],
  },
  /* VARIANTS MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="variants" />,
    route: "/dashboard/variants",
    icon: {
      content: freeSet["cilSitemap"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all variants" />,
        to: "/dashboard/variants",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add variant" />,
        to: "/dashboard/variants/add",
      },
    ],
  },
  /* SHIPMENT MENU */
  {
    _tag: "CSidebarNavDropdown",
    name: <FormattedMessage id="shipments" />,
    route: "/dashboard/shipments",
    icon: {
      content: freeSet["cilTruck"],
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="all shipment methods" />,
        to: "/dashboard/shipments",
      },
      {
        _tag: "CSidebarNavItem",
        name: <FormattedMessage id="add shipment method" />,
        to: "/dashboard/shipments/add",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: <FormattedMessage id="settings" />,
    to: "/dashboard/settings",
    icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: <FormattedMessage id="Notification" />,
    to: "/dashboard/notification",
    icon: <CIcon name="cil-send" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
