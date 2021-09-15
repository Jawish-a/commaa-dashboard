import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import EditAddFashionModelForm from "src/components/fashion-models-page/add-edit-form";
import { ContentLoader } from "src/components/loaders";
import AxiosInstance from "src/utils/axios-instance";

const AddModelPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchBrand() {
      try {
        const { data } = await AxiosInstance.get(
          `/fashion-model/getById/${params.id}`
        );

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
        <FormattedMessage id="model not found" />
      </div>
    );

  return loading ? (
    <ContentLoader />
  ) : (
    <EditAddFashionModelForm data={data} isEditForm />
  );
};
export default AddModelPage;
