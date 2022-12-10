
const userEmail = document.querySelector(".mail");
console.log(userEmail)

const emailLink = document.createElement("a");
emailLink.href =  localStorage.getItem("email");
emailLink.innerText =  localStorage.getItem("email");
userEmail.appendChild(emailLink)