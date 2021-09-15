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

const NotificationPage = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const { handleSubmit, register } = useForm();
  const intl = useIntl();

  useEffect(() => {
    setNotificationMessage("");
    setNotificationTitle("");
    setLoading(false);
  }, []);

  const submitHandler = async ({ notificationMessage, notificationTitle }) => {
    try {
      setSubmitLoading(true);
      await AxiosInstance.post("auth/sendToAllUsersNotifications", {
        title: notificationTitle,
        body: notificationMessage,
      });
      toast.success(intl.formatMessage({ id: "notifiaction sent" }));
      setLoading(false);
    } catch (error) {}
    setSubmitLoading(true);
  };

  if (loading) return <ContentLoader />;

  return (
    <CRow>
      <CCol xl={7}>
        <form autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="notification" />
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="notificationTitle">
                  <FormattedMessage id="Notification Title" />
                </CLabel>
                <CInput
                  defaultValue={notificationTitle}
                  type="text"
                  inputMode="text"
                  id="notificationTitle"
                  name="notificationTitle"
                  innerRef={register}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="notificationMessage">
                  <FormattedMessage id="Notification Message" />
                </CLabel>
                <CInput
                  defaultValue={notificationMessage}
                  type="text"
                  inputMode="text"
                  id="notificationMessage"
                  name="notificationMessage"
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
                  <FormattedMessage id="Send" />
                )}
              </CButton>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
    </CRow>
  );
};

export default NotificationPage;
