import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Loader from "react-loader-spinner";
import AxiosInstance from "../../utils/axios-instance";

const DeleteModal = ({
  id,
  endPoint,
  onDelete,
  open,
  closeModal,
  title,
  description,
  query,
}) => {
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);

    try {
      await AxiosInstance.delete(
        `${endPoint}/${id}${query ? `?${query}` : ""}`
      );
      onDelete?.(id);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <CModal
      onClose={closeModal}
      show={open}
      closeOnBackdrop={!loading}
      centered
      size="lg"
    >
      <CModalHeader>
        <span className="h3">{title}</span>
      </CModalHeader>
      <CModalBody>
        <span className="text-danger h5">{description}</span>
      </CModalBody>
      <CModalFooter>
        <div className="d-flex align-items-center">
          <CButton
            color="secondary"
            className="mx-2"
            onClick={closeModal}
            disabled={loading}
          >
            <FormattedMessage id="cancel" />
          </CButton>
          <CButton color="danger" onClick={deleteHandler} disabled={loading}>
            {loading ? (
              <Loader type="TailSpin" width={15} height={15} color="white" />
            ) : (
              <FormattedMessage id="confirm" />
            )}
          </CButton>
        </div>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteModal;
