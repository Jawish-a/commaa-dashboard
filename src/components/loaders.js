import Loader from "react-loader-spinner";

export const ContentLoader = () => (
  <div className="d-flex w-full justify-content-center">
    <Loader type="ThreeDots" color="#321fdb" height={80} width={80} />
  </div>
);
