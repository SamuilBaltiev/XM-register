
//swiper
var swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});
//PASSWORD VALIDATION

function checkPassword(password) {
  if (password === "") {
    lengthSpan.style.color = "";
    numberSpan.style.color = "";
    lowercaseSpan.style.color = "";
    uppercaseSpan.style.color = "";
    specialSpan.style.color = "";
    passwordInput.style.backgroundColor = "";
  } else {
    const regexLength = /^.{8,15}$/;
    const regexNumber = /\d/;
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexSpecial = /[#\[\]()@$&*!?|,.^\/\\+\-_]/;

    lengthSpan.style.color = regexLength.test(password) ? "green" : "red";
    numberSpan.style.color = regexNumber.test(password) ? "green" : "red";
    lowercaseSpan.style.color = regexLowercase.test(password) ? "green" : "red";
    uppercaseSpan.style.color = regexUppercase.test(password) ? "green" : "red";
    specialSpan.style.color = regexSpecial.test(password) ? "green" : "red";
  }
}

passwordInput.addEventListener("input", function() {
  checkPassword(passwordInput.value);
});


//EMAIL VALIDATION

  

function emailValidation(){
  if(!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
    text.innerHTML = "Please Enter Valid Email"
    text.style.color = "red"
    email.style.border = "3px solid red"
    return false
  } {
    text.innerHTML = "";
    email.style.border = "3px solid green"
    return true;
  }
}

//ACTIVE REGISTER BUTTON


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\[\]()@$&*!?|,.^/\\+_-])[A-Za-z\d#\[\]()@$&*!?|,.^/\\+_-]{8,15}$/;
  return passwordRegex.test(password);
}

function checkValidity() {
  const emailValid = validateEmail(email.value);
  const passwordValid = validatePassword(passwordInput.value);

  if (emailValid && passwordValid) {
    registerButton.style.backgroundColor = "#29A643";
    registerButton.style.cursor = "pointer";
  } else {
    registerButton.style.backgroundColor = "grey";
    registerButton.style.cursor = "default";
  }
}

function displayPopup() {
  if (validateEmail(email.value) && validatePassword(passwordInput.value)) {
    registerPopup.style.display = "block";
  }
}

email.addEventListener("keyup", checkValidity);
passwordInput.addEventListener("keyup", checkValidity);
registerButton.addEventListener("click", displayPopup);


//CRYPTO API
// Fetch the data from the API
fetch("https://api.coinlore.net/api/tickers/")
  .then((response) => response.json())
  .then((data) => {
    // Filter the data for the specific currencies
    const currencies = ["BTC", "ETH", "XRP", "LTC", "BCH"];
    const filteredData = data.data.filter((item) =>
      currencies.includes(item.symbol)
    );

    // Update the HTML content for each currency
    filteredData.forEach((item, index) => {
      const cryptoInfo = cryptoContainer.children[index];
      const iconTitle = cryptoInfo.querySelector(".icon-title");
      const ammount = cryptoInfo.querySelector(".ammount");

      iconTitle.querySelector("img").src = `images/${item.name}.png`;
      iconTitle.querySelector("h5").textContent = item.symbol;
      iconTitle.querySelector("p").textContent = item.name;

      ammount.querySelector("h2").textContent = `$${item.price_usd}`;
      ammount.querySelector("p").textContent = `${item.percent_change_24h}%`;
    });
  })
  .catch((error) => {
    console.error(error);
  });