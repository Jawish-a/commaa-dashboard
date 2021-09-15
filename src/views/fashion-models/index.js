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

const FashionModelsListPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [models, setModels] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    async function fetchModels() {
      try {
        const { data } = await AxiosInstance.get("fashion-model/getAll");
        setModels(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchModels();
  }, []);

  const deleteModel = () => {
    setModels((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/fashion-model/delete"
        title={intl.formatMessage({ id: "delete model" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteModel}
      />
      <CCol xl={10}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="fashion models" />
          </CCardHeader>

          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link
                  className="btn btn-primary"
                  to="/dashboard/fashion-models/add"
                >
                  <FormattedMessage id="add fashion model" />
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
                        <FormattedMessage id="model wear" />
                      </th>
                      <th>
                        <FormattedMessage id="height" />
                      </th>
                      <th>
                        <FormattedMessage id="hips" />
                      </th>
                      <th>
                        <FormattedMessage id="waist" />
                      </th>
                      <th>
                        <FormattedMessage id="bust" />
                      </th>
                      <th>
                        <FormattedMessage id="action" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!models?.length && (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {models?.map(
                      ({
                        _id,
                        modelName,
                        modelWear,
                        height,
                        hips,
                        bust,
                        waist,
                      }) => (
                        <tr key={_id}>
                          <td>{modelName}</td>
                          <td>{modelWear}</td>
                          <td>{height}</td>
                          <td>{hips}</td>
                          <td>{waist}</td>
                          <td>{bust}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <Link
                                className="btn btn-sm btn-warning mx-2"
                                to={`/dashboard/fashion-models/${_id}/edit`}
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

export default FashionModelsListPage;
