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

const SliderListPage = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data } = await AxiosInstance.get("slider");

        setSlides(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchSlides();
  }, []);

  const deleteSlide = () => {
    setSlides((prev) => prev.filter(({ _id }) => _id !== deleting));
    setDeleting(null);
  };

  return (
    <CRow>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/slider"
        title={intl.formatMessage({ id: "delete slide" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteSlide}
      />
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="slides" />
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-end">
              <div className="mb-3">
                <Link className="btn btn-primary" to="/dashboard/slider/add">
                  <FormattedMessage id="add slide" />
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
                    {!slides?.length && (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          <span className="h4">
                            <FormattedMessage id="no data" />
                          </span>
                        </td>
                      </tr>
                    )}
                    {slides?.map(({ _id, type, path }) => (
                      <tr key={_id}>
                        <td>{intl.formatMessage({ id: type })}</td>
                        <td>
                          <img
                            alt=""
                            src={path}
                            className="object-cover rounded"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
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
export default SliderListPage;
