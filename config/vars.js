/**
 * File to set environment variables that can be used to switch between different environments, viz dev/staging/prod
 */

// Set the ENVIRONMENT variable to point to the right environment

exports.ENV = 'development';


//switch the connection handles depending on the environment
switch(exports.ENV){
    case 'development':
        exports.APP_PORT = 4000;
        exports.SSL_ENABLED = false;

        break;

}
