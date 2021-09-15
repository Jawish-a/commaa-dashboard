import React, { useMemo, useState } from "react";
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
  CSelect,
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

const EditAddVariantForm = ({ isEditForm, data = {} }) => {
  /* Since backend is giving an id for variant values, had to fake the id for removing and addition */
  const variantsArrayMemo = useMemo(() => {
    return (
      data.variantValues?.map((value, idx) => ({
        _id: idx,
        value,
      })) || []
    );
  }, [data.variantValues]);

  const { register, unregister, errors, handleSubmit } = useForm();
  const [variants, setVariants] = useState(variantsArrayMemo);
  /* For now, (tetx | color) only */
  const [inputType, setType] = useState(data.type || "text");
  const [submitLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const history = useHistory();
  const intl = useIntl();

  const submitHandler = async (values) => {
    values.type = inputType;
    setLoading(true);
    try {
      if (isEditForm) {
        await AxiosInstance.put(`/variant/update/${data._id}`, values);
        toast.success(intl.formatMessage({ id: "variant updated" }));
      } else {
        const {
          data: { _id },
        } = await AxiosInstance.post(`/variant/create`, values);
        toast.success(intl.formatMessage({ id: "variant added" }));
        history.replace(`/dashboard/variants/${_id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addVariant = () =>
    setVariants((prev) => [
      ...prev,
      {
        _id: new Date().getTime(),
      },
    ]);

  const removeVariant = (id, idx) => {
    const clone = [...variants];
    setVariants(clone.filter(({ _id }) => id !== _id));
    unregister(`variantValues[${idx}]`);
  };

  return (
    <CRow>
      <CCol xl={7} lg={8}>
        <CCard>
          <DeleteModal
            open={!!deleting}
            id={deleting}
            endPoint="/variant/delete"
            title={intl.formatMessage({ id: "delete variant" })}
            description={intl.formatMessage({ id: "delete content warning" })}
            closeModal={() => setDeleting(null)}
            onDelete={() => history.replace("/dashboard/variants")}
          />
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <CCardBody>
              <div>
                <CFormGroup>
                  <CLabel htmlFor="name-ar">
                    * <FormattedMessage id="name ar" />
                  </CLabel>
                  <CInput
                    id="name-ar"
                    type="text"
                    name="variantName[ar]"
                    defaultValue={data?.variantName?.ar}
                    invalid={!!errors.variantName?.ar?.message}
                    innerRef={register({
                      required: intl.formatMessage({ id: "required field" }),
                    })}
                  />
                  <CInvalidFeedback>
                    {errors.variantName?.ar?.message}
                  </CInvalidFeedback>
                </CFormGroup>
                {/* English Name */}

                <CFormGroup className="mb-5">
                  <CLabel htmlFor="name-en">
                    * <FormattedMessage id="name en" />
                  </CLabel>
                  <CInput
                    id="name-en"
                    type="text"
                    name="variantName[en]"
                    defaultValue={data?.variantName?.en}
                    invalid={!!errors.variantName?.en?.message}
                    innerRef={register({
                      required: intl.formatMessage({ id: "required field" }),
                    })}
                  />
                  <CInvalidFeedback>
                    {errors.variantName?.en?.message}
                  </CInvalidFeedback>
                </CFormGroup>
                <hr />

                <CRow>
                  <CCol xl={8}>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="d-block">
                        <FormattedMessage id="variant values" />
                      </span>
                      <CButton onClick={addVariant} color="primary">
                        <FormattedMessage id="add more" />
                      </CButton>
                    </div>
                    <div>
                      <CFormGroup>
                        <CLabel htmlFor="variantType">
                          <FormattedMessage id="variant type" />
                        </CLabel>
                        <CSelect
                          defaultValue={inputType}
                          onChange={(e) => setType(e.currentTarget.value)}
                        >
                          <option value="text">
                            {intl.formatMessage({ id: "value" })}
                          </option>
                          <option value="color">
                            {intl.formatMessage({ id: "color" })}
                          </option>
                          <option value="radio">
                            {intl.formatMessage({ id: "radio" })}
                          </option>
                        </CSelect>
                      </CFormGroup>
                    </div>
                    <div className="position-relative table-responsive">
                      <table className="table table-striped align-td-center">
                        <thead>
                          <tr className="text-center">
                            <th>
                              <FormattedMessage id="name" />
                            </th>
                            <th>
                              <FormattedMessage id="action" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {!variants.length && (
                            <tr>
                              <td colSpan={2} className="text-center py-4">
                                <span className="h4">
                                  <FormattedMessage id="no data" />
                                </span>
                              </td>
                            </tr>
                          )}
                          {variants.map(({ _id, value }, idx) => (
                            <tr className="text-center" key={_id}>
                              <td>
                                <CFormGroup className="mb-0">
                                  <CInput
                                    type={inputType}
                                    inputMode="text"
                                    defaultValue={value}
                                    name={`variantValues[${idx}]`}
                                    invalid={
                                      !!errors["variantValues"]?.[idx]?.message
                                    }
                                    innerRef={register({
                                      required: intl.formatMessage({
                                        id: "required field",
                                      }),
                                    })}
                                    style={{ minWidth: 75 }}
                                  />
                                  <CInvalidFeedback>
                                    {errors["variantValues"]?.[idx]?.message}
                                  </CInvalidFeedback>
                                </CFormGroup>
                              </td>
                              <td style={{ minWidth: 150 }}>
                                <CButton
                                  color="danger"
                                  onClick={() => removeVariant(_id, idx)}
                                >
                                  <CIcon name="cil-trash" />
                                </CButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CCol>
                </CRow>
              </div>
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

export default EditAddVariantForm;
