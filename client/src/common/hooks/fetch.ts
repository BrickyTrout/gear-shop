import { useState } from "react";

const FetchService = () => {
  const SERVER_URL = "http://localhost:3001/";
  const [getData, setGetData] = useState() as [
    any,
    React.Dispatch<React.SetStateAction<any>>
  ];
  const [getError, setGetError] = useState("");
  const get = async (path: string) => {
    try {
      const res = await fetch(`${SERVER_URL}${path}`, {
        method: "GET",
      });
      const data = await res.json();
      setGetData(data);
    } catch (err) {
      setGetError(err as string);
    }
  };

  return { get, getData, getError };
};
export default FetchService;
