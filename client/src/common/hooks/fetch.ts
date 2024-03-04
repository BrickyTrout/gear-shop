import { useState } from "react";

const FetchService = () => {
  const [getData, setGetData] = useState() as [
    any,
    React.Dispatch<React.SetStateAction<any>>
  ];
  const [getError, setGetError] = useState("");
  const get = async (path: string) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/${path}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setGetData(data);
    } catch (err) {
      setGetError(err as string);
      console.error(err);
    }
  };

  return { get, getData, getError };
};
export default FetchService;
