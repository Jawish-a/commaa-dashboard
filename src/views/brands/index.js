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

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();
  const { lang } = useLang();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await AxiosInstance.get("brand/getAll");

        setBrands(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchBrands();
  }, []);

  const deleteBrand = () => {
    setBrands((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/brand/delete"
        title={intl.formatMessage({ id: "delete brand" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteBrand}
      />
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="brands" />
          </CCardHeader>

          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link className="btn btn-primary" to="/dashboard/brands/add">
                  <FormattedMessage id="add brand" />
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
                        <FormattedMessage id="image" />
                      </th>
                      <th>
                        <FormattedMessage id="order" />
                      </th>
                      <th>
                        <FormattedMessage id="action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!brands?.length && (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {brands?.map(({ _id, brandName, image, order }) => (
                      <tr key={_id}>
                        <td>{brandName[lang]}</td>
                        <td>
                          {" "}
                          <img
                            alt=""
                            src={image?.path}
                            className="object-cover rounded"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>{order}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Link
                              className="btn btn-sm btn-warning mx-2"
                              to={`/dashboard/brands/${_id}/edit`}
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
export default BrandListPage;
