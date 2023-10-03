import { useState, useEffect } from "react";

// here "useCurrencyInfo" is a custom hooks that takes "Currenc" as a parameter.
function useCurrencyInfo(currency) {
  // here useState is used to store fetched currencyInformation.

  //   useState is like notepad, which remembers and manage the data, that can change over time, it keeps our component update, when that data changes.

  const [Data, setData] = useState({});

  //   useEffect takes function as an argument which is "()=>{}" written in this block, and second argument is [dependencies] .

  // It will be executed after the component is mounted(ready to visible) and whenever [dependencies] change.

  // useEffect lets you to perform changes after the component visible to the screen, like in this project, you can select which currency to convert.

  useEffect(() => {
    // it is a url which requesting for fetching currency information.
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      // after fetching data, it returns .json() method

      // the response received from servers is in Jigsaw puzzle with many pieces. Each piece represents a part of data.

      // .json() method puts all data together in a right order.

      // once all data are put together, then it is easy for computer to work with the data. This structured data is also called as "Parsed Data".

      .then((response) => response.json())

      //   here api response is an object "currency" parameter is used as a key to access specific currency information.

      // Data useState used to update by calling setData(response[currency]).
      .then((response) => setData(response[currency]));

    console.log(Data);
  }, [currency]);

//   console.log(Data);
  return Data;
}

export default useCurrencyInfo;
