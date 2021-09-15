import {
  CButton,
  CFormGroup,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CSelect,
} from "@coreui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";
import AxiosInstance from "src/utils/axios-instance";

const options = [
  "pending",
  "rejected",
  "cancelled",
  "delivered",
  "approved",
  "delivering",
];

const UpdateStatus = ({ open, setOpen, status, setStatus }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const intl = useIntl();
  const params = useParams();

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      await AxiosInstance.put(`order/${params.id}`, data);
    } catch (error) {}
    setStatus(data.status);
    setLoading(false);
    setOpen(false);
  };

  return (
    <CModal
      centered
      show={open}
      closeOnBackdrop={!loading}
      onClose={() => setOpen(false)}
    >
      <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
        <CModalBody>
          <CFormGroup className="mb-3">
            <CLabel
              htmlFor="update-status"
              className="font-weight-bold h5 mb-3"
            >
              <FormattedMessage id="status" />
            </CLabel>
            <CSelect
              defaultValue={status}
              id="update-status"
              innerRef={register}
              name="status"
            >
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {intl.formatMessage({ id: opt })}
                </option>
              ))}
            </CSelect>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <div>
            <CButton
              disabled={loading}
              onClick={() => setOpen(false)}
              type="button"
              color="secondary"
              className="mr-2"
            >
              <FormattedMessage id="cancel" />
            </CButton>
            <CButton disabled={loading} type="submit" color="primary">
              {loading ? (
                <Loader type="TailSpin" width={15} height={15} color="white" />
              ) : (
                <FormattedMessage id="save" />
              )}
            </CButton>
          </div>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default UpdateStatus;
