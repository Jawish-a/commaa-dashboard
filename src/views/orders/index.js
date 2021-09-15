import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
} from "@coreui/react";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";
import Query from "query-string";
import OrdersTable from "src/components/orders-page/table";

const OrdersListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const history = useHistory();

  const query = Query.parse(history.location.search);
  let { page = 1 } = query;
  page = Number(page);

  const fetchOrders = useCallback(
    async (perPage) => {
      try {
        setLoading(true);
        const { page = 1 } = Query.parse(history.location.search);
        const { data } = await AxiosInstance.get(
          `order?page=${page}&perPage=${perPage}`
        );

        setData({
          page: 1,
          ...data,
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
    [history.location.search]
  );

  useEffect(() => {
    fetchOrders(perPage);
  }, [fetchOrders, perPage]);

  const changePage = (page) => {
    const query = Query.parse(history.location);
    query.page = page;
    history.push(`/dashboard/orders?${Query.stringify(query)}`);
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="orders" />
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <ContentLoader />
            ) : (
              <OrdersTable
                orders={data.orders}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            )}

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
    </CRow>
  );
};
export default OrdersListPage;
