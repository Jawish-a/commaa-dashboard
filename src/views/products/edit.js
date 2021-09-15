import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import EditAddForm from "src/components/products-page/edit-add-form";
import AxiosInstance from "src/utils/axios-instance";

const EditProductPage = () => {
  const params = useParams();
  const [data, setData] = useState({
    product: {},
    categories: [],
    brands: [],
    models: [],
    variants: [],
    loading: true,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData(type) {
      try {
        const { data } = await AxiosInstance.get(`${type}/getAll`);

        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    async function fetchProduct() {
      try {
        const { data } = await AxiosInstance.get(
          `/product/getById/${params.id}`
        );

        return data;
      } catch (error) {
        setError(error);
        return {};
      }
    }
    async function getAllData() {
      const [
        product,
        brands,
        categories,
        models,
        variants,
      ] = await Promise.all([
        fetchProduct(),
        fetchData("brand"),
        fetchData("category"),
        fetchData("fashion-model"),
        fetchData("variant"),
      ]);
      setData({
        product,
        brands,
        categories,
        models,
        variants,
        loading: false,
      });
    }

    getAllData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="display-4 text-center mt-5">
        <FormattedMessage id="product not found" />
      </div>
    );

  return <EditAddForm {...data} isEditForm />;
};

export default EditProductPage;
