// Assignment Code
var generateBtn = document.querySelector("#generate");
//Different characters types
var lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
var upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbersChar = "1234567890";
var specialChar = "~!@#$%^&*<>?[]{}";
var passwordLength;
var upperCaseCheck;
var numbersCheck;
var specialsCheck;
//Determine password length
function determineLength() {
  var passwordLength = prompt("How many characters would you like your password to be? (Choose between 8-128 characters ")

  if (passwordLength < 8){
    alert("Password must be between 8-128 characters, please choose again");
    determineLength();
  } else if (passwordLength >128){
    alert("Password must be between 8-128 characters, please choose again")
    determineLength();
  } else if (passwordLength === NaN){
    alert("Password must be between 8-128 characters, please choose again")
    determineLength();
  } else{
      alert("The next three screens will ask you what types of characters you would like to be included in your password.\nIf you choose 'No' for all, your password will only contain lowercase letters.");
  }
  return passwordLength;
  }

  //Checking if user wants to include uppercase letters in their password
  function determineUpperCase(){
    upperCaseCheck = prompt("Do you want to include uppercase letters in your password? \n(Y)es or (N)o")
    upperCaseCheck = upperCaseCheck.toLowerCase();
    if(upperCaseCheck === "" || upperCaseCheck === null){
      alert("Please enter Yes or No for response")
      determineUpperCase();
    } else if(upperCaseCheck === "yes" || upperCaseCheck === "y"){
      upperCaseCheck === true;
      return upperCaseCheck;
    } else if(upperCaseCheck === "no" || upperCaseCheck === "n"){
      upperCaseCheck === false;
      return upperCaseCheck
    } else{
      alert("Please enter Yes or No for response");
      determineUpperCase();
    }
    return upperCaseCheck;
  }
//Checking if users want to include numbers in their password
  function determineNums(){
    numbersCheck = prompt("Do you want to include numbers in your password? \n(Y)es or (N)o")
    numbersCheck = numbersCheck.toLowerCase();
    if (numbersCheck === "" || numbersCheck === null){
      alert("Please enter Yes or No for response")
      determineNums();
    }else if (numbersCheck === "yes" || numbersCheck === "y"){
      numbersCheck === true;
      return numbersCheck;
    }else if (numbersCheck === "no" || numbersCheck === "n"){
      numbersCheck === false;
      return numbersCheck;
    }else {
      alert("Please enter Yes or No for resposne")
      determineNums();
    }
  }
  //function used to check if the user wants to include special chatacters in their password
  function determineSpecials() {
    specialsCheck = prompt("Do you want to include Special characters in your password? \n(Y)es or (N)o")
    specialsCheck = specialsCheck.toLowerCase();
    if (specialsCheck === "" || specialsCheck === null){
      alert("Please enter Yes or No for response")
      determineSpecials();
    }else if (specialsCheck === "yes" || specialsCheck === "y"){
      specialsCheck === true;
      return specialsCheck;
    }else if (specialsCheck === "no" || specialsCheck === "n"){
      specialsCheck === false;
      return specialsCheck;
    }else {
      alert("Please enter Yes or No for resposne")
      determineSpecials();
    }
  }
// Generate password functions calls previous 4 functions to determine how to write the password
function generatePassword(){
  determineLength();
  console.log(passwordLength);
  determineUpperCase();
  console.log(upperCaseCheck);
  determineNums();
  console.log(numbersCheck);
  determineSpecials();
  console.log(specialsCheck);

  var characters = lowerCaseChar;
  var password = "";
  if (upperCaseCheck && numbersCheck && specialsCheck){
    characters += upperCaseChar + numbersChar + specialChar;
  }else if (upperCaseCheck && numbersCheck){
    characters += upperCaseChar + numbersChar;
  }else if (upperCaseCheck && specialsCheck){
    characters += upperCaseChar + specialChar;
  }else if (numbersCheck && specialsCheck){
    characters += numbersChar + specialChar;
  }else if (upperCaseCheck){
    characters += upperCaseChar;
  }else if (numbersCheck){
    characters += numbersChar;
  }else if (specialsCheck){
    characters += specialChar;
  }else {
    characters === lowerCaseChar;
  }
  //using Math.floor and Math.random methods to generate passwords with the determined length with charAt method to randomly select characters
  for (var i = 0; i < passwordLength; i++){
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var password1 = "";
  password1 = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password1;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
