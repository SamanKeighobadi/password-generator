// Select DOM Elements
const result = document.getElementById("result");
const lengthInput = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const clipBoard = document.getElementById("clipboard");

////?   Event Listeners ?////

// Copy password to clipboard button
clipBoard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

// Generate Password Event
generateButton.addEventListener("click", () => {
  const length = +lengthInput.value;
  const hasLower = lowercase.checked;
  const hasUpper = uppercase.checked;
  const hasNumbers = numbers.checked;
  const hasSymbol = symbols.checked;

  result.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumbers,
    hasSymbol,
    length
  );
});

// Genrate Password Function
const generatePassword = (upper, lower, number, symbol, length) => {
  //1. initialize password variabel
  let generatePassword = "";
  const typeCount = upper + lower + number + symbol;

  //2. Filter out unchecked types
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  //3. Loop over length call generator function for each type
  if (typeCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach((type) => {
      const functionName = Object.keys(type)[0];

      generatePassword += randomFunctions[functionName]();
    });
  }

  //4. And final password to the password vaiabel and return

  const finalPassword = generatePassword.slice(0, length);

  return finalPassword;
};

////?  Generate Options Function ?////

const randomLowercaseLetters = () => {
  // 97 means number of Browser characters on keyboard
  // 26 means the number of English Alphabet
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const randomUppercaseLetters = () => {
  // 65 means number of Browser characters on keyboard
  // 26 means the number of English Alphabet keyboard
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const randomNumbers = () => {
  // 48 means number of Browser characters on keyboard
  // 26 means the number of Numbers Key on keyboard
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const randomSymbols = () => {
  const symbols = "!@#$%^&*_+?.,~";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunctions = {
  lower: randomLowercaseLetters,
  upper: randomUppercaseLetters,
  number: randomNumbers,
  symbol: randomSymbols,
};
