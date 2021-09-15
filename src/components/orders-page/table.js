import CIcon from "@coreui/icons-react";
import { CBadge, CFormGroup, CLabel, CSelect } from "@coreui/react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { getStatus } from "./get-status";

const OrdersTable = ({ orders = [], perPage, setPerPage }) => {
  const intl = useIntl();

  return (
    <div className="position-relative table-responsive">
      <div className="d-flex justify-content-end">
        <div className="mb-3 ml-3">
          <CFormGroup>
            <CLabel htmlFor="type">
              <FormattedMessage id="Per Page" />
            </CLabel>
            <CSelect
              onChange={(e) => {
                setPerPage(e.currentTarget.value);
                // setType(e.currentTarget.value);
                // setValue("redirect", null);
              }}
              id="type"
              name="type"
              // invalid={!!errors.type?.message}
              // innerRef={register({
              //   required: intl.formatMessage({ id: "required field" }),
              // })}
            >
              <option selected={perPage === "10" && "selected"} value="10">
                {intl.formatMessage({ id: "10" })}
              </option>
              <option selected={perPage === "25" && "selected"} value="25">
                {intl.formatMessage({ id: "25" })}
              </option>
              <option selected={perPage === "50" && "selected"} value="50">
                {intl.formatMessage({ id: "50" })}
              </option>
              <option selected={perPage === "100" && "selected"} value="100">
                {intl.formatMessage({ id: "100" })}
              </option>
            </CSelect>
          </CFormGroup>
        </div>
      </div>
      <table className="table table-striped align-td-center text-center">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="user" />
            </th>
            <th>
              <FormattedMessage id="order date" />
            </th>
            <th>
              <FormattedMessage id="payment method" />
            </th>
            <th>
              <FormattedMessage id="total price" />
            </th>
            <th>
              <FormattedMessage id="status" />
            </th>
            <th>
              <FormattedMessage id="action" />
            </th>
          </tr>
        </thead>

        <tbody>
          {!orders?.length && (
            <tr>
              <td colSpan={6} className="text-center py-4">
                <span className="h4">
                  <FormattedMessage id="no data" />
                </span>
              </td>
            </tr>
          )}
          {orders.map(
            ({ _id, user, createDate, status, invoice, paymentMethod }) => (
              <tr key={_id} className="align-td-center">
                <td>{user?.fullName}</td>
                <td>{createDate}</td>
                <td>
                  {paymentMethod === "cod" ? (
                    <CBadge color="secondary" className="h6 mb-0">
                      Cash on Delievery
                    </CBadge>
                  ) : (
                    <CBadge color="primary" className="h6 mb-0">
                      VISA
                    </CBadge>
                  )}
                </td>
                <td>
                  {invoice?.totalWithTax} <FormattedMessage id="sar" />
                </td>
                <td>{getStatus(status)}</td>
                <td className="">
                  <div className="d-flex justify-content-center">
                    {/* <Link
                      className="btn btn-sm btn-success"
                      to={`/dashboard/products/${_id}/view`}
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </Link> */}
                    <Link
                      className="btn btn-sm btn-warning mx-2"
                      to={`/dashboard/orders/${_id}/edit`}
                    >
                      <CIcon name="cil-pencil" />
                    </Link>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
