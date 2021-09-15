import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [settings, setSettings] = useState([]);
  const { handleSubmit, register } = useForm();
  const intl = useIntl();

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await AxiosInstance.get("settings");
        setSettings(data);
      } catch (error) {}

      setLoading(false);
    }

    fetchSettings();
  }, []);

  const submitHandler = async ({ vat, version, cod, giftPrice }) => {
    try {
      setSubmitLoading(true);
      await AxiosInstance.post("settings", {
        vat: Number(vat),
        version,
        cod: Number(cod),
        giftPrice: Number(giftPrice),
      });
      toast.success(intl.formatMessage({ id: "settings updated" }));
    } catch (error) {}
    setSubmitLoading(false);
  };

  if (loading) return <ContentLoader />;

  /* TODO: make it dynamic */
  // TODO: make it dynamic
  const { vat, version, cod, giftPrice } = settings?.[0] || {};

  return (
    <CRow>
      <CCol xl={7}>
        <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="settings" />
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="vat">
                  <FormattedMessage id="vat" />
                  <span
                    className="text-sm ml-2 text-danger"
                    style={{ fontSize: 12 }}
                  >
                    (
                    <FormattedMessage id="settings vat hint" /> )
                  </span>
                </CLabel>
                <CInput
                  defaultValue={vat}
                  type="number"
                  inputMode="numeric"
                  id="vat"
                  name="vat"
                  step=".01"
                  min={0}
                  innerRef={register}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="version-android">
                  <FormattedMessage id="app version android" />
                  <span
                    className="text-sm ml-2 text-danger"
                    style={{ fontSize: 12 }}
                  >
                    (
                    <FormattedMessage id="settings version hint" /> )
                  </span>
                </CLabel>
                <CInput
                  defaultValue={version?.android}
                  type="text"
                  inputMode="text"
                  id="version-android"
                  name="version.android"
                  // min=""
                  innerRef={register}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="version-ios">
                  <FormattedMessage id="app version ios" />
                  <span
                    className="text-sm ml-2 text-danger"
                    style={{ fontSize: 12 }}
                  >
                    (
                    <FormattedMessage id="settings version hint" /> )
                  </span>
                </CLabel>
                <CInput
                  defaultValue={version?.ios}
                  type="text"
                  inputMode="text"
                  id="version-ios"
                  name="version.ios"
                  // min=""
                  innerRef={register}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="cod">
                  <FormattedMessage id="cod" />
                </CLabel>
                <CInput
                  defaultValue={cod}
                  type="text"
                  inputMode="text"
                  id="cod"
                  name="cod"
                  // min=""
                  innerRef={register}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="giftPrice">
                  <FormattedMessage id="Gift Price" />
                </CLabel>
                <CInput
                  defaultValue={giftPrice}
                  type="text"
                  inputMode="text"
                  id="giftPrice"
                  name="giftPrice"
                  // min=""
                  innerRef={register}
                />
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-end">
              <CButton disabled={submitLoading} type="submit" color="primary">
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
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
    </CRow>
  );
};

export default SettingsPage;
