import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ContentLoader } from "src/components/loaders";
import DeleteModal from "src/components/modals/delete-modal";
import AxiosInstance from "src/utils/axios-instance";

const ShipmentsListPage = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    async function fetchMethods() {
      try {
        const { data } = await AxiosInstance.get("shipment-method");
        setMethods(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchMethods();
  }, []);

  const deleteMethod = () => {
    setMethods((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/shipment-method/delete"
        title={intl.formatMessage({ id: "delete shipment method" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteMethod}
      />
      <CCol xl={7}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="all shipment methods" />
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link className="btn btn-primary" to="/dashboard/shipments/add">
                  <FormattedMessage id="add shipment method" />
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
                        <FormattedMessage id="city" />
                      </th>
                      <th>
                        <FormattedMessage id="duration in days" />
                      </th>
                      <th>
                        <FormattedMessage id="price" />
                      </th>
                      <th>
                        <FormattedMessage id="action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!methods?.length && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}

                    {methods?.map(
                      ({ _id, shippingType, city, duration, price }) => (
                        <tr key={_id}>
                          <td>{shippingType}</td>
                          <td>{city}</td>
                          <td>{duration}</td>
                          <td>{price}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <Link
                                className="btn btn-sm btn-warning mx-2"
                                to={`/dashboard/shipments/${_id}/edit`}
                              >
                                <CIcon name="cil-pencil" />
                              </Link>
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

export default ShipmentsListPage;
