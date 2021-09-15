import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
} from "@coreui/react";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";
import Query from "query-string";
import { useHistory } from "react-router";

const UsersListPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const query = Query.parse(history.location.search);
  let { page = 1 } = query;
  page = Number(page);

  const fetchUsers = useCallback(async () => {
    try {
      const { page = 1 } = Query.parse(history.location.search);

      setLoading(true);
      const { data } = await AxiosInstance.get(`auth/getUsers?page=${page}`);
      setData({
        users: data.users?.sort((user) => (user.isAdmin ? -1 : 1)),
        ...data,
      });
    } catch (error) {}
    setLoading(false);
  }, [history.location.search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    async function fetchUsers() {}

    fetchUsers();
  }, []);

  if (loading) return <ContentLoader />;

  console.log(data);

  const changePage = (page) => {
    const query = Query.parse(history.location);
    query.page = page;
    history.push(`/dashboard/users?${Query.stringify(query)}`);
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <FormattedMessage id="users" />
          </CCardHeader>
          <CCardBody>
            <div className="position-relative table-responsive">
              <table className="table table-striped align-td-center text-center">
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage id="name" />
                    </th>
                    <th>
                      <FormattedMessage id="email" />
                    </th>
                    <th>
                      <FormattedMessage id="phone" />
                    </th>
                    <th>
                      <FormattedMessage id="joined at" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!data?.users?.length && (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        <span className="h4">
                          <FormattedMessage id="no data" />
                        </span>
                      </td>
                    </tr>
                  )}
                  {data.users?.map(
                    ({
                      _id,
                      fullName,
                      createDate,
                      isAdmin,
                      email,
                      phoneNumber,
                    }) => (
                      <tr key={_id}>
                        <td>{fullName}</td>
                        <td>{email}</td>
                        <td>{phoneNumber}</td>
                        <td>{createDate}</td>
                        <td>
                          {isAdmin ? (
                            <CBadge color="primary">
                              <FormattedMessage id="admin" />
                            </CBadge>
                          ) : (
                            <CBadge color="secondary">
                              <FormattedMessage id="user role" />
                            </CBadge>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

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

export default UsersListPage;
