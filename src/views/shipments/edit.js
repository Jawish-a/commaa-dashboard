import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import EditAddShipmentMethodForm from "src/components/shipments/edit-add-form";
import AxiosInstance from "src/utils/axios-instance";

const EditShipmentPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await AxiosInstance.get(
          `/shipment-method/${params.id}`
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
        <FormattedMessage id="shipment method not found" />
      </div>
    );
  return <EditAddShipmentMethodForm isEditForm data={data} loading={loading} />;
};

export default EditShipmentPage;
