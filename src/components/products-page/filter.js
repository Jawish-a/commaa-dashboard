import {
  CButton,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInvalidFeedback,
  CLabel,
} from "@coreui/react";
import { memo, useEffect, useMemo } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useLang } from "src/utils/use-lang";
import Query from "query-string";
import { useHistory } from "react-router-dom";

const FilterProductsForm = ({ categories = [] }) => {
  const history = useHistory();
  const location = history.location;
  const query = Query.parse(location.search);
  const intl = useIntl();
  const { lang } = useLang();

  const { handleSubmit, errors, register, setValue } = useForm({
    defaultValues: {
      category: "",
    },
  });

  const submitForm = (data) => {
    const newQuery = { ...query };

    if (data.productName) {
      newQuery[`productName.${lang}`] = data.productName;
    } else {
      delete newQuery[`productName.${lang}`];
    }
    const { productName, ...restQuery } = data;
    Object.entries(restQuery).forEach(([key, value]) => {
      if (value || value === false) {
        newQuery[key] = value;
      } else {
        delete newQuery[key];
      }
    });

    history.push(`/dashboard/products?${Query.stringify(newQuery)}`);
  };

  const options = useMemo(() => {
    return categories.map(({ _id, categoryName }) => ({
      value: _id,
      label: categoryName[lang],
    }));
  }, [categories, lang]);

  useEffect(() => {
    register("category");
  }, [register]);

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <CCardHeader>
        <FormattedMessage id="filter" />
      </CCardHeader>
      <CCardBody>
        <CFormGroup>
          <Select
            isClearable
            onChange={(option) =>
              setValue("category", option?.value || "", true)
            }
            options={options}
            placeholder={intl.formatMessage({ id: "category" })}
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="serialNumber">
            <FormattedMessage id="serial number" />
          </CLabel>
          <CInput
            invalid={!!errors.name}
            innerRef={register}
            id="serialNumber"
            type="text"
            placeholder={intl.formatMessage({ id: "serial number" })}
            name="serialNumber"
          />
          <CInvalidFeedback>{errors.name?.message}</CInvalidFeedback>
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="name">
            <FormattedMessage id="name" />
          </CLabel>
          <CInput
            invalid={!!errors.name}
            innerRef={register}
            id="name"
            type="text"
            placeholder={intl.formatMessage({ id: "name" })}
            name="productName"
          />
          <CInvalidFeedback>{errors.name?.message}</CInvalidFeedback>
        </CFormGroup>

        <CFormGroup variant="custom-checkbox" inline>
          <CInputCheckbox
            custom
            innerRef={register}
            id="active"
            defaultChecked={true}
            name="isActive"
          />
          <CLabel variant="custom-checkbox" htmlFor="active">
            <FormattedMessage id="active" />
          </CLabel>
        </CFormGroup>
      </CCardBody>
      <CCardFooter>
        <div className="d-flex justify-content-end">
          <CButton color="primary" type="submit">
            <FormattedMessage id="filter" />
          </CButton>
        </div>
      </CCardFooter>
    </form>
  );
};
export default memo(FilterProductsForm);
