// ALAB 316.4
const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorMessage = document.getElementById("errorDisplay");
//errorMessage.style.display = "flex"

// Part 3
function validateRegistration(e) {
  e.preventDefault();
  const regInputs = registrationForm.elements;
  const username = regInputs["username"];
  let userValid = usernameValidation(username);
  if (userValid !== null) {
    username.focus();
    displayErrorMessage(userValid);
  }
  else{
    errorMessage.style.display = "none"
  }
  const email = regInputs["email"] //.value.trim();
  let emailValid = emailValidation(email)
  if(typeof emailValid == "string"){
    email.focus()
    displayErrorMessage(emailValid)
  }
  else{
    errorMessage.style.display = "none"
  }

  const password = regInputs["password"] //.value;

  const passwordCheck = regInputs["passwordCheck"].value;
  
  let passwordValid = passwordValidation(password,passwordCheck)
}

function usernameValidation(user) {
  let username = user.value //.trim();
  let usernameSetLen = new Set(username).size;
  let noSpecialChars = "[^A-Za-z0-9]"
  console.log(username.match(noSpecialChars))
  if (username.length == 0) {
    return "The username cannot be blank.";
  }  else if (usernameSetLen < 2) {
    return "The username must contain at least two unique characters.";
  } else if (username.length < 4) {
    return "The username must be at least four characters long.";
  }
  else if (username !== username.trim()) {
    return "The username cannot contain any special characters or whitespace.";
  }
  else {
    return null; //something went wrong
  }
}

function emailValidation(email) {  
    let mail = email.value
    const regExample = /\w+@example.com/
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/
    if(regExample.test(mail)){
        console.log("invalid email")
        return "The email must not be from the domain 'example.com.'"
    }
    else if(emailRegEx.test(mail)){
        console.log("Valid email")
        return email
    }
    else{
        return null
    }
}

function passwordValidation(password, passCheck) {
    let pw = password.value
    let pwCheck = passCheck.value
    if(pw !== pwCheck){ return "Both passwords must match."}
    const pwRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
    if(pwRegEx.test(pw)){
      return null
    }
    else{
      return `Passwords must be at least 12 characters long.
Passwords must have at least one uppercase and one lowercase letter.
Passwords must contain at least one number.
Passwords must contain at least one special character.`
    }
}

function displayErrorMessage(errorString) {
  errorMessage.replaceChildren();
  const p = document.createElement("p");
  p.textContent = "Error: " + errorString;
  errorDisplay.appendChild(p);
  errorDisplay.style.display = "inline";
}

//Part 4
function termsAndConditions(e){
  e.preventDefault()
 const terms = registrationForm.elements["terms"].checked;
  if(!terms){
    displayErrorMessage("The terms and conditions must be accepted.")
  }
  else{
    errorMessage.style.display = "none"
  }
}

function formSubmission(registrationForm) {}
registrationForm.addEventListener("submit", validateRegistration);
registrationForm.addEventListener("submit", termsAndConditions)
//validateRegistration();

// Test data:
// aaa sam ndias
// sdnigh@example.com ahifoe@gmail.com
// cornishHen133o1! coooooNe 
// 
// Part 4
