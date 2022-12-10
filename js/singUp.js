// ======== Function to Select element by id  ==========
let id = (id) => document.getElementById(id);
// ======== Function to Select element by class =========
let className = (classes) => document.getElementsByClassName(classes);

// =========== get all element with id======
let username = id("username"),
  email = id("email"),
  password = id("password"),
  confirmPassword = id("confirmPassword"),
  form = id("form");

// ========= get element with class name========
let errorMessage = className("error");

// ============= target form =========

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUsername(0);
  validateEmail(1);
  ValidatePassword(2);
  validateConfirmPassword(3);
  if (
    validateUsername(0) &&
    validateEmail(1) &&
    ValidatePassword(2) &&
    validateConfirmPassword(3)
  ) {
    singUp();
  }
  username.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
});

// ========== function validate ===============
const validateUsername = (num) => {
  if (username.value.trim() === "") {
    errorMessage[num].innerHTML = "username is required";
  } else if (username.value.trim().length < 5) {
    errorMessage[num].innerHTML =
      "username must be consist of 5 to 15 characters";
  } else if (!username.value.trim().match(/^[A-Za-z]+\d?[a-z]$/)) {
    errorMessage[num].innerHTML = "only letters and numbers are allowed";
  } else {
    errorMessage[num].innerHTML = "";
    return true;
  }
};

const validateEmail = (num) => {
  if (email.value.trim() === "") {
    errorMessage[num].innerHTML = "email is required";
  } else if (
    !email.value
      .trim()
      .match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
  ) {
    errorMessage[num].innerHTML = "Email is not valid";
  } else {
    errorMessage[num].innerHTML = "";
    return true;
  }
};

const passwordValidate = password.value.trim();
const ValidatePassword = (num) => {
  if (password.value.trim() === "") {
    errorMessage[num].innerHTML = "Password is required";
  } else if (
    !password.value
      .trim()
      .match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
  ) {
    errorMessage[num].innerHTML =
      "The Password must contain at least one uppercase, lowercase letter, number, symbol and minimum 8 characters";
  } else {
    errorMessage[num].innerHTML = "";
    return true;
  }
};

const confirmPasswordValidate = confirmPassword.value.trim();
const validateConfirmPassword = (num) => {
  if (confirmPassword.value.trim() === "") {
    errorMessage[num].innerHTML = "confirm Password is required";
  } else if (password.value.trim() !== confirmPassword.value.trim()) {
    errorMessage[num].innerHTML = "Password is not identical";
  } else {
    errorMessage[num].innerHTML = "";
    return true;
  }
};

// ================================================
const singUp = async () => {
  console.log("sing");
  await fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.massage);
      } else {
        localStorage.setItem("email", data.email);
        window.location.replace("succeed.html");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
