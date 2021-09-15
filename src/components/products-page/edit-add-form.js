import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";
import { useLang } from "src/utils/use-lang";
import DeleteModal from "../modals/delete-modal";
import EditAddFormInputs from "./form";
import ImagesList from "./images-list";
import cn from "classnames";
import { ProductVariants } from "./variants";
// import { useLang } from "src/utils/use-lang";

const EditAddProductForm = ({
  loading,
  product = {},
  categories = [],
  brands = [],
  models = [],
  variants = [],
  isEditForm,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const category = product?.category || [];
  const brand = product?.brand;
  const model = product?.fashionModel;

  const history = useHistory();

  const { lang } = useLang();
  const intl = useIntl();
  const [submitLoading, setLoading] = useState(false);
  const [activeTab, setTab] = useState(0);
  const [deleting, setDeleting] = useState(null);

  const methods = useForm({
    shouldUnregister: false,
    defaultValues: {
      thumbnail: null,
      description: isEditForm
        ? {
            en: product.description?.en,
            ar: product.description?.ar,
          }
        : {},
    },
  });
  const { register, handleSubmit, reset } = methods;

  useEffect(() => {
    register("thumbnail", {
      required: intl.formatMessage({ id: "required field" }),
    });
    register("category");
    register("brand");
    register("fashionModel");
    register("variants");
    register("description[ar]", {
      required: intl.formatMessage({ id: "required field" }),
    });
    register("description[en]", {
      required: intl.formatMessage({ id: "required field" }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    if (Object.keys(product).length) {
      reset(product);
    }
  }, [product, reset]);

  /* Memorizing category options array */
  const modelsOptions = useMemo(() => {
    return models.map((model) => ({
      label: model.modelName,
      value: model._id,
    }));
  }, [models]);

  /* Memorizing category options array */
  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      label: cat.categoryName[lang],
      value: cat._id,
    }));
  }, [lang, categories]);

  /* Memorizing brands options array */
  const brandOptions = useMemo(() => {
    return brands.map((brand) => ({
      label: brand.brandName[lang],
      value: brand._id,
    }));
  }, [lang, brands]);

  /* For edit, default selected category */
  const defaultSelectedCategories = useMemo(() => {
    return (
      category?.map((cat) => ({
        label: cat.categoryName[lang],
        value: cat._id,
      })) || []
    );
  }, [category, lang]);

  /* For edit, default selected brand */
  const defaultSelectedBrand = brand
    ? {
        label: brand.brandName[lang],
        value: brand._id,
      }
    : null;
  const defaultSelectedModel = model
    ? {
        label: model.modelName,
        value: model._id,
      }
    : null;

  const submitHandler = async (values) => {
    setLoading(true);
    try {
      /* To set discount = price if discount isnt provided */
      if (values.discount === "") {
        values.discount = values.price;
      }

      if (isEditForm) {
        await AxiosInstance.put(`/product/update/${product._id}`, values);
        toast.success(intl.formatMessage({ id: "product updated" }));
      } else {
        const { data } = await AxiosInstance.post(`/product/create`, values);
        toast.success(intl.formatMessage({ id: "product added" }));
        console.log(data);
        history.replace(`/dashboard/products/${data._id}/edit`);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <CCard>
        <DeleteModal
          open={!!deleting}
          id={deleting}
          endPoint="/product/delete"
          title={intl.formatMessage({ id: "delete product" })}
          description={intl.formatMessage({ id: "delete content warning" })}
          closeModal={() => setDeleting(null)}
          onDelete={() => history.replace("/dashboard/products")}
        />
        <form
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          autoComplete="off"
        >
          <CNav size="lg" className="nav-tabs flex-grow-1">
            <CNavItem>
              <CNavLink
                active={activeTab === 0}
                onClick={() => setTab(0)}
                className="h5 mb-0 py-3 px-4 font-weight-normal rounded-0"
              >
                <FormattedMessage id="information" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 1}
                onClick={() => setTab(1)}
                className="h5 mb-0 py-3 px-4 font-weight-normal rounded-0"
              >
                <FormattedMessage id="images" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 2}
                onClick={() => setTab(2)}
                className="h5 mb-0 py-3 px-4 font-weight-normal rounded-0"
              >
                <FormattedMessage id="variants" />
              </CNavLink>
            </CNavItem>
          </CNav>

          <CCardBody>
            {loading ? (
              <ContentLoader />
            ) : (
              <Fragment>
                {activeTab === 0 && (
                  <div>
                    <EditAddFormInputs
                      defaultSelectedBrand={defaultSelectedBrand}
                      defaultSelectedCategories={defaultSelectedCategories}
                      defaultSelectedModel={defaultSelectedModel}
                      categoryOptions={categoryOptions}
                      brandOptions={brandOptions}
                      modelsOptions={modelsOptions}
                      data={product}
                    />
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <ImagesList
                      images={product?.image}
                      productId={product?._id}
                    />
                  </div>
                )}

                {activeTab === 2 && (
                  <div>
                    <ProductVariants
                      variants={variants}
                      selectedVariants={product?.variants}
                    />
                  </div>
                )}
              </Fragment>
            )}
          </CCardBody>
          <CCardFooter>
            <div
              className={cn(
                "d-flex",
                product?._id ? "justify-content-between" : "justify-content-end"
              )}
            >
              {product?._id && (
                <CButton
                  color="danger"
                  className="px-4"
                  onClick={() => setDeleting(product._id)}
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
    </FormProvider>
  );
};

export default EditAddProductForm;
