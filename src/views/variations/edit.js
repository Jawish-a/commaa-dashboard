import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import { ContentLoader } from "src/components/loaders";
import EditAddVariantForm from "src/components/variations-page/add-edit-form";
import AxiosInstance from "src/utils/axios-instance";

const EditVariantPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/variant/getById/${params.id}`
        );

        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="display-4 text-center mt-5">
        <FormattedMessage id="variant not found" />
      </div>
    );

  return loading ? (
    <ContentLoader />
  ) : (
    <EditAddVariantForm isEditForm data={data} />
  );
};
export default EditVariantPage;
