import { CInput } from "@coreui/react";
import React from "react";
import Select from "react-select";

const RenderInput = ({ type, data, setValue }) => {
  if (type === "link")
    return (
      <CInput
        type="url"
        id="redirect"
        name="redirect"
        onChange={(e) =>
          setValue("redirect", e.currentTarget.value, { shouldValidate: true })
        }
      />
    );

  return (
    <Select
      key={type}
      options={data}
      onChange={(e) => setValue("redirect", e.value, { shouldValidate: true })}
    />
  );
};

export default React.memo(RenderInput);
