var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userMail");
var userPasswordInput = document.getElementById("userPassword");
var welcomeElement = document.getElementById("welcomeMessage");

console.log(welcomeElement);

var welcomeMessage;
var usersList = [];

userNameRegex = /^[a-z0-9_-]{3,15}$/;
userMailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
userPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

if(localStorage.getItem('usersList') != null)
{
    usersList = JSON.parse(localStorage.getItem('usersList'));
}

function createUser()
{
    if(validateInput(userNameRegex,userNameInput)&
       validateInput(userMailRegex,userEmailInput)&
       validateInput(userPasswordRegex,userPasswordInput))
    {
        var user = {
            userName: userNameInput.value,
            userEmail: userEmailInput.value,
            userPassword: userPasswordInput.value
        };
        console.log(user);
        var userexist = checkIfUserExist(user);
        console.log('user exist state is: '+ userexist)
        
        
        if(userexist != true)
        {
            console.log('Not Exist');
            usersList.push(user);
            console.log(usersList);
            localStorage.setItem('usersList' , JSON.stringify(usersList));
            userEmailInput.parentElement.nextElementSibling.nextElementSibling.classList.add('d-none');
            resetInputs();
            console.log(usersList.length);
            location.href = './index.html';
        }
        else
        {
            console.log(welcomeElement);
            console.log('User Exist');
            userEmailInput.parentElement.nextElementSibling.nextElementSibling.classList.remove('d-none');
        }
    }
}

function checkIfUserExist(user)
{
    for(i=0 ; i<usersList.length ; i++)
    {
        if(usersList[i].userEmail == user.userEmail)
        {
            console.log('exist')
            return true;
        }
        else{
            console.log('not exist')
            return false;
        }
    }
}

function validateInput(regex , input)
{
    if(regex.test(input.value))
    {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.add('d-none');
        return true;
    }
    else
    {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.nextElementSibling.classList.remove('d-none');
        return false;
    }
}

function resetInputs()
{
    userNameInput.value = null;
    userEmailInput.value = null;
    userPasswordInput.value = null;
    userNameInput.classList.remove('is-valid','is-invalid')
    userEmailInput.classList.remove('is-valid','is-invalid')
    userPasswordInput.classList.remove('is-valid','is-invalid')
}

function validateCurrentUserData(userEmail,userPassword)
{
    for(var i=0 ; i< usersList.length ; i++)
    {
        if(userEmail.value != usersList[i].userEmail && userPassword.value == usersList[i].userPassword)
        {
            userEmailInput.nextElementSibling.classList.remove('d-none');
            userPasswordInput.nextElementSibling.classList.add('d-none');
            console.log('incorrect mail - correct password');
        }
        else if(userEmail.value == usersList[i].userEmail && userPassword.value != usersList[i].userPassword)
        {
            userEmailInput.nextElementSibling.classList.add('d-none');
            userPasswordInput.nextElementSibling.classList.remove('d-none');
            console.log('correct mail - incorrect password');
        }
        else if(userEmail.value != usersList[i].userEmail && userPassword.value != usersList[i].userPassword)
        {
            userEmailInput.nextElementSibling.classList.remove('d-none');
            userPasswordInput.nextElementSibling.classList.remove('d-none');
            console.log('correct mail - incorrect password');
        }
        else if(userEmail.value == usersList[i].userEmail && userPassword.value == usersList[i].userPassword)
        {
            welcomeMessage = "Welcome " + usersList[i].userName;
            localStorage.setItem('welcome',welcomeMessage);
            console.log(welcomeMessage);
            userEmailInput.nextElementSibling.classList.add('d-none');
            userPasswordInput.nextElementSibling.classList.add('d-none');
            console.log('correct mail - correct password');
            location.href = './home.html';
            // welcomeElement.innerHTML = welcomeMessage;
            // console.log(welcomeElement);
        }
    }
}

console.log(welcomeMessage);

function welcomMessage()
{
    console.log(welcomeElement);
    var welcome = localStorage.getItem('welcome');
    console.log(welcome);
    welcomeElement.innerHTML = welcome;
}

function logOutFunc()
{
    location.href = './index.html';
}


/*
new user ====> validate data ===> check if user exist 
####### creat account / forward to log in page
#### validate user account LogIn data
ERROR / Home Page
Log Out
*/