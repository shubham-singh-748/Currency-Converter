import { useState } from "react";
import Input from "./components/Input";
import useCurrencyInfo from "./Hooks/UseCurrencyInfo";

const App = () => {
  const [Amount, setAmount] = useState(0);
  const [From, setFrom] = useState("usd");
  const [To, setTo] = useState("inr");
  const [ConvertedAmount, setConvertedAmount] = useState(0);

  // useCurrencyInfo which is a custom hook, used to fetch currency information.
  // by passing "From" as an argument, requesting for specific currency info which is situated in "From" state variable.
  const getCurrencyInfo = useCurrencyInfo(From);

  // here "object.keys(getCurrencyInfo)" retrieves(getting something from a location) array of all the keys of "getCurrencyInfo" object.
  const options = Object.keys(getCurrencyInfo);

  // this arrow function simply works as a "swap" property.
  const swap = () => {
    setFrom(To);
    setTo(From);
    setAmount(ConvertedAmount);
    setConvertedAmount(Amount);
  };

  // it calculates a converted currency amount using formula "Amount*getCurrencyInfo[To]"
  const currencyConvertAfterClick = () => {
    // like amount=1, and getCurrencyInfo[To]="inr", then calculated value will be = (1 * inr(present value of "inr"))
    setConvertedAmount(Amount * getCurrencyInfo[To]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${"https://images.pexels.com/photos/4386469/pexels-photo-4386469.jpeg?auto=compress&cs=tinysrgb&w=600"}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              currencyConvertAfterClick();
            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={Amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(Amount)}
                selectCurrency={From}
                onAmountChange={(Amount) => setAmount(Amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={ConvertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={To}
                onAmountChange={(Amount) => setAmount(Amount)}
              />
            </div>
            <button
              type="submit"
              className="w-full font-mono font-bold text-xl  bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {From.toUpperCase()} to {To.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
