import React, { useState } from "react";
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
import cn from "classnames";
import CIcon from "@coreui/icons-react";
import Loader from "react-loader-spinner";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import DeleteModal from "../modals/delete-modal";
import { useHistory } from "react-router";
import AxiosInstance from "../../utils/axios-instance";
import { toast } from "react-toastify";
import { ContentLoader } from "../loaders";

const EditAddFashionModelForm = ({ isEditForm, loading, data = {} }) => {
  const { register, errors, handleSubmit } = useForm();
  const [submitLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const history = useHistory();
  const intl = useIntl();

  const submitHandler = async (values) => {
    setLoading(true);
    try {
      if (isEditForm) {
        await AxiosInstance.put(`/fashion-model/update/${data._id}`, values);
        toast.success(intl.formatMessage({ id: "item updated" }));
      } else {
        const {
          data: { _id },
        } = await AxiosInstance.post(`/fashion-model/create`, values);

        toast.success(intl.formatMessage({ id: "item added" }));
        history.replace(`/dashboard/fashion-models/${_id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <DeleteModal
            open={!!deleting}
            id={deleting}
            endPoint="/brand/delete"
            title={intl.formatMessage({ id: "delete brand" })}
            description={intl.formatMessage({ id: "delete content warning" })}
            closeModal={() => setDeleting(null)}
            onDelete={() => history.replace("/dashboard/brands")}
          />
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
                      name="modelName"
                      defaultValue={data?.modelName}
                      invalid={!!errors.modelName?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>
                      {errors.modelName?.message}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup className="mb-5">
                    <CLabel htmlFor="wear">
                      * <FormattedMessage id="model wear" />
                    </CLabel>
                    <CInput
                      id="wear"
                      type="text"
                      name="modelWear"
                      defaultValue={data?.modelWear}
                      invalid={!!errors.modelWear?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>
                      {errors.modelWear?.message}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup className="mb-5">
                    <CLabel htmlFor="height">
                      * <FormattedMessage id="height" />
                    </CLabel>
                    <CInput
                      id="height"
                      type="text"
                      name="height"
                      defaultValue={data?.height}
                      invalid={!!errors.height?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>
                      {errors.height?.message}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup className="mb-5">
                    <CLabel htmlFor="waist">
                      * <FormattedMessage id="waist" />
                    </CLabel>
                    <CInput
                      id="waist"
                      type="text"
                      name="waist"
                      defaultValue={data?.waist}
                      invalid={!!errors.waist?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>{errors.waist?.message}</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup className="mb-5">
                    <CLabel htmlFor="hips">
                      * <FormattedMessage id="hips" />
                    </CLabel>
                    <CInput
                      id="hips"
                      type="text"
                      name="hips"
                      defaultValue={data?.hips}
                      invalid={!!errors.hips?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>{errors.hips?.message}</CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup className="mb-5">
                    <CLabel htmlFor="bust">
                      * <FormattedMessage id="bust" />
                    </CLabel>
                    <CInput
                      id="bust"
                      type="text"
                      name="bust"
                      defaultValue={data?.bust}
                      invalid={!!errors.bust?.message}
                      innerRef={register({
                        required: intl.formatMessage({ id: "required field" }),
                      })}
                    />
                    <CInvalidFeedback>{errors.bust?.message}</CInvalidFeedback>
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

export default EditAddFashionModelForm;
