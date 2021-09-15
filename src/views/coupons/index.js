import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow,
  CSwitch,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { ContentLoader } from "src/components/loaders";
import DeleteModal from "src/components/modals/delete-modal";
import AxiosInstance from "src/utils/axios-instance";
// import { useLang } from "src/utils/use-lang";

const CouponsListPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();
  //   const { lang } = useLang();

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const { data } = await AxiosInstance.get("coupon");

        setCoupons(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchCoupons();
  }, []);

  const deleteCoupon = () => {
    setCoupons((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  const updateStatus = async (status, id, index) => {
    try {
      await AxiosInstance.put(`/coupon/updateCouponStatus`, {
        status,
        id,
      });

      const clone = [...coupons];
      clone[index].status = status;

      setCoupons(clone);
    } catch (error) {}
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/coupon/delete"
        title={intl.formatMessage({ id: "delete coupon" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteCoupon}
      />
      <CCol xl={7}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="coupons" />
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link className="btn btn-primary" to="/dashboard/coupons/add">
                  <FormattedMessage id="add coupon" />
                </Link>
              </div>
            </div>

            {loading ? (
              <ContentLoader />
            ) : (
              <div className="position-relative table-responsive">
                <table className="table table-striped align-td-center text-center">
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="name" />
                      </th>
                      <th>
                        <FormattedMessage id="discount" />
                      </th>
                      <th>
                        <FormattedMessage id="type" />
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
                    {!coupons?.length && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {coupons.map(
                      ({ _id, couponName, discount, type, status }, idx) => (
                        <tr key={_id}>
                          <td>{couponName}</td>
                          <td>{discount}</td>
                          <td>
                            {type === "percent" ? (
                              <FormattedMessage id="percentage" />
                            ) : (
                              <FormattedMessage id="amount" />
                            )}
                          </td>
                          <td>
                            {status ? (
                              <FormattedMessage id="active" />
                            ) : (
                              <FormattedMessage id="inactive" />
                            )}
                          </td>
                          <td>
                            <div className="d-flex justify-content-center">
                              {/* <Link
                                className="btn btn-sm btn-warning mx-2"
                                to={`/dashboard/coupons/${_id}/edit`}
                              >
                                <CIcon name="cil-pencil" />
                              </Link> */}
                              <div className="d-flex align-items-center">
                                <CLabel>
                                  <FormattedMessage id="active" />
                                </CLabel>
                                <CSwitch
                                  onChange={(e) =>
                                    updateStatus(
                                      e.currentTarget.checked,
                                      _id,
                                      idx
                                    )
                                  }
                                  defaultChecked={status}
                                  color="success"
                                  className="mx-4"
                                  size="lg"
                                />
                              </div>
                              <CButton
                                color="danger"
                                size="sm"
                                onClick={() => setDeleting(_id)}
                              >
                                <CIcon name="cil-trash" />
                              </CButton>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CouponsListPage;
