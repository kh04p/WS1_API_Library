function api_search_user(username,credentials) {
  var uri_search_user = "https://XXXXXX.awmdm.com/api/system/users/search?username=" + username; //Used for searching similar usernames.

  //Header for searching users
  var tenant_code = get_tenant_code();
  var header_search_user = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Content-Type": "application/json;version=1"
  };

  //Parameters for searching users
  var params_search_user = {
    "method": "GET",
    "headers": header_search_user,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(uri_search_user, params_search_user);
  return response;
}

function api_search_og(og_id,credentials) {
  var uri_search_og = "https://XXXXXX.awmdm.com/api/system/groups/" + og_id; //Used for searching similar usernames.

  //Header for searching users
  var tenant_code = get_tenant_code();
  var header_search_og = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Content-Type": "application/json;version=1"
  };

  //Parameters for searching users
  var params_search_og = {
    "method": "GET",
    "headers": header_search_og,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(uri_search_og, params_search_og);
  return response;
}

function test(){
  var token = get_token();
  var response = api_search_og("570",token);
  Logger.log(response);
}

function api_search_usergroup(group_name,credentials) {
  var uri_search_group = "https://XXXXXX.awmdm.com/api/system/usergroups/custom/search?groupname=" + group_name; //Used for searching user groups.

  //Header for searching groups
  var tenant_code = get_tenant_code();
  var header_search_group = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Content-Type": "application/json",
    "Accept": "application/json;version=1"
  };

  //Parameters for searching groups
  var params_search_group = {
    "method": "GET",
    "headers": header_search_group,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(uri_search_group, params_search_group);
  return response;
}

function api_create_user(username,credentials,password,security,staging,email,email_username,first,last,display_name,group_id,role,message_type,attribute1,attribute2,attribute3,attribute4) {
  var uri_create_user = "https://XXXXXX.awmdm.com/api/system/users"; //Used for adding new users.

  //Header for adding user
  var tenant_code = get_tenant_code();
  Logger.log("tenant:" + tenant_code);
  Logger.log("creds:"+credentials);
  var header_create_user = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Content-Type": "application/json",
    "Accept": "application/json;version=2"
  };

  //Compiles user's enrollment info into API body
  var body = JSON.stringify({
    "UserName": "" + username + "",
    "Password": "" + password + "",
    "Status": "TRUE",
    "SecurityType": "" + security + "",
    "DeviceStagingEnabled": staging,
    "EmailUsername": "" + email_username + "",
    "EmailAddress": "" + email + "",
    "FirstName": "" + first + "",
    "LastName": "" + last + "",
    "DisplayName": "" + display_name + "",
    "OrganizationGroupUuid": "" + group_id + "",
    "Role": "" + role + "",
    "MessageType": "" + message_type + "",
    "CustomAttribute1": "" + attribute1 + "",
    "CustomAttribute2": "" + attribute2 + "",
    "CustomAttribute3": "" + attribute3 + "",
    "CustomAttribute4": "" + attribute4 + "",
    "costCenter": "" + username + ""
  })

  //Parameters for adding new users.
  var params_create_user = {
    "method": "POST",
    "payload": body,
    "headers": header_create_user,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(uri_create_user, params_create_user);
  Logger.log(response.getResponseCode()); 
  return response; 
}

function api_addtousergroup(user_id,credentials,group_name) {
  // SEARCH FOR GROUP ID USING GROUP NAME ---------------------------------------------------------------------------------------------------------------
  //API call.
  //var response_search = UrlFetchApp.fetch(uri_search_group, params_search_group);
  var response_search = api_search_usergroup(group_name,credentials)
  var response_data = JSON.parse(response_search);
  if (response_data.Total > 1) {
    return "More than 1 group found for " + group_name + ". Please check and try again.";
  } 
  var groupid = response_data.UserGroup[0].UserGroupId;

  // USE GROUP ID TO ADD USER TO GROUP ------------------------------------------------------------------------------------------------------------------
  var uri_addtogroup = "https://XXXXXX.awmdm.com/api/system/usergroups/"+groupid+"/user/"+user_id+"/addusertogroup";

  //Header for searching groups
  var tenant_code = get_tenant_code();
  var header_addtogroup = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Content-Type": "application/json",
    "Accept": "application/json;version=1"
  };

  var body = {
    "usergroupid": groupid,
    "enrollmentuserid": user_id
  };
  var params_addtogroup = {
    "method": "POST",
    "payload": body,
    "headers": header_addtogroup,
    "muteHttpExceptions": true
  };

  //API call.
  var response = UrlFetchApp.fetch(uri_addtogroup, params_addtogroup);

  return response;
}
