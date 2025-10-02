const base_url = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
   for(let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
    }
    else if(select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
    }
    select.append(newOption);
   }

   select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
   });
}

const updateExchangeRate = async () => {
let amount = document.querySelector(".amount input");
let amountVal = parseFloat(amount.value) || 0;
if(amountVal < 1){
    amountVal = 0;
    amount.value = "0";
}

let response = await fetch(`${base_url}/${fromCurr.value.toUpperCase()}`);
let data = await response.json();
let rate = data.rates[toCurr.value.toUpperCase()];

let finalAmount = amountVal * rate;
msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
evt.preventDefault();
updateExchangeRate();
});

window.addEventListener("load", () => {
updateExchangeRate();
});
