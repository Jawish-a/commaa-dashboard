import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import EditAddCategoryForm from "src/components/categories-page/edit-add-form";
import AxiosInstance from "src/utils/axios-instance";

const EditCategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await AxiosInstance.get(
          `/category/getById/${params.id}`
        );

        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="display-4 text-center mt-5">
        <FormattedMessage id="category not found" />
      </div>
    );

  return <EditAddCategoryForm data={data} isEditForm loading={loading} />;
};
export default EditCategoryPage;
