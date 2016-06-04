# Bitcoin price alert REST Endpoint
This is the backend module of the bitcoin price monitoring app. In this project, we are using Appbase webhooks to notify the users when the condition specified by them is satisfied.    

#configuration    
Edit the config.json with the following variables:    
```
{
 "appname": "your_app_name",
 "username": "app_username",
 "password": "app_password",
  "type": "index_type",
  "sendgridKey": "your_sendgrid_key"
}
```

#Running    
First install the dependencies by running following command:    
```
npm install
```

Then run the server by following command:     
```
node app.js
```    
