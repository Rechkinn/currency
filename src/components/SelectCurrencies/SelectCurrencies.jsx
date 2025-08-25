import "./SelectCurrencies.scss";
import Button from "../Button/Button.jsx";

export default function SelectCurrencies({ arrCurrencies = [] }) {
  function disactiveCurrentOption(idSelect) {
    let select = document.getElementById(idSelect).children;
    for (let i = 0; i < select.length; i++) {
      if (select[i].selected) {
        select[i].selected = false;
        return select[i].value;
      }
    }
  }

  function activeCurrentOption(idSelect, valueActive) {
    let select = document.getElementById(idSelect).children;
    for (let i = 0; i < select.length; i++) {
      if (select[i].value === valueActive) {
        select[i].selected = true;
        break;
      }
    }
  }

  function swapCurrencies(event) {
    event.preventDefault();

    let valueCurrenciesSelectFrom = disactiveCurrentOption("select-from");
    let valueCurrenciesSelectTo = disactiveCurrentOption("select-to");

    activeCurrentOption("select-from", valueCurrenciesSelectTo);
    activeCurrentOption("select-to", valueCurrenciesSelectFrom);

    // document.dispatchEvent(
    //   new CustomEvent("swapCurrencies", { bubbles: true })
    // );
  }

  return (
    <div className="select-currencies">
      <div className="select-currencies__from">
        <p className="select-currencies__text">From</p>
        <select
          name=""
          id="select-from"
          className="select-currencies__select"
          defaultValue={arrCurrencies[0]}
        >
          {arrCurrencies.map((currency) => {
            return (
              <option
                key={currency}
                value={currency}
                className="select-currencies__option"
              >
                {currency}
              </option>
            );
          })}
        </select>
      </div>
      <Button
        styleClasses={"select-currencies__button"}
        onClick={swapCurrencies}
      >
        <img
          src="/swap.png"
          alt=""
          className="select-currencies__button-icon"
        />
      </Button>
      <div className="select-currencies__to">
        <p className="select-currencies__text">To</p>
        <select
          name=""
          id="select-to"
          className="select-currencies__select"
          defaultValue={arrCurrencies[1]}
        >
          {arrCurrencies.map((currency) => {
            return (
              <option
                key={currency}
                value={currency}
                className="select-currencies__option"
              >
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
