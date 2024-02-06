# Digital Dev (EdTech Platform)

First I started building backend

## day 1

Started building models

Add one feature when user signup it get otp on email

## day 2

## started building controllers

builded two different controllers

In Auth.js

- sendOtp controller (This controller generate otp and before creating entry to OTP database send email containg otp)
- signUp controller (if otp enter by client is correct then registered user data to database and create account)
- signIn controller (user login with email and password if user email exist in database then check password and generate jwt token and send token as cookie and login successful)
- changePassword controller

In ResetPassword.js

- resetPasswordToken controller = This controller is generating token and also adding this token and expiry to USER model after that sending url containing token email to user to reset password
- resetPasswordinDb controller = find user using a token and update password whatever new password is enterend by user save that password in database

## builded middleware

In auth.js

- checkForAuthentication = This middleware will extract token and verify token using secret key and decode the token to data
- isStudent => This middleware is useful for authorization and this middleware will check accountType(req.user.accountType !== "Student") if true next() is called
- isInstructor => This middleware is useful for authorization and this middleware will check accountType(req.user.accountType !== "Instructor") if true next() is called
- isAdmin => This middleware is useful for authorization and this middleware will check accountType(req.user.accountType !== "Admin") if true next() is called

## day 3

first we create category api controller (controlled by admin)
then we create createCourse api controller (by instructor)

### Category.js

- createCategory controller => In this controller we fetch data from req.body and save data in database using CATEGORY Model
- showAllCategory controller -> This controller will show all the category using CATEGORY model

### Course.js

#### createCourse controller =>

- Fetch data from(req.body) and image file from(req.files.thumbnailImage)
- do some validation
- find out instructor id and category id from database
- file (image) upload to cloudinary
- create entry of new course using COURSE model
- add the new course to the USER Schema of Instructor
- add the course to the CATEGORY model
- atlast return response

#### showAllCourses controller

This controlller will show all courses

## day 4

we create Section api controller (by instructor)
we create subSection api controller (by instructor)
we create profile controller

## day 5

payment integration

Payment.js

- its a two step process
- we want to capture payment => payment initiated || order created

## day 6

getCourseDetails in course controller
3 controller in ratingandreview
1 controller in category
contactUs controller

## day 7

index.js
