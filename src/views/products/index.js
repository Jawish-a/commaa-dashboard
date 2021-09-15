import { useEffect, useState, useCallback } from "react";
import AxiosInstance from "src/utils/axios-instance";
import { ContentLoader } from "src/components/loaders";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CPagination,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";
import { FormattedMessage, useIntl } from "react-intl";
import ProductsTable from "src/components/products-page/table";
// import FilterProductsForm from "src/components/products-page/filter";
import { useHistory } from "react-router";
import Query from "query-string";

const ProductsListPage = () => {
  const [data, setData] = useState({});
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);

  const history = useHistory();
  const intl = useIntl();

  const query = Query.parse(history.location.search);
  let { page = 1 } = query;
  page = Number(page);

  const fetchProducts = useCallback(
    async (perPage) => {
      try {
        const { page = 1, ...rest } = Query.parse(history.location.search);

        const { data } = await AxiosInstance.get(
          `product/allProducts?page=${page}&${Query.stringify(
            rest
          )}&perPage=${perPage}`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
    [history.location.search]
  );

  useEffect(() => {
    fetchProducts(perPage);
  }, [fetchProducts, perPage]);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const { data } = await AxiosInstance.get("category/getAll");
  //       setCategories(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchCategories();
  // }, []);

  const changePage = (page) => {
    const query = Query.parse(history.location);
    query.page = page;
    history.push(`/dashboard/products?${Query.stringify(query)}`);
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="products" />
          </CCardHeader>
          <CCardBody className="overflow-auto">
            <div className="d-flex justify-content-end aling-content-center">
              <div className="mb-3">
                {/* <CButton color="success">Excel</CButton> */}
              </div>
              <div className="mb-3 mx-3">
                <CLink className="btn btn-primary" to="/dashboard/products/add">
                  <FormattedMessage id="add product" />
                </CLink>
              </div>
              <div className="mb-3 mx-2">
                <CLabel htmlFor="type">
                  <FormattedMessage id="Per Page" />
                </CLabel>
              </div>
              <div className="mb-0">
                <CFormGroup>
                  <CSelect
                    onChange={(e) => {
                      setPerPage(e.currentTarget.value);
                      // setType(e.currentTarget.value);
                      // setValue("redirect", null);
                    }}
                    id="type"
                    name="type"
                    // invalid={!!errors.type?.message}
                    // innerRef={register({
                    //   required: intl.formatMessage({ id: "required field" }),
                    // })}
                  >
                    <option
                      selected={perPage === "10" && "selected"}
                      value="10"
                    >
                      {intl.formatMessage({ id: "10" })}
                    </option>
                    <option
                      selected={perPage === "25" && "selected"}
                      value="25"
                    >
                      {intl.formatMessage({ id: "25" })}
                    </option>
                    <option
                      selected={perPage === "50" && "selected"}
                      value="50"
                    >
                      {intl.formatMessage({ id: "50" })}
                    </option>
                    <option
                      selected={perPage === "100" && "selected"}
                      value="100"
                    >
                      {intl.formatMessage({ id: "100" })}
                    </option>
                  </CSelect>
                </CFormGroup>
              </div>
            </div>

            {/* table */}
            {loading ? (
              <ContentLoader />
            ) : (
              <ProductsTable
                products={data?.products}
                fetchProducts={fetchProducts}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            )}
            {/* table end */}
            <CPagination
              className="mt-4"
              activePage={page}
              pages={data.totalPages || 1}
              onActivePageChange={changePage}
              doubleArrows={true}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol xl={4}>
        <CCard>
          <FilterProductsForm categories={categories} />
        </CCard>
      </CCol> */}
    </CRow>
  );
};

export default ProductsListPage;
