import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import EditAddBrandForm from "src/components/brands-page/add-edit-form";
import AxiosInstance from "src/utils/axios-instance";

const EditBrandPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchBrand() {
      try {
        const { data } = await AxiosInstance.get(`/brand/getById/${params.id}`);

        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="display-4 text-center mt-5">
        <FormattedMessage id="brand not found" />
      </div>
    );

  return <EditAddBrandForm data={data} isEditForm loading={loading} />;
};
export default EditBrandPage;
