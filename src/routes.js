import React from "react";
import { FormattedMessage } from "react-intl";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// const ViewProductPage = React.lazy(() => import("./views/products/view"));
const EditProductPage = React.lazy(() => import("./views/products/edit"));
const AddProductPage = React.lazy(() => import("./views/products/add"));
const ProductsListPage = React.lazy(() => import("./views/products"));

// const ViewCategoryPage = React.lazy(() => import("./views/categories/view"));
const EditCategoryPage = React.lazy(() => import("./views/categories/edit"));
const AddCategoryPage = React.lazy(() => import("./views/categories/add"));
const CategoriesListPage = React.lazy(() => import("./views/categories"));

const EditBrandPage = React.lazy(() => import("./views/brands/edit"));
const AddBrandPage = React.lazy(() => import("./views/brands/add"));
const BrandsListPage = React.lazy(() => import("./views/brands"));

const EditVariantPage = React.lazy(() => import("./views/variations/edit"));
const AddVariantPage = React.lazy(() => import("./views/variations/add"));
const VariantsPage = React.lazy(() => import("./views/variations"));

const EditFashionModelPage = React.lazy(() =>
  import("./views/fashion-models/edit")
);
const AddFashionModelPage = React.lazy(() =>
  import("./views/fashion-models/add")
);
const FashionModelsListPage = React.lazy(() =>
  import("./views/fashion-models")
);

const OrdersListPage = React.lazy(() => import("./views/orders"));
const EditOrderPage = React.lazy(() => import("./views/orders/edit"));

const AddCouponPage = React.lazy(() => import("./views/coupons/add"));
// const EditCouponPage = React.lazy(() => import("./views/coupons/add"));
const CouponsListPage = React.lazy(() => import("./views/coupons"));

const AddShipmentMethodPage = React.lazy(() => import("./views/shipments/add"));
const EditShipmentMethodPage = React.lazy(() =>
  import("./views/shipments/edit")
);
const ShipmentMethodsListPage = React.lazy(() => import("./views/shipments"));

const SettingsPage = React.lazy(() => import("./views/settings"));
const NotificationPage = React.lazy(() => import("./views/notification"));
const UsersListPage = React.lazy(() => import("./views/users"));

const SliderListPage = React.lazy(() => import("./views/slider"));
const AddSlidePage = React.lazy(() => import("./views/slider/add"));
const EditSlidePage = React.lazy(() => import("./views/slider/edit"));

const routes = [
  { path: "/", exact: true, name: <FormattedMessage id="home" /> },
  {
    path: "/dashboard",
    name: <FormattedMessage id="dashboard" />,
    component: Dashboard,
    exact: true,
  },

  /* Products */
  {
    path: "/dashboard/products",
    name: <FormattedMessage id="products" />,
    component: ProductsListPage,
    exact: true,
  },
  {
    path: "/dashboard/products/:id/edit",
    name: <FormattedMessage id="product details" />,
    component: EditProductPage,
    exact: true,
  },
  {
    path: "/dashboard/products/add",
    name: <FormattedMessage id="product details" />,
    component: AddProductPage,
    exact: true,
  },

  /* Categories */
  {
    path: "/dashboard/categories",
    name: <FormattedMessage id="categories" />,
    component: CategoriesListPage,
    exact: true,
  },
  {
    path: "/dashboard/categories/:id/edit",
    name: <FormattedMessage id="category details" />,
    component: EditCategoryPage,
    exact: true,
  },
  {
    path: "/dashboard/categories/add",
    name: <FormattedMessage id="category details" />,
    component: AddCategoryPage,
    exact: true,
  },
  /* Brands */
  {
    path: "/dashboard/brands",
    name: <FormattedMessage id="brands" />,
    component: BrandsListPage,
    exact: true,
  },
  {
    path: "/dashboard/brands/:id/edit",
    name: <FormattedMessage id="brand details" />,
    component: EditBrandPage,
    exact: true,
  },
  {
    path: "/dashboard/brands/add",
    name: <FormattedMessage id="brand details" />,
    component: AddBrandPage,
    exact: true,
  },
  /* Fashion Models */
  {
    path: "/dashboard/fashion-models",
    name: <FormattedMessage id="fashion models" />,
    component: FashionModelsListPage,
    exact: true,
  },
  {
    path: "/dashboard/fashion-models/:id/edit",
    name: <FormattedMessage id="fashion models details" />,
    component: EditFashionModelPage,
    exact: true,
  },
  {
    path: "/dashboard/fashion-models/add",
    name: <FormattedMessage id="fashion models details" />,
    component: AddFashionModelPage,
    exact: true,
  },
  /* Variants */
  {
    path: "/dashboard/variants",
    name: <FormattedMessage id="variants" />,
    component: VariantsPage,
    exact: true,
  },
  {
    path: "/dashboard/variants/:id/edit",
    name: <FormattedMessage id="variant details" />,
    component: EditVariantPage,
    exact: true,
  },
  {
    path: "/dashboard/variants/add",
    name: <FormattedMessage id="variant details" />,
    component: AddVariantPage,
    exact: true,
  },
  /* Orders */
  {
    path: "/dashboard/orders",
    name: <FormattedMessage id="orders" />,
    component: OrdersListPage,
    exact: true,
  },
  {
    path: "/dashboard/orders/:id/edit",
    name: <FormattedMessage id="order details" />,
    component: EditOrderPage,
    exact: true,
  },
  /* Coupons */
  {
    path: "/dashboard/coupons",
    name: <FormattedMessage id="coupons" />,
    component: CouponsListPage,
    exact: true,
  },
  // {
  //   path: "/dashboard/coupons/:id/edit",
  //   name: <FormattedMessage id="coupon details" />,
  //   component: EditCouponPage,
  //   exact: true,
  // },
  {
    path: "/dashboard/coupons/add",
    name: <FormattedMessage id="add coupon" />,
    component: AddCouponPage,
    exact: true,
  },
  /* Shipment Methods */
  {
    path: "/dashboard/shipments",
    name: <FormattedMessage id="all shipment methods" />,
    component: ShipmentMethodsListPage,
    exact: true,
  },
  {
    path: "/dashboard/shipments/:id/edit",
    name: <FormattedMessage id="shipment method details" />,
    component: EditShipmentMethodPage,
    exact: true,
  },
  {
    path: "/dashboard/shipments/add",
    name: <FormattedMessage id="shipment method details" />,
    component: AddShipmentMethodPage,
    exact: true,
  },

  /* Settings Page */
  {
    path: "/dashboard/settings",
    name: <FormattedMessage id="settings" />,
    component: SettingsPage,
    exact: true,
  },
  /* Notification Page */
  {
    path: "/dashboard/notification",
    name: <FormattedMessage id="notification" />,
    component: NotificationPage,
    exact: true,
  },
  /* Users Page */
  {
    path: "/dashboard/users",
    name: <FormattedMessage id="users" />,
    component: UsersListPage,
    exact: true,
  },
  /* Slider */
  {
    path: "/dashboard/slider",
    name: <FormattedMessage id="all slides" />,
    component: SliderListPage,
    exact: true,
  },
  {
    path: "/dashboard/slider/:id/edit",
    name: <FormattedMessage id="slide details" />,
    component: EditSlidePage,
    exact: true,
  },
  {
    path: "/dashboard/slider/add",
    name: <FormattedMessage id="slide details" />,
    component: AddSlidePage,
    exact: true,
  },
];

export default routes;
