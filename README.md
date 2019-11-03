# Local SAS

A lightweight local replacement for the MSS SAS components. Use this instead of running SAS locally or connecting to LABS

**Requires NodeJS >= 8.0.0**

https://nodejs.org/en/

## Installation

After cloning the repository and installing node (and assuming that `node` is in your path)

    cd src
    npm i

Run locally with

    node bin/local-sas.js

Install globally

    npm i -g .

## Usage

    local-sas -h

    local-sas [-p 23009] [-h 127.0.0.1] [-v verbose] username
    -p  (Optional) Port number - defaults to 23009
  
    -h  (Optional) Host address - defaults to 0.0.0.0
  
    -v  (Optional) Verbosity - choose from log, error, warn, debug, info, verbose
  
    -x (Optional) Show the Web.config XML entry
    
    username (Required) This is the username that you want to be returned from SAS

## Web.Config XML

Display the XML format for your xml file

    local-sas mark.higham@dxc.com -x -p 8091

    <authenticationManager enabled="true" 
        ignoreInvalidSSL="true" 
        pointSolutionName="Anything You like e.g. MSS Portal v3" 
        redirectNonSecure="false" 
        authenticationServiceURL="http://0.0.0.0:8091" 
        localCachePeriod="5"
        inactivityTimeout="30">
        <authenticationMethods>
        <add name="Dev" />
        <add name="RSA" />
        <add name="GlobalPass" />
        </authenticationMethods>
    </authenticationManager>

