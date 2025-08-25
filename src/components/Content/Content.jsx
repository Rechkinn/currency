import "./Content.scss";

import EnterAmount from "../EnterAmount/EnterAmount.jsx";
import SelectCurrencies from "../SelectCurrencies/SelectCurrencies.jsx";
import Result from "../Result/Result.jsx";
import Button from "../Button/Button.jsx";
import { useState, useEffect } from "react";

export default function Content() {
  const [options, setOptions] = useState(null);
  const [currenciesValues, setCurrenciesValues] = useState(null);
  const [resultValue, setResultValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const responseArrayCurrencies = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );
        if (!responseArrayCurrencies.ok) {
          throw new Error("Ошибка получения названий валют!");
        }
        const dataArrayCurrencies = await responseArrayCurrencies.json();
        setError(null);
        setCurrenciesValues(dataArrayCurrencies?.rates);
        setOptions(Object.keys(dataArrayCurrencies?.rates));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function findSelectedOption(idSelect) {
    let select = document.getElementById(idSelect).children;
    for (let i = 0; i < select.length; i++) {
      if (select[i].selected) {
        return select[i];
      }
    }
  }

  function convertCurrency(event) {
    event.preventDefault();
    const valueForConvert = document.querySelector(
      ".enter-amount__input"
    ).value;

    const nameCurrencyFrom = findSelectedOption("select-from").value;
    const nameCurrencyTo = findSelectedOption("select-to").value;

    setResultValue(
      `${
        valueForConvert ? Number(valueForConvert) : 0
      } ${nameCurrencyFrom} = ${(
        (currenciesValues[nameCurrencyTo] /
          currenciesValues[nameCurrencyFrom]) *
        valueForConvert
      ).toFixed(2)} ${nameCurrencyTo}`
    );
  }

  // document.addEventListener("swapCurrencies", convertCurrency);

  return (
    <section className="content">
      {loading && <div>Загрузка...</div>}
      {error && !loading && <div>Ошибка: {error.message}</div>}
      {options && !error && !loading && (
        <div className="content__inner">
          <form action="" method="" className="content__form">
            <EnterAmount />
            <SelectCurrencies arrCurrencies={options} />
            <Button styleClasses={"exchange"} onClick={convertCurrency}>
              Get Exchange Rate
            </Button>
          </form>
          <Result resultValue={resultValue} />
        </div>
      )}
    </section>
  );
}
