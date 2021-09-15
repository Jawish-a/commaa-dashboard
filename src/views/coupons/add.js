import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInvalidFeedback,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import AxiosInstance from "src/utils/axios-instance";

const AddCouponPage = () => {
  const { register, errors, handleSubmit } = useForm();
  const [submitLoading, setLoading] = useState(false);
  const history = useHistory();
  const intl = useIntl();

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      await AxiosInstance.post("/coupon", data);
      history.replace("/dashboard/coupons");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <CRow>
      <CCol xl={5} lg={7}>
        <CCard>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="name">
                  <FormattedMessage id="name" />
                </CLabel>
                <CInput
                  id="name"
                  name="couponName"
                  invalid={!!errors.couponName}
                  innerRef={register({
                    required: intl.formatMessage({ id: "required field" }),
                  })}
                />
                <CInvalidFeedback>
                  {errors.couponName?.message}
                </CInvalidFeedback>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="discount">
                  <FormattedMessage id="discount" />
                </CLabel>
                <CInput
                  id="discount"
                  name="discount"
                  type="number"
                  inputMode="numeric"
                  defaultValue={0}
                  invalid={!!errors.discount}
                  innerRef={register({
                    validate: (value) =>
                      value > 0 || intl.formatMessage({ id: "required field" }),
                  })}
                />
                <CInvalidFeedback>{errors.discount?.message}</CInvalidFeedback>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="type">
                  <FormattedMessage id="type" />
                </CLabel>
                <CSelect
                  id="type"
                  name="type"
                  defaultValue="fixed"
                  invalid={!!errors.type}
                  innerRef={register}
                >
                  <option value="fixed">
                    {intl.formatMessage({ id: "amount" })}
                  </option>
                  <option value="percent">
                    {intl.formatMessage({ id: "percentage" })}
                  </option>
                </CSelect>
                <CInvalidFeedback>{errors.type?.message}</CInvalidFeedback>
              </CFormGroup>

              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  id="status"
                  label="ss"
                  custom
                  innerRef={register}
                  name="status"
                  defaultChecked={true}
                />
                <CLabel variant="custom-checkbox" htmlFor="status">
                  <FormattedMessage id="status" />
                </CLabel>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <div className="d-flex justify-content-end">
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

export default AddCouponPage;
