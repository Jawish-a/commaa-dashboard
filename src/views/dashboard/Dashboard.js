import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
// import CIcon from "@coreui/icons-react";

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            {/* <CCardHeader>Traffic {" & "} Sales</CCardHeader> */}
            <CCardBody>
              {/* <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>User</th>
                    <th className="text-center">Bill</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/1.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>

                    <td className="text-center font-weight-bold">500SAR</td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
