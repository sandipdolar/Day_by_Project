const form = document.getElementById("registration-form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequiredValid = checkRequired([userName, email, password, confirmPassword]);

    let isFormValid =  isRequiredValid();

    if(isFormValid){
        const isUsernameValid = checkLength(userName,3,15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password,6,25);
        const idPasswordsMatch = checkPasswordMatch(password, confirmPassword);
    }
});

function checkLength(){
    
}

function checkRequired(inputArray){
    let isValid = true;

    inputArray.forEach(input => {

        if(input.value.trim() === ""){
            showError(input, `${formatFileName(input)} is required`);
            isValid = false;
        }else{
            showSuccess(input);
        }
    })
    return isValid;
}

function formatFileName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";

    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input, ){
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";

}