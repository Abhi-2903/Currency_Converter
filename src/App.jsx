import { useState } from "react";
import { ArrowDownUp, Coins } from "lucide-react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyConverter";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const convert = () => {
    if (!currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Currency Converter</h1>
          </div>
          <p className="mt-2 text-gray-600">Convert currencies in real-time</p>
        </div>

        {/* Converter Form */}
        <form 
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Currency */}
          <div className="space-y-2">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              <ArrowDownUp className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-2 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            Exchange rates are updated in real-time<br/>
            Made by Abhimanyu
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default App;