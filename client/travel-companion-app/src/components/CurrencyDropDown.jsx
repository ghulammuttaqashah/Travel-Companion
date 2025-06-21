function CurrencyDropDown({ currencies, currency, setCurrency, title = "" }) {
  return (
    <div>
      <label htmlFor={title} className="text-[#243642] text-xl font-bold">{title}</label>
      <div className="mt-1">
        <select
          name={title}
          id={title}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-24 border-2 border-[#243642] text-xl font-semibold rounded-md shadow-md px-2 py-1"
        >
          {currencies.map((currencyOption) => (
            <option value={currencyOption} key={currencyOption}>
              {currencyOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyDropDown;