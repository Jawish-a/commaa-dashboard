import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLang } from "src/utils/use-lang";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../modals/delete-modal";

const ProductsTable = ({ products = [], fetchProducts }) => {
  const [deleting, setDeleting] = useState(null);
  const { lang } = useLang();
  const intl = useIntl();

  const isActiveBadge = (active = true) => {
    if (active) {
      return (
        <span className="badge badge-success h6 mb-0">
          <FormattedMessage id="active" />
        </span>
      );
    }
    return (
      <span className="badge badge-warning h6 mb-0">
        <FormattedMessage id="inactive" />
      </span>
    );
  };

  const deleteProduct = () => {
    fetchProducts();
    setDeleting(null);
  };

  return (
    <div className="position-relative table-responsive">
      <DeleteModal
        open={!!deleting}
        id={deleting}
        endPoint="/product/delete"
        title={intl.formatMessage({ id: "delete product" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting(null)}
        onDelete={deleteProduct}
      />
      <table className="table table-striped align-td-center">
        <thead>
          <tr className="text-center">
            <th>
              <CIcon name="cil-tags" />
            </th>
            <th>
              <FormattedMessage id="name" />
            </th>
            <th>
              <FormattedMessage id="quantity" />
            </th>
            <th>
              <FormattedMessage id="price" />
            </th>
            <th>
              <FormattedMessage id="thumbnail" />
            </th>
            <th>
              <FormattedMessage id="status" />
            </th>
            <th>
              <FormattedMessage id="action" />
            </th>
          </tr>
        </thead>
        <tbody>
          {!products?.length && (
            <tr>
              <td colSpan={7} className="text-center py-4">
                <span className="h4">
                  <FormattedMessage id="no data" />
                </span>
              </td>
            </tr>
          )}

          {products.map(
            ({
              _id,
              serialNumber,
              productName,
              qty,
              price,
              isActive,
              thumbnail,
              variants,
            }) => (
              <tr className="text-center" key={_id}>
                <td>{serialNumber}</td>
                <td>{productName[lang]}</td>
                <td>
                  {qty}
                  {variants.map((v) => {
                    return (
                      v.qty <= 1 && (
                        <>
                          <br />
                          <span className="btn btn-danger btn-sm">Danger</span>
                        </>
                      )
                    );
                  })}
                </td>
                <td>
                  {price}
                  <FormattedMessage id="sar" />
                </td>
                <td>
                  <img
                    alt=""
                    src={thumbnail?.path}
                    className="object-cover rounded"
                    width={50}
                    height={50}
                  />
                </td>
                <td>{isActiveBadge(isActive)}</td>
                <td className="">
                  <div className="d-flex justify-content-center">
                    {/* <Link
                      className="btn btn-sm btn-success"
                      to={`/dashboard/products/${_id}/view`}
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </Link> */}
                    <Link
                      className="btn btn-sm btn-warning mx-2"
                      to={`/dashboard/products/${_id}/edit`}
                    >
                      <CIcon name="cil-pencil" />
                    </Link>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => setDeleting(_id)}
                    >
                      <CIcon name="cil-trash" />
                    </CButton>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
