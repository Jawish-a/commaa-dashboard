import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useForm } from "react-hook-form";
import AxiosInstance from "../../../utils/axios-instance";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import LocaleSwitcher from "src/components/locale-switcher";

const Login = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const submitForm = async (values) => {
    setLoading(true);
    try {
      const { data } = await AxiosInstance.post("/auth/login", values);
      const { token, user } = data;

      if (!user.isAdmin) {
        setInvalid("Invalid credentials");
        return;
      }
      localStorage.setItem("token", token);
      dispatch({ type: "set", user: { token, user } });
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      if (error?.response?.data?.message)
        setInvalid(error.response.data.message);
    }
  };
  /* wa.ez1995@gmail.com */
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <div className="d-flex justify-content-end">
                    <LocaleSwitcher autoWidth />
                  </div>
                  <CForm
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    {invalid && <p className="text-danger">{invalid}</p>}
                    <h1>
                      <FormattedMessage id="login" />
                    </h1>
                    <p className="text-muted">
                      <FormattedMessage id="login subtitle" />
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        name="email"
                        invalid={!!errors?.email}
                        innerRef={register({
                          required: intl.formatMessage({
                            id: "required field",
                          }),
                        })}
                      />
                      <CInvalidFeedback>
                        {errors.email?.message}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="none"
                        name="password"
                        invalid={!!errors?.password}
                        innerRef={register({
                          required: intl.formatMessage({
                            id: "required field",
                          }),
                        })}
                      />
                      <CInvalidFeedback>
                        {errors.password?.message}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          disabled={loading}
                          type="submit"
                          color="primary"
                          className="px-4"
                        >
                          <FormattedMessage id="login" />
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
