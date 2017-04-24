# Cloud Elements Starter App
This basic application demonstrates how some of the fundamental features of the Could Elements platform can be used.

## Installation & Setup
1. If you don't have `node` and `npm` installed, do [that](https://docs.npmjs.com/getting-started/installing-node) first.

> __PROTIP:__ `node` version must  be >= `v4.0.0`

Install the node dependencies.

```bash
# Navigate to this directory
$ cd intro-app

# Install all necessary npm packages:
$ npm install
```

2. Create an https tunnel and point it to your localhost
> Hint: Use ngrok.io

3. Create a Salesforce app per these instructions: https://developers.cloud-elements.com/docs/elements/salesforce/salesforce-endpoint-setup.html and write down the `clientId` and `secret`.  Enter a redirect URI in the Salesforce app that has this structure: ngrokTunnel + "/callback"

4. Create a Cloud Elements environment at cloudelements.io and retrieve the User and Org secrets

5. The app will run on localhost:3000 - if you use a different port, change it in your `.env` file or directly in the `app.js`.

6. Add the ngrok tunnel and relevant Cloud Elements and SalesForce secrets and tokens to your .env file. Or add them directly to the application.
```
NGROK=https://12345xyz.ngrok.io
CE_USER_SECRET=your-secret-here
CE_ORG_SECRET=your-org-secret
SFDC_APP_KEY=your-sfdc-key
SFDC_APP_SECRET=your-sfdc-secret
PORT=3000
```
> Leave the `sfdcToken` and the `authHeaderSFDC` blank.
> TIP: After adding your keys & secrets, add the `.env` file to your `.gitignore` file.

7. Run the application

```
$ node app.js
```

## Using the App

8. Click the Salesforce icon to create an instance.

9. Create an organization level transformation for the SFDC instance and map it in the console.  Name it commonContact and it should only have the fields firstname, lastname, and email (mapped to FirstName, LastName, and Email)

10. Enter a contact's first, last name, and email to create a contact from the app UI.

11. Enter a contact in the Salesforce account.  Wait 2 minutes and then click on the "Get Contact" download button.  
