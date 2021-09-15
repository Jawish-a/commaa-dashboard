import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";
import { useLang } from "src/utils/use-lang";
import { getStatus } from "../../components/orders-page/get-status";
import UpdateStatus from "../../components/orders-page/update-status";

const EditOrderPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [editingStatus, setEditingStatus] = useState(false);
  const params = useParams();
  const { lang } = useLang();

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await AxiosInstance.get(`/order/${params.id}`);

        setData(data);
        setStatus(data.status?.toLowerCase());
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="mt-5 text-center display-4">
        <FormattedMessage id="order not found" />
      </div>
    );

  if (loading) return <ContentLoader />;

  return (
    <div>
      <UpdateStatus
        open={editingStatus}
        setOpen={setEditingStatus}
        status={status}
        setStatus={setStatus}
      />
      <CRow>
        <CCol xl={7}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="order details" />
            </CCardHeader>
            <CCardBody>
              <ul className="m-0 list-unstyled h6 font-weight-normal">
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="order id" />:
                    </span>
                    <span>{data._id}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="total price" />:
                    </span>
                    <span>
                      {data.invoice?.totalWithTax} <FormattedMessage id="sar" />
                    </span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="payment method" />:
                    </span>
                    <span>
                      {data.paymentMethod === "Credit-Card" ? (
                        <CBadge color="secondary" className="mb-0 h6">
                          VISA
                        </CBadge>
                      ) : (
                        <CBadge color="primary" className="mb-0 h6">
                          Cash on Delievery
                        </CBadge>
                      )}
                    </span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                {/* is Gift */}
                <li>
                  <div className="d-flex align-items-center">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="Is Gift" />:
                    </span>
                    <span>
                      {data?.isGift ? (
                        <CBadge color="primary" className="mb-0 h6">
                          Gift
                        </CBadge>
                      ) : (
                        <CBadge color="secondary" className="mb-0 h6">
                          not Gift
                        </CBadge>
                      )}
                    </span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                {/* end is gift */}
                <li>
                  <div className="d-flex align-items-center">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="status" />:
                    </span>
                    <div className="d-flex justify-content-between flex-grow-1 align-items-center">
                      <span className="mb-0 h5">{getStatus(status)}</span>
                      <CButton
                        color="warning"
                        onClick={() => setEditingStatus(true)}
                      >
                        <CIcon name="cil-pencil" />
                      </CButton>
                    </div>
                  </div>
                </li>
                {data.invoice?.withCoupon && (
                  <Fragment>
                    <li>
                      <hr />
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <span className="mr-2 font-weight-bold d-block">
                          <FormattedMessage id="coupon" />:
                        </span>
                        <span>{data.invoice?.couponName}</span>
                      </div>
                    </li>
                    <li>
                      <hr />
                    </li>
                    <li>
                      <div className="d-flex align-items-center">
                        <span className="mr-2 font-weight-bold d-block">
                          <FormattedMessage id="discount" />:
                        </span>
                        <span>
                          {data.invoice?.withDiscount}{" "}
                          <FormattedMessage id="sar" />
                        </span>
                      </div>
                    </li>
                  </Fragment>
                )}
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={5}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="user" />
            </CCardHeader>
            <CCardBody>
              <ul className="m-0 list-unstyled h6 font-weight-normal">
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="user id" />:
                    </span>
                    <span>{data.user._id}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="name" />:
                    </span>
                    <span>{data.user.fullName}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="email" />:
                    </span>
                    <span>{data.user.email}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="phone" />:
                    </span>
                    <span>+{data.user.phoneNumber}</span>
                  </div>
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xl={7}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="shipment details" />
            </CCardHeader>
            <CCardBody>
              <ul className="m-0 list-unstyled h6 font-weight-normal">
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="shipment method" />:
                    </span>
                    <span>{data.shippingMethod?.shippingType}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="shipment method id" />:
                    </span>
                    <span>{data.shippingMethod?._id}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="price" />:
                    </span>
                    <span>
                      {data.shippingMethod?.price} <FormattedMessage id="sar" />
                    </span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="city" />:
                    </span>
                    <span>{data.address?.city}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li className="mb-2">
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="address" />:
                    </span>
                    <span>{data.address?.addr1}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="neighborhood" />:
                    </span>
                    <span>{data.address?.neighborhood}</span>
                  </div>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <div className="d-flex">
                    <span className="mr-2 font-weight-bold d-block">
                      <FormattedMessage id="description" />:
                    </span>
                    <span>{data.address?.description}</span>
                  </div>
                </li>
              </ul>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="products" />
            </CCardHeader>
            <CCardBody>
              <div className="position-relative table-responsive">
                <table className="table text-center table-striped align-td-center">
                  <thead>
                    <tr className="text-center">
                      <th>
                        <CIcon name="cil-tags" />
                      </th>
                      <th>
                        <FormattedMessage id="name" />
                      </th>
                      <th>
                        <FormattedMessage id="quantity" />
                      </th>
                      <th>
                        <FormattedMessage id="price" />
                      </th>
                      <th>
                        <FormattedMessage id="thumbnail" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* originalProduct is immutable */}
                    {data.products.map(
                      ({ orginalProduct, qtyOfProduct, variant }, idx) => {
                        const {
                          // _id,
                          serialNumber,
                          price,
                          thumbnail,
                          productName,
                        } = orginalProduct || {};

                        return (
                          <tr key={idx}>
                            <td>{serialNumber}</td>
                            <td>
                              <div>{productName?.[lang]}</div>
                              <div className="d-inline-flex align-items-center">
                                (
                                {variant?.variants.map(
                                  ({ variantValue }, idx) => (
                                    <div
                                      className="mx-1 d-inline-block"
                                      key={idx}
                                    >
                                      {variantValue?.trim().startsWith("#") ? (
                                        <div
                                          className="rounded-circle"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: variantValue,
                                          }}
                                        ></div>
                                      ) : (
                                        <span>{variantValue}</span>
                                      )}
                                    </div>
                                  )
                                )}
                                )
                              </div>
                            </td>
                            <td>{qtyOfProduct}</td>
                            <td>
                              {price}
                              <FormattedMessage id="sar" />
                            </td>
                            <td>
                              <img
                                alt=""
                                src={thumbnail?.path}
                                className="object-cover rounded"
                                width={50}
                                height={50}
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};
export default EditOrderPage;
