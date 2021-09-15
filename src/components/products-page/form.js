import {
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInvalidFeedback,
  CLabel,
} from "@coreui/react";
import { Fragment, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import WysiwygEditor from "./wysiwyg";
import cn from "classnames";
import { useFormContext } from "react-hook-form";
import { uploadImage } from "src/utils/uploaders";

const EditAddFormInputs = ({
  data = {},
  categoryOptions,
  brandOptions,
  modelsOptions,
  defaultSelectedCategories,
  defaultSelectedBrand,
  defaultSelectedModel,
}) => {
  const intl = useIntl();

  const [thumbnailUploading, setThumbnailUploading] = useState(0);
  const [thumbnailError, setThumbnailError] = useState(false);
  const { register, errors, setValue } = useFormContext();
  const imgRef = useRef(null);

  const onThumbnailChange = (event) =>
    uploadImage({
      event,
      maxSizeInKB: 5120,
      beforeUploading: () => setThumbnailError(null),
      onMaxSizeExcceded: () =>
        setThumbnailError(
          <FormattedMessage id="image max size" values={{ limit: "5MB" }} />
        ),
      onUploadProgress: (progress) =>
        setThumbnailUploading(
          Math.round((progress.loaded * 100) / progress.total)
        ),
      onAllowedExtensionsError: (extensions) =>
        setThumbnailError(
          <FormattedMessage
            id="only these file types"
            values={{ type: extensions.join(", ") }}
          />
        ),
      onSuccess: ({ Key, Location }) => {
        imgRef.current.src = Location;
        setValue(
          "thumbnail",
          { key: Key, path: Location },
          { shouldValidate: true }
        );
      },
      whenFinish: () => setThumbnailUploading(0),
    });

  return (
    <Fragment>
      <span className="block h5">
        * <FormattedMessage id="category" />
      </span>
      <hr className="mb-4 mt-2" />
      <CFormGroup className="mb-5">
        <Select
          isMulti
          key={JSON.stringify(defaultSelectedCategories)}
          options={categoryOptions}
          defaultValue={defaultSelectedCategories}
          placeholder={intl.formatMessage({ id: "category" })}
          onChange={(values) =>
            setValue(
              "category",
              values.map((v) => v.value),
              { shouldValidate: true }
            )
          }
        />
      </CFormGroup>
      <span className="block h5">
        * <FormattedMessage id="brand" />
      </span>
      <hr className="mb-4 mt-2" />
      <CFormGroup className="mb-5">
        <Select
          key={JSON.stringify(defaultSelectedBrand)}
          options={brandOptions}
          defaultValue={defaultSelectedBrand}
          placeholder={intl.formatMessage({ id: "brand" })}
          onChange={({ value }) =>
            setValue("brand", value, { shouldValidate: true })
          }
        />
      </CFormGroup>
      <span className="block h5">
        <FormattedMessage id="fashion model" />
      </span>
      <hr className="mb-4 mt-2" />
      <CFormGroup className="mb-5">
        <Select
          key={JSON.stringify(defaultSelectedModel)}
          options={modelsOptions}
          defaultValue={defaultSelectedModel}
          placeholder={intl.formatMessage({ id: "fashion model" })}
          onChange={({ value }) =>
            setValue("fashionModel", value, { shouldValidate: true })
          }
        />
      </CFormGroup>

      <span className="block h5">
        <FormattedMessage id="name" />
      </span>
      <hr className="mb-4 mt-2" />
      {/* Arabic Name */}

      <CFormGroup>
        <CLabel htmlFor="name-ar">
          * <FormattedMessage id="name ar" />
        </CLabel>
        <CInput
          id="name-ar"
          type="text"
          name="productName[ar]"
          defaultValue={data?.productName?.ar}
          invalid={!!errors.productName?.ar?.message}
          innerRef={register({
            required: intl.formatMessage({ id: "required field" }),
          })}
        />
        <CInvalidFeedback>{errors.productName?.ar?.message}</CInvalidFeedback>
      </CFormGroup>
      {/* English Name */}

      <CFormGroup className="mb-5">
        <CLabel htmlFor="name-en">
          * <FormattedMessage id="name en" />
        </CLabel>
        <CInput
          id="name-en"
          type="text"
          name="productName[en]"
          defaultValue={data?.productName?.en}
          invalid={!!errors.productName?.en?.message}
          innerRef={register({
            required: intl.formatMessage({ id: "required field" }),
          })}
        />
        <CInvalidFeedback>{errors.productName?.en?.message}</CInvalidFeedback>
      </CFormGroup>

      <span className="block h5">
        <FormattedMessage id="description" />
      </span>
      {/* Arabic Description */}
      <hr className="mb-4 mt-2" />
      <CFormGroup>
        <CLabel>
          * <FormattedMessage id="description ar" />
        </CLabel>
        <WysiwygEditor
          onChange={(html) =>
            setValue("description[ar]", html, { shouldValidate: true })
          }
          error={errors.description?.ar?.message}
          html={data.description?.ar || ""}
        />
      </CFormGroup>
      {/* English Description */}
      <CFormGroup className="mb-5">
        <CLabel>
          * <FormattedMessage id="description en" />
        </CLabel>
        <WysiwygEditor
          onChange={(html) =>
            setValue("description[en]", html, { shouldValidate: true })
          }
          error={errors.description?.en?.message}
          html={data.description?.en || ""}
        />
      </CFormGroup>
      <CFormGroup>
        <CLabel htmlFor="serialNumber">
          <FormattedMessage id="serial number" />
        </CLabel>
        <CInput
          id="serialNumber"
          type="text"
          name="serialNumber"
          innerRef={register({
            // required: intl.formatMessage({ id: "required field" }),
          })}
          defaultValue={data.serialNumber}
        />
      </CFormGroup>
      {/* Price */}
      <CFormGroup>
        <CLabel htmlFor="price">
          * <FormattedMessage id="price" />
        </CLabel>
        <CInput
          id="price"
          type="number"
          inputMode="numeric"
          name="price"
          min={0}
          defaultValue={data.price}
          invalid={!!errors.price?.message}
          innerRef={register({
            validate: (value) => {
              if (value === "" || Number(value) < 0)
                return intl.formatMessage({ id: "min is" }, { amount: 0 });
              return true;
            },
          })}
        />
        <CInvalidFeedback>{errors.price?.message}</CInvalidFeedback>
      </CFormGroup>
      {/* Discount */}
      <CFormGroup>
        <CLabel htmlFor="discount">
          <FormattedMessage id="discount" />
        </CLabel>
        <CInput
          id="discount"
          type="number"
          inputMode="numeric"
          name="discount"
          min={0}
          defaultValue={data.discount}
          invalid={!!errors.discount?.message}
          innerRef={register({
            validate: (value) => {
              /* to make it optional */
              if (!value && value !== 0) return true;
              return (
                Number(value) >= 0 ||
                intl.formatMessage({ id: "min is" }, { amount: 0 })
              );
            },
          })}
        />
        <CInvalidFeedback>{errors.discount?.message}</CInvalidFeedback>
      </CFormGroup>
      {/* Quantity */}
      <CFormGroup>
        <CLabel htmlFor="quantity">
          * <FormattedMessage id="quantity" />
        </CLabel>
        <CInput
          id="quantity"
          type="number"
          inputMode="numeric"
          name="qty"
          min={0}
          defaultValue={data.qty}
          invalid={!!errors.qty?.message}
          innerRef={register({
            validate: (value) =>
              Number(value) > 0 ||
              intl.formatMessage({ id: "min is" }, { amount: 1 }),
          })}
        />
        <CInvalidFeedback>{errors.qty?.message}</CInvalidFeedback>
      </CFormGroup>
      {/* Thresh Hold */}
      <CFormGroup>
        <CLabel htmlFor="threshold">
          * <FormattedMessage id="threshold" />
        </CLabel>
        <CInput
          id="threshold"
          type="number"
          inputMode="numeric"
          name="threshold"
          min={0}
          defaultValue={data.threshold}
          invalid={!!errors.threshold?.message}
          innerRef={register({
            validate: (value) =>
              Number(value) > 0 ||
              intl.formatMessage({ id: "min is" }, { amount: 0 }),
          })}
        />
        <CInvalidFeedback>{errors.threshold?.message}</CInvalidFeedback>
      </CFormGroup>

      {/* Thumbnail and Images */}

      <div>
        <CLabel htmlFor="thumbnail">
          * <FormattedMessage id="thumbnail" />
        </CLabel>

        <div className="row">
          <div className="col-md-6 col-12">
            <img
              ref={imgRef}
              style={{ maxHeight: 600 }}
              src={data.thumbnail?.path}
              alt=""
              className="img-fluid object-cover"
            />
            {/**
             * Checking upload percentage to show a number
             *   */}
            <div className="mt-2">
              <CLabel
                className={cn(
                  "btn btn-primary",
                  thumbnailUploading > 0 && "disabled px-5"
                )}
              >
                {thumbnailUploading > 0 ? (
                  thumbnailUploading + "%"
                ) : (
                  <FormattedMessage id="update thumbnail" />
                )}
                <input
                  disabled={thumbnailUploading > 0}
                  className="d-none"
                  type="file"
                  accept="image/*"
                  onChange={onThumbnailChange}
                />
              </CLabel>
            </div>
          </div>
        </div>
        {(thumbnailError || errors.thumbnail) && (
          <div className="text-danger text-sm">
            {thumbnailError || errors.thumbnail.message}
          </div>
        )}
      </div>

      <hr className="mb-4 mt-2" />
      <div className="mb-2">
        <CFormGroup variant="custom-checkbox" inline>
          <CInputCheckbox
            custom
            onChange={(e) =>
              setValue("isActive", e.currentTarget.checked, {
                shouldValidate: true,
              })
            }
            id="active"
            name="isActive"
            defaultChecked={data?.isActive}
          />
          <CLabel variant="custom-checkbox" htmlFor="active">
            <FormattedMessage id="active" />
          </CLabel>
        </CFormGroup>
      </div>

      <div className="mb-2">
        <CFormGroup variant="custom-checkbox" inline>
          <CInputCheckbox
            custom
            onChange={(e) =>
              setValue("isFeature", e.currentTarget.checked, {
                shouldValidate: true,
              })
            }
            id="featured"
            name="isFeature"
            defaultChecked={data?.isFeature}
          />
          <CLabel variant="custom-checkbox" htmlFor="featured">
            <FormattedMessage id="featured" />
          </CLabel>
        </CFormGroup>
      </div>

      <div className="mb-2">
        <CFormGroup variant="custom-checkbox" inline>
          <CInputCheckbox
            custom
            onChange={(e) =>
              setValue("new", e.currentTarget.checked, {
                shouldValidate: true,
              })
            }
            id="new"
            name="new"
            defaultChecked={data?.isFeature}
          />
          <CLabel variant="custom-checkbox" htmlFor="new">
            <FormattedMessage id="new" />
          </CLabel>
        </CFormGroup>
      </div>
      {/* order */}
      <CFormGroup>
        <CLabel htmlFor="order">
          * <FormattedMessage id="order" />
        </CLabel>
        <CInput
          id="order"
          type="number"
          inputMode="numeric"
          name="order"
          min={0}
          defaultValue={data.order}
          invalid={!!errors.order?.message}
          innerRef={register({
            validate: (value) =>
              Number(value) > 0 ||
              intl.formatMessage({ id: "min is" }, { amount: 1 }),
          })}
        />
        <CInvalidFeedback>{errors.order?.message}</CInvalidFeedback>
      </CFormGroup>
      {data.createDate && (
        <div className="mt-4 font-bold h5">
          <FormattedMessage
            id="created at"
            values={{ date: data.createDate }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default EditAddFormInputs;
