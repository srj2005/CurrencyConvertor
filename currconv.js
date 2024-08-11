const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const dropdownSelects = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const result = document.querySelector(".msg");
const fromDropDown = document.querySelector(".dropdown select[name='from']");
const toDropDown = document.querySelector(".dropdown select[name='to']");

for (let select of dropdownSelects) {
    currencies.forEach((currency) => {
        let newOption = document.createElement("option");
        newOption.innerText = currency;
        newOption.value = currency;
        if (select.name === "from" && currency === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currency === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    });
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (elem) => {
    let currCode = elem.value;
    let newSrc = `https://flagsapi.com/${currCode.substring(0,2)}/flat/64.png`;
    console.log(`Generated flag URL: ${newSrc}`);
    let img = elem.parentElement.querySelector("img");
    img.src = newSrc;
};


const convertCurrency = (event) => {
    event.preventDefault();
    let amount = document.querySelector("#input").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (amount.length != 0) {
        fetch(api)
          .then((resp) => resp.json())
         .then((data)=>{
            console.log(data);
             let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
          });
    } else {
        alert("Please enter the amount first.");
    }
};

button.addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);