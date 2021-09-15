import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import Loader from "react-loader-spinner";
import CIcon from "@coreui/icons-react";
import { FormattedMessage, useIntl } from "react-intl";
import { useState } from "react";
import DeleteModal from "../modals/delete-modal";
import { useHistory } from "react-router";
import AxiosInstance from "src/utils/axios-instance";
import { toast } from "react-toastify";
import { ContentLoader } from "../loaders";
const EditAddShipmentMethodForm = ({ data, isEditForm, loading }) => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: { ...data },
  });
  const [submitLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const history = useHistory();
  const intl = useIntl();

  const submitHandler = async (values) => {
    setLoading(true);
    try {
      if (isEditForm) {
        await AxiosInstance.put(`/shipment-method/update/${data._id}`, values);
        toast.success(intl.formatMessage({ id: "category updated" }));
      } else {
        const {
          data: { _id },
        } = await AxiosInstance.post(`/shipment-method`, values);
        toast.success(intl.formatMessage({ id: "category added" }));
        history.replace(`/dashboard/shipments/${_id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
        onDelete={() => history.replace("/dashboard/shipments")}
      />
      <CCol xl={6}>
        <CCard>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <CCardBody>
              {loading ? (
                <ContentLoader />
              ) : (
                <div>
                  <CFormGroup>
                    <CLabel htmlFor="name">
                      * <FormattedMessage id="name" />
                    </CLabel>
                    <CInput
                      id="name"
                      type="text"
                      name="shippingType"
                      defaultValue={data?.shippingType}
                      invalid={!!errors.shippingType}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>
                      {errors.shippingType?.message}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="city">
                      * <FormattedMessage id="city" />
                    </CLabel>
                    <CInput
                      id="city"
                      type="text"
                      name="city"
                      defaultValue={data?.city}
                      invalid={!!errors.city}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>{errors.city?.message}</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="duration">
                      * <FormattedMessage id="duration in days" />
                    </CLabel>
                    <CInput
                      id="duration"
                      type="text"
                      name="duration"
                      defaultValue={data?.duration}
                      invalid={!!errors.duration}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>
                      {errors.duration?.message}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="price">
                      * <FormattedMessage id="price" /> (
                      <FormattedMessage id="sar" />)
                    </CLabel>
                    <CInput
                      id="price"
                      type="number"
                      inputMode="numeric"
                      name="price"
                      defaultValue={data?.price}
                      invalid={!!errors.price}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>{errors.price?.message}</CInvalidFeedback>
                  </CFormGroup>
                </div>
              )}
            </CCardBody>

            <CCardFooter>
              <div
                className={cn(
                  "d-flex",
                  data?._id ? "justify-content-between" : "justify-content-end"
                )}
              >
                {data?._id && (
                  <CButton
                    color="danger"
                    className="px-4"
                    onClick={() => setDeleting(data._id)}
                  >
                    <CIcon name="cil-trash" />
                  </CButton>
                )}
                <CButton disabled={submitLoading} color="primary" type="submit">
                  {submitLoading ? (
                    <Loader
                      type="TailSpin"
                      width={15}
                      height={15}
                      color="white"
                    />
                  ) : (
                    <FormattedMessage id="save" />
                  )}
                </CButton>
              </div>
            </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default EditAddShipmentMethodForm;
