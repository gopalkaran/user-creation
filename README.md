# Getting Started with User Profile Creation and Authenticaation


## Packages Used

### `redux`
### `react-redux`
### `react-router-dom`
### `axios`

## Project Flow

### SignIn

This component will take email id from user. upon clicking of the signin button, request email verification api will response with islogin and token. we will send email and token to the verify token component.

### Verify Token

Verify token component will take verification code , but only valid code is "112233" other than that if we used any other 6 digit alphanumeric code the we will get false status as reponse.
when the status will be false-
a) we will check for wrongEmailTokenCount, if it is 3 or more then we will send the user to the sign in page to start as fresh.

if the user put valid status code as "112233", status will become true-
a) If the status is true and islogin is true , user will be redirected to the dashboard.
b) If the status is true but islogin is false, user will be redirected to the sign up page.

### SignUp

In sign up page we are taking name, email, phone, referredcodekey, privacy policy as input from the user. Privacy policy is boolan checking whether user is accepting the policy or not. 
referredcodekey is optional means even if we dont provide input for it, we will have successful sign up. but if it is given , it will be only valid if it matches "MAYANK" else we will get unsuccessful sign up.
another thing that is token which we are passing in the post method along with other input is token , the token we got after verification of user referredcodekey. 


### Dashboard

Here I am basically showing the name , email and phone number of an uder after successful login or successful sign up operation. along with this there will be on sign out button in the dashboard page.
Signout api taking user id to sing out a particular user, and as it is using bearer token authentication so I needed to send bearer token as header to the sign out api to give permisson to do the sign out operation.





