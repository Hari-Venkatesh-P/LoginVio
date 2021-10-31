## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

Log into the Firebase console via Terminal.
Make a production build.
Run firebase deploy

## Application Workflow

User will be asked to enter his email.
User has to provide the correct verification code sent to his mail , within a chance of three times.
user has an option resend the verification code to email  , with a maximum of three times.
Once the User completes his verfication , He can sign up with his details and Referral Code if any.
After sucessful signup , user can see his dashboard.

For registered user , after verifying the token sent to his email , user can view his dashboard.


