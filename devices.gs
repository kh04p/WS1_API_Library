function api_search_device(credentials, search_attribute, search_content) {
  var uri_search_device = "https://XXXXXX.awmdm.com/API/mdm/devices/extensivesearch?" //Used for searching similar usernames.
  var id = search_content;

  switch (search_attribute) {
    case "og_id": 
      uri_search_device = uri_search_device + "organizationgroupid=" + id;
      break;
    case "platform_id": 
      uri_search_device = uri_search_device + "platform=" + id;
      break;
    case "device_id": 
      uri_search_device = uri_search_device + "deviceid=" + id;
      break;
    case "device_attribute": 
      uri_search_device = uri_search_device + "customattributes=" + id;
      break;
    case "enrollment_status": 
      uri_search_device = uri_search_device + "enrollmentstatus=" + id;
      break;
    case "mac_address": 
      uri_search_device = uri_search_device + "macaddress=" + id;
      break;
    default:
      Browser.msgBox("Invalid user input, please try again with only a NUMBER.");
      return null;
  }

  //Header for searching users
  var tenant_code = get_tenant_code();
  var header_search_device = {
    "aw-tenant-code": tenant_code,
    "Authorization": "Bearer " + credentials,
    "Accept": "application/json"
  };

  //Parameters for searching users
  var params_search_device = {
    "method": "GET",
    "headers": header_search_device,
    "muteHttpExceptions": true
  };

  //Logger.log(header_search_device);
  //Logger.log(params_search_device);
  //Logger.log(uri_search_device);

  //API call.
  var response = UrlFetchApp.fetch(uri_search_device, params_search_device);
  return response;
}
