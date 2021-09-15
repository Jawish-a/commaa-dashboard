import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ContentLoader } from "src/components/loaders";
import DeleteModal from "src/components/modals/delete-modal";
import AxiosInstance from "src/utils/axios-instance";
import { useLang } from "src/utils/use-lang";

const VariantsListPage = () => {
  const [variantions, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();
  const { lang } = useLang();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await AxiosInstance.get("variant/getAll");

        setVariants(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchBrands();
  }, []);

  const deleteVariant = () => {
    setVariants((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };
  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/variant/delete"
        title={intl.formatMessage({ id: "delete variant" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteVariant}
      />
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="variants" />
          </CCardHeader>

          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link className="btn btn-primary" to="/dashboard/variants/add">
                  <FormattedMessage id="add variant" />
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
                        <FormattedMessage id="items count" />
                      </th>
                      <th>
                        <FormattedMessage id="action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!variantions?.length && (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {variantions.map(({ _id, variantName, variantValues }) => (
                      <tr key={_id}>
                        <td>{variantName[lang]}</td>
                        <td>{variantValues?.length || 0}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Link
                              className="btn btn-sm btn-warning mx-2"
                              to={`/dashboard/variants/${_id}/edit`}
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
                    ))}
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
export default VariantsListPage;
