import React, { useEffect, useRef, useState } from "react";
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
import { uploadImage } from "../../utils/uploaders";
import AxiosInstance from "../../utils/axios-instance";
import { toast } from "react-toastify";
import { ContentLoader } from "../loaders";
const EditAddCategoryForm = ({ isEditForm, loading, data = {} }) => {
  const { register, errors, handleSubmit, setValue } = useForm();
  const [imageUploading, setImageUploading] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [submitLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const imgRef = useRef(null);
  const history = useHistory();
  const intl = useIntl();

  useEffect(() => {
    register("image");
  }, [register]);

  const submitHandler = async (values) => {
    setLoading(true);
    try {
      if (isEditForm) {
        await AxiosInstance.put(`/category/update/${data._id}`, values);
        toast.success(intl.formatMessage({ id: "category updated" }));
      } else {
        const {
          data: { _id },
        } = await AxiosInstance.post(`/category/create`, values);
        toast.success(intl.formatMessage({ id: "category added" }));
        history.replace(`/dashboard/categories/${_id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onImageChange = (event) =>
    uploadImage({
      event,
      maxSizeInKB: 5120,
      beforeUploading: () => setImageError(null),
      onMaxSizeExcceded: () =>
        setImageError(
          <FormattedMessage id="image max size" values={{ limit: "5MB" }} />
        ),
      onUploadProgress: (progress) =>
        setImageUploading(Math.round((progress.loaded * 100) / progress.total)),
      onAllowedExtensionsError: (extensions) =>
        setImageError(
          <FormattedMessage
            id="only these file types"
            values={{ type: extensions.join(", ") }}
          />
        ),
      onSuccess: ({ Key, Location }) => {
        imgRef.current.src = Location;
        setValue("image", { key: Key, path: Location }, true);
      },
      whenFinish: () => setImageUploading(0),
    });

  return (
    <CCard>
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/category/delete"
        title={intl.formatMessage({ id: "delete category" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={() => history.replace("/dashboard/categories")}
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
                <CLabel htmlFor="name-ar">
                  * <FormattedMessage id="name ar" />
                </CLabel>
                <CInput
                  id="name-ar"
                  type="text"
                  name="categoryName[ar]"
                  defaultValue={data?.categoryName?.ar}
                  invalid={!!errors.categoryName?.ar?.message}
                  innerRef={register({
                    required: intl.formatMessage({ id: "required field" }),
                  })}
                />
                <CInvalidFeedback>
                  {errors.categoryName?.ar?.message}
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
                  name="categoryName[en]"
                  defaultValue={data?.categoryName?.en}
                  invalid={!!errors.categoryName?.en?.message}
                  innerRef={register({
                    required: intl.formatMessage({ id: "required field" }),
                  })}
                />
                <CInvalidFeedback>
                  {errors.categoryName?.en?.message}
                </CInvalidFeedback>
              </CFormGroup>

              <CRow>
                <CCol md={6}>
                  <img
                    ref={imgRef}
                    style={{ maxHeight: 600 }}
                    src={data.image?.path}
                    alt=""
                    className="img-fluid object-cover"
                  />
                  <div className="mt-2">
                    <CLabel
                      className={cn(
                        "btn btn-primary",
                        imageUploading > 0 && "disabled px-5"
                      )}
                    >
                      {imageUploading > 0 ? (
                        imageUploading + "%"
                      ) : (
                        <FormattedMessage id="update image" />
                      )}
                      <input
                        disabled={imageUploading > 0}
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                      />
                    </CLabel>
                  </div>
                </CCol>
              </CRow>

              {imageError && (
                <div className="text-danger text-sm">{imageError}</div>
              )}
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
                <Loader type="TailSpin" width={15} height={15} color="white" />
              ) : (
                <FormattedMessage id="save" />
              )}
            </CButton>
          </div>
        </CCardFooter>
      </form>
    </CCard>
  );
};

export default EditAddCategoryForm;
