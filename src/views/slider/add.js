import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { uploadImage } from "src/utils/uploaders";
import cn from "classnames";
import AxiosInstance from "src/utils/axios-instance";
import { ContentLoader } from "src/components/loaders";
import RenderInput from "src/components/slider-page/render-input";
import { useLang } from "src/utils/use-lang";
import { validURL } from "src/utils/is-url";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

const AddSlidePage = () => {
  const [options, setOptions] = useState({
    brands: [],
    products: [],
    categories: [],
    loading: true,
  });
  const [loading, setLoading] = useState(false);
  const { errors, setValue, register, handleSubmit } = useForm();
  const [type, setType] = useState("product");
  const [imageError, setImageError] = useState(false);
  const [imageUploading, setImageUploading] = useState(0);
  const imgRef = useRef(null);
  const intl = useIntl();
  const { lang } = useLang();
  const history = useHistory();

  useEffect(() => {
    async function fetchData(path) {
      const { data } = await AxiosInstance.get(path);
      return data;
    }

    async function fetchOptions() {
      const [brands, categories, products] = await Promise.all([
        fetchData("brand/getAll"),
        fetchData("category/getAll"),
        fetchData("product"),
      ]);

      setOptions({ brands, categories, products, loading: false });
    }

    fetchOptions();
  }, []);

  useEffect(() => {
    register("image", {
      required: intl.formatMessage({ id: "required field" }),
    });
  }, [register, intl]);
  useEffect(() => {
    register("redirect", {
      validate: (value) => {
        if (type !== "link")
          return (
            value?.length > 0 || intl.formatMessage({ id: "required field" })
          );
        return validURL(value) || intl.formatMessage({ id: "invalid url" });
      },
    });
  }, [register, intl, type]);

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
        setValue(
          "image",
          { key: Key, path: Location },
          { shouldValidate: true }
        );
      },
      whenFinish: () => setImageUploading(0),
    });

  /* image returns as an object */
  const submitHandler = async ({ image = {}, ...rest }) => {
    setLoading(true);
    try {
      await AxiosInstance.post("/slider", { ...rest, ...image });
      history.push("/dashboard/slider");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* showing options for dynamic inputs */
  const getData = useCallback(() => {
    switch (type) {
      case "product":
        return options.products.map(({ productName, _id }) => ({
          label: productName?.[lang],
          value: _id,
        }));
      case "brand":
        return options.brands.map(({ brandName, _id }) => ({
          label: brandName?.[lang],
          value: _id,
        }));
      case "category":
        return options.categories.map(({ categoryName, _id }) => ({
          label: categoryName?.[lang],
          value: _id,
        }));
      default:
        return [];
    }
  }, [type, options, lang]);

  if (options.loading) return <ContentLoader />;
  return (
    <CRow>
      <CCol xl={8}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <CCard>
            <CCardHeader>
              <FormattedMessage id="add slide" />
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="type">
                  <FormattedMessage id="ad type" />
                </CLabel>
                <CSelect
                  onChange={(e) => {
                    setType(e.currentTarget.value);

                    setValue("redirect", null);
                  }}
                  id="type"
                  name="type"
                  invalid={!!errors.type?.message}
                  innerRef={register({
                    required: intl.formatMessage({ id: "required field" }),
                  })}
                >
                  <option value="product">
                    {intl.formatMessage({ id: "product" })}
                  </option>
                  <option value="category">
                    {intl.formatMessage({ id: "category" })}
                  </option>
                  <option value="brand">
                    {intl.formatMessage({ id: "brand" })}
                  </option>
                  <option value="link">
                    {intl.formatMessage({ id: "link" })}
                  </option>
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="redirect">
                  <FormattedMessage id="redirect" />
                </CLabel>
                <RenderInput type={type} setValue={setValue} data={getData()} />
                <span style={{ fontSize: 12 }} className="text-danger">
                  {errors.redirect?.message}
                </span>
              </CFormGroup>
              <CRow>
                <CCol md={6}>
                  <img
                    ref={imgRef}
                    style={{ maxHeight: 600 }}
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
                    {(imageError || errors.image) && (
                      <div className="text-danger text-sm">
                        {imageError || errors.image.message}
                      </div>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-end">
              <CButton disabled={loading} type="submit" color="primary">
                {loading ? (
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
export default AddSlidePage;
