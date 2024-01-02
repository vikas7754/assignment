import { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import MainContent from "./components/MainContent/MainContent";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        {loading && <Loader />}
        {error && (
          <h4 className="error">
            Error Occured while fetching data. Please try again later.
          </h4>
        )}
        {data && <MainContent data={data} />}
      </div>
    </>
  );
}

export default App;
