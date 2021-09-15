import { CBadge } from "@coreui/react";
import { FormattedMessage } from "react-intl";

export const getStatus = (status = "") => {
  switch (status.toLowerCase().trim()) {
    case "pending":
      return (
        <CBadge color="warning">
          <FormattedMessage id="pending" />
        </CBadge>
      );
    case "approved":
      return (
        <CBadge color="success">
          <FormattedMessage id="approved" />
        </CBadge>
      );
    case "cancelled":
      return (
        <CBadge color="danger">
          <FormattedMessage id="cancelled" />
        </CBadge>
      );
    case "rejected":
      return (
        <CBadge color="danger">
          <FormattedMessage id="rejected" />
        </CBadge>
      );
    case "delivered":
      return (
        <CBadge color="info">
          <FormattedMessage id="delivered" />
        </CBadge>
      );
    case "delivering":
      return (
        <CBadge color="primary">
          <FormattedMessage id="delivering" />
        </CBadge>
      );

    default:
      return null;
  }
};
