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

const CategoriesListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();
  const { lang } = useLang();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await AxiosInstance.get("category/getAll");

        setCategories(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchCategories();
  }, []);

  const deleteCategory = () => {
    setCategories((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/category/delete"
        title={intl.formatMessage({ id: "delete category" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteCategory}
      />
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="categories" />
          </CCardHeader>

          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link
                  className="btn btn-primary"
                  to="/dashboard/categories/add"
                >
                  <FormattedMessage id="add category" />
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
                        <FormattedMessage id="action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!categories?.length && (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {categories?.map(({ _id, categoryName, image }) => (
                      <tr key={_id}>
                        <td>{categoryName[lang]}</td>
                        <td>
                          <img
                            alt=""
                            src={image?.path}
                            className="object-cover rounded"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Link
                              className="btn btn-sm btn-warning mx-2"
                              to={`/dashboard/categories/${_id}/edit`}
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
export default CategoriesListPage;
