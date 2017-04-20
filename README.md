# Cloud Elements Starter App
This basic application demonstrates how some of the fundamental features of the Could Elements platform can be used.

## Instructions
1. Create a Salesforce app per these instructions: https://developers.cloud-elements.com/docs/elements/salesforce/salesforce-endpoint-setup.html and write down the clientId and secret.  Enter a redirect URI in the app that has this structure: ngrokTunnel + "/callback"

2. Install Node: https://nodejs.org/en/

3. Create a Cloud Elements environment at cloudelements.io and retrieve the User and Org secrets

4. Create an ngrok tunnel (https) and point to your localhost

5. The app will run on localhost:3000 - if you use a different one, change it in app.js

6. Insert the ngrok tunnel and the CloudElementsUserToken and CloudElementsOrgToken and sfdcKey and sfdcSecret

var ngrok = "secure-local-port"; //also add callback redirect URI in the SFDC app
var authHeader = 'User CloudElementsUserToken, Organization CloudElementsOrgToken';
var sfdcKey = "";  
var sfdcSecret = "";

   Leave the sfdcToken and the authHeaderSFDC blank.  

7. Install your node modules with the command `npm install` from the directory that contains package.json and run the app by typing the command `node app.js` from the directory that contains the app.js file.

8. Click the Salesforce icon to create an instance.

9. Create an organization level transformation for the SFDC instance and map it in the console.  Name it commonContact

10. Enter a contact's first, last name, and email to create a contact from the app UI.

11. Enter a contact in the Salesforce account.  Wait 2 minutes and then click on the "Get Contact" download button.  
