import CIcon from "@coreui/icons-react";
import { CButton, CInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import DeleteModal from "../modals/delete-modal";
import ImageUploadListItem from "./image-upload-list-item";

const ImagesList = ({ images = [], productId: _id }) => {
  const [imgs, setImages] = useState(images);
  const [deleting, setDeleting] = useState({});
  const { register, setValue } = useFormContext();
  const intl = useIntl();

  useEffect(() => {
    register("image");
  }, [register]);

  const addInput = () => {
    setImages((prev) => [...prev, {}]);
  };

  const removeItem = ({ idx, key, _id }) => {
    if (!key) {
      setImages((prev) => {
        const filtered = prev.filter((_, i) => i !== idx);

        /* only setting those who got paths as a value to send to backend */
        setValue(
          "image",
          filtered.filter(({ path }) => !!path)
        );
        return filtered;
      });
    } else {
      setDeleting({ key });
    }
  };

  const onDelete = (key) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img?.key !== key);
      setValue(
        "image",
        filtered.filter(({ path }) => !!path)
      );
      return filtered;
    });
    setDeleting(false);
  };

  const onImageUpload = ({ Key, Location }, idx) => {
    const state = [...imgs];
    state[idx] = {
      path: Location,
      key: Key,
      order: idx + 1,
    };

    setImages(state);
    /* only setting those who got paths as a value to send to backend */
    setValue(
      "image",
      state.filter(({ path }) => !!path)
    );
  };

  return (
    <div>
      <DeleteModal
        open={!!deleting.key}
        id={deleting.key}
        endPoint="/upload/deleteImg"
        title={intl.formatMessage({ id: "delete image" })}
        description={intl.formatMessage({ id: "delete content warning" })}
        closeModal={() => setDeleting({})}
        onDelete={onDelete}
        query={`type=image${_id ? `&id=${_id}` : ""}`}
      />
      <div className="d-flex justify-content-end mb-4">
        <CButton color="primary" onClick={addInput}>
          <FormattedMessage id="add image" />
        </CButton>
      </div>
      <div className="position-relative table-responsive">
        <table className="table table-striped align-td-center">
          <thead>
            <tr className="text-center">
              <th>
                <FormattedMessage id="image" />
              </th>
              <th>
                <FormattedMessage id="order" />
              </th>
              <th>
                <FormattedMessage id="action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {!imgs.length && (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <span className="h4">
                    <FormattedMessage id="no data" />
                  </span>
                </td>
              </tr>
            )}
            {imgs.map(({ key, order, path }, idx) => (
              <tr key={key || idx} className="text-center">
                <td>
                  {path ? (
                    <img
                      src={path}
                      alt=""
                      className="img-fluid object-cover"
                      style={{ width: 250, minWidth: 200 }}
                    />
                  ) : (
                    <ImageUploadListItem
                      index={idx}
                      onImageUpload={(data) => onImageUpload(data, idx)}
                    />
                  )}
                </td>
                <td>
                  <CInput
                    type="number"
                    inputMode="numeric"
                    min={0}
                    defaultValue={order}
                    style={{ minWidth: 75 }}
                  />
                </td>
                <td style={{ minWidth: 150 }}>
                  <CButton
                    color="danger"
                    onClick={() => removeItem({ idx, key })}
                  >
                    <CIcon name="cil-trash" />
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default React.memo(ImagesList);
