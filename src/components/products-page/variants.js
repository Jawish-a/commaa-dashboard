import CIcon from "@coreui/icons-react";
import { CButton, CInput } from "@coreui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Select, { components } from "react-select";
import { useLang } from "src/utils/use-lang";

export const ProductVariants = ({ variants, selectedVariants }) => {
  const defaultVariants = useMemo(() => {
    if (selectedVariants)
      return selectedVariants.map(({ qty, variants: varis }, idx) => ({
        id: idx,
        quantity: qty,
        data: varis.map(
          ({ variantValue, variantId: { variantValues, _id, type } }) => ({
            variantId: _id,
            value: variantValue,
            values: variantValues,
            type: type || "text",
          })
        ),
      }));
    return [];
  }, [selectedVariants]);

  const [productVariants, setVariants] = useState(defaultVariants);
  const { setValue } = useFormContext();

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Math.ceil(Math.random() * 99999999),
        quantity: 1,
        data: [
          {
            variantId: "",
            value: "",
            values: [],
          },
        ],
      },
    ]);
  };

  const getFormattedVariants = useCallback(() => {
    return productVariants
      .map(({ quantity, data }) => ({
        qty: quantity,
        variants: data
          .filter((i) => !!i.value)
          .map(({ variantId, value }) => ({
            variantId,
            variantValue: value || "",
          })),
      }))
      .filter((v) => !!v.variants.length);
  }, [productVariants]);

  const removeVariant = (id) => {
    setVariants((prev) => prev.filter((i) => i.id !== id));
  };

  const selectVariant = ({ index, data, variantIndex }) => {
    const clone = [...productVariants];
    if (clone[variantIndex]) {
      clone[variantIndex].data[index] = data;
    }
    setVariants(clone);
  };

  const selectValueOfVariant = ({ value, index, variantIndex }) => {
    const clone = [...productVariants];
    if (clone[variantIndex]) {
      clone[variantIndex].data[index].value = value;
    }
    setVariants(clone);
  };
  const quantityChanged = ({ value, variantIndex }) => {
    const clone = [...productVariants];
    if (clone[variantIndex]) {
      clone[variantIndex].quantity = value;
    }
    setVariants(clone);
  };

  const addVariantValue = (variantIndex) => {
    const clone = [...productVariants];
    if (clone[variantIndex]) {
      clone[variantIndex].data.push({ variantId: "", value: "", values: [] });
    }
    setVariants(clone);
  };

  useEffect(() => {
    setValue("variants", getFormattedVariants());
  }, [getFormattedVariants, setValue]);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <CButton color="primary mb-3" onClick={addVariant}>
          <FormattedMessage id="add variant" />
        </CButton>
      </div>
      <table
        className="table table-striped align-td-center"
        style={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr className="text-center">
            <th>
              <FormattedMessage id="variant" />
            </th>
            <th>
              <FormattedMessage id="value" />
            </th>
            <th>
              <FormattedMessage id="quantity" />
            </th>
            <th>
              <FormattedMessage id="action" />
            </th>
          </tr>
        </thead>
        <tbody>
          {productVariants.map((item, idx) => (
            <VariantRow
              variants={variants}
              selected={{ ...item, idx }}
              key={item.id}
              removeVariant={() => removeVariant(item.id)}
              selectVariant={selectVariant}
              selectValueOfVariant={selectValueOfVariant}
              quantityChanged={quantityChanged}
              addVariantValue={addVariantValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VariantRow = ({
  variants,
  selected,
  selectVariant,
  removeVariant,
  selectValueOfVariant,
  quantityChanged,
  addVariantValue,
}) => {
  const { lang } = useLang();

  const selectedVariantsIds = selected.data.map(({ variantId }) => variantId);

  const mainSelected = ({ index, value, values, type = "text" }) => {
    selectVariant({
      variantIndex: selected.idx,
      index,
      data: { variantId: value, values, type },
    });
  };

  const valueSelected = ({ index, value }) => {
    selectValueOfVariant({
      variantIndex: selected.idx,
      index,
      value,
    });
  };
  const quantityChangedHander = (e) => {
    quantityChanged({
      variantIndex: selected.idx,
      value: e.currentTarget.value,
    });
  };

  return (
    <tr>
      <td style={{ verticalAlign: "top" }}>
        {selected.data.map((item, idx) => {
          const selectedOption = variants.find(
            ({ _id }) => _id === item.variantId
          );

          return (
            <div className="mb-2" key={idx}>
              <Select
                onChange={(d) => mainSelected(d)}
                defaultValue={
                  selectedOption
                    ? {
                        label: selectedOption.variantName[lang],
                        value: selectedOption._id,
                      }
                    : null
                }
                options={variants
                  .filter(({ _id }) => !selectedVariantsIds.includes(_id))
                  .map(({ variantName, _id, variantValues, type }) => ({
                    label: variantName?.[lang],
                    value: _id,
                    values: variantValues,
                    index: idx,
                    type,
                  }))}
              />
            </div>
          );
        })}

        <CButton
          onClick={() => addVariantValue(selected.idx)}
          color="primary"
          className="mt-3"
        >
          <FormattedMessage id="add more" />
        </CButton>
      </td>
      <td style={{ verticalAlign: "top" }}>
        {selected.data.map((item, idx) => (
          <div key={idx} className="mb-2">
            <Select
              key={item.variantId}
              components={{ Option: ValueOption, ValueContainer }}
              onChange={(d) => valueSelected(d)}
              isDisabled={!item.variantId}
              defaultValue={
                item.value
                  ? { label: item.value, value: item.value, type: item.type }
                  : null
              }
              options={item.values.map((val) => ({
                label: val,
                value: val,
                index: idx,
                type: item.type,
              }))}
            />
          </div>
        ))}
      </td>
      <td style={{ verticalAlign: "top" }}>
        <CInput
          defaultValue={selected.quantity}
          inputMode="numeric"
          type="number"
          min={0}
          style={{ width: "100%" }}
          onChange={quantityChangedHander}
        />
      </td>
      <td className="text-center" style={{ verticalAlign: "top" }}>
        <CButton color="danger" onClick={removeVariant}>
          <CIcon name="cil-trash" />
        </CButton>
      </td>
    </tr>
  );
};

const ValueOption = (props) => {
  const { data, innerRef, innerProps } = props;

  if (data.type === "color") {
    return (
      <div ref={innerRef} {...innerProps} className="w-full px-3 py-2 mb-1">
        <div style={{ backgroundColor: data.value }} className="py-2"></div>
      </div>
    );
  }

  return <components.Option {...props} />;
};

const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue } = props;
  const value = getValue()?.[0];
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      {value.type === "color" ? (
        <div
          className="py-2"
          style={{ backgroundColor: value.value, width: 250, maxWidth: "100%" }}
        ></div>
      ) : (
        value.value
      )}
    </components.ValueContainer>
  );
};
