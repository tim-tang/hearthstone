/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {

  //Array of application names.
  app_name : ['hearthstone_srv'],

  //Your New Relic license key.
  license_key : '84264dd9f7fa8b72c7178d8fab501c22695d9e93',
  logging : {
     //Level at which to log. 'trace' is most useful to New Relic when diagnosing
     //issues with the agent, 'info' and higher will impose the least overhead on
     //production applications.
    level : 'info'
  }
};
