import React from "react";
import { CLabel } from "@coreui/react";
import { FormattedMessage } from "react-intl";
import { uploadImage } from "src/utils/uploaders";
import cn from "classnames";
import { useState } from "react";
import { Fragment } from "react";

const ImageUploadListItem = ({ onImageUpload }) => {
  const [uploadingPercentage, setPercentage] = useState(0);
  const [error, setError] = useState(false);

  const onImageChanged = (event) =>
    uploadImage({
      event,
      beforeUploading: () => setError(null),
      onMaxSizeExcceded: () =>
        setError(
          <FormattedMessage id="image max size" values={{ limit: "5MB" }} />
        ),
      onAllowedExtensionsError: (extensions) =>
        setError(
          <FormattedMessage
            id="only these file types"
            values={{ type: extensions.join(", ") }}
          />
        ),
      onUploadProgress: (progress) =>
        setPercentage(Math.round((progress.loaded * 100) / progress.total)),
      onSuccess: onImageUpload,
      whenFinish: (success) => {
        if (!success) setPercentage(0);
      },
    });

  return (
    <Fragment>
      <div>
        <CLabel
          className={cn(
            "btn btn-primary mt-2",
            uploadingPercentage > 0 && "disabled px-5"
          )}
        >
          {uploadingPercentage > 0 ? (
            uploadingPercentage + "%"
          ) : (
            <FormattedMessage id="upload" />
          )}
          <input
            disabled={uploadingPercentage > 0}
            onChange={onImageChanged}
            className="d-none"
            type="file"
            accept="image/*"
          />
        </CLabel>
      </div>
      {error && (
        <div className="text-danger text-sm d-inline-block">{error}</div>
      )}
    </Fragment>
  );
};

export default ImageUploadListItem;
