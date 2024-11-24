var scriptProperties = PropertiesService.getScriptProperties();

function get_tenant_code() {  
  var tenant_code = scriptProperties.getProperty('tenant_code');
  return tenant_code;
}

function get_token() {
  var url_token = "https://na.uemauth.vmwservices.com/connect/token";
  var client_id = scriptProperties.getProperty('client_id');
  var client_secret = scriptProperties.getProperty('client_secret');

  var body_token = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret
  };

  //Parameters for searching users
  var params_token = {
    "method": "POST",
    "payload": body_token,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(url_token, params_token);
  //Logger.log(response);

  var return_data = JSON.parse(response);
  var return_token = return_data.access_token;
  Logger.log(return_token);
  return return_token;
}

//DEPRECATED
/*function get_credentials() {
  var ui = SpreadsheetApp.getUi();
  var username_prompt = ui.prompt("Please enter Airwatch username for authentication: ");
  var username_button = username_prompt.getSelectedButton();  

  if (username_button === ui.Button.OK) { //If user presses OK or ENTER button after inputting username.
    var username = username_prompt.getResponseText();                                             
    var username = username.toLowerCase(); //Converts username to lower case.

    //if (username.startsWith("costco\\",0)) { //Adds domain "costco\" to username if needed.
    //  //Logger.log("Username is in correct format.");
    //} else {
    //  username = "costco\\" + username;
    //}
    
    //Logger.log("Authenticating user: " + username);

    var password_prompt = ui.prompt("Please enter your password below with CAUTION as PASSWORD will be FULLY VISIBLE: ");
    var password_button = password_prompt.getSelectedButton();
    if (password_button === ui.Button.OK) { //If user presses OK or ENTER button after inputting password.
      var password = password_prompt.getResponseText();
      var credentials = "Basic " + Utilities.base64Encode(username + ':' + password); //Encodes username and password in Base64 for Airwatch API.
      return credentials; //Returns encoded credentials.
    } else if (password_button === ui.Button.CLOSE) { //If user closed out of username prompt.
      //Logger.log("The user closed the prompt dialog.");
      return null; 
    }
  } else if (username_button === ui.Button.CLOSE) { //If user closed out of password prompt.
    //Logger.log("The user closed the prompt dialog."); 
    return null;
  }  
}*/
