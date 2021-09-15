import { useEffect, useState } from "react";
import EditAddForm from "src/components/products-page/edit-add-form";
import AxiosInstance from "src/utils/axios-instance";

const AddProductPage = () => {
  const [data, setData] = useState({
    categories: [],
    brands: [],
    models: [],
    loading: true,
  });

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

    (async function () {
      const [brands, categories, models] = await Promise.all([
        fetchData("brand"),
        fetchData("category"),
        fetchData("fashion-model"),
      ]);

      setData({
        brands,
        categories,
        models,
        loading: false,
      });
    })();
  }, []);

  return (
    <EditAddForm
      loading={data.loading}
      categories={data.categories}
      brands={data.brands}
      models={data.models}
    />
  );
};

export default AddProductPage;
