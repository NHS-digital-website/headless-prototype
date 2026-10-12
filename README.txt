Running Locally brXM
===============
    mvn clean verify
    mvn -P cargo.run

    Pre-requisites:
    - Java 21
    - Maven 3.9.6
    - Bloomreach Enterprise Nexus account

    https://docs.content.bloomreach.com/getting-started/your-first-project/prerequisites
    https://docs.content.bloomreach.com/build/service-plugins/bloomreach-maven-enterprise-repository-manual


Running Locally Next.js
===============
    npm install
    npm run dev

    Pre-requisites:
    - Node.js v20.19.0
    - NPM 10.8.2

    Documentation for SDKs - the app is already integrated no need to change anything.
    https://bloomreach.github.io/spa-sdk/docs/getting-started/


Once both apps are up and running you can access
===============

    http://localhost:3003/channelA
    http://localhost:3003/channelB


Postman setup for local
===============

    I have included in the sample-json directory different json files for different pages.
    You can use these json files to create a postman mock server and test the local setup.
    The endpoints the frontend is calling are configured inside the .env file. You can change the endpoints to point to your postman mock server.

    NEXT_APP_BRXM_ENDPOINT=http://localhost:8080/site/resourceapi
    NEXT_APP_BRXM_CHANNELS=channelA,channelB
    NEXT_APP_BRXM_ENDPOINT_CHANNELA=http://localhost:8080/site/channelA/resourceapi
    NEXT_APP_BRXM_ENDPOINT_CHANNELB=http://localhost:8080/site/channelB/resourceapi

    Make sure that the endpoints in the .env file are matching the endpoints of your postman mock server.
    And that the requested paths resolve correctly to the appropriate mock endpoints.
    For example, if you have a mock endpoint for channelA, the path should be /site/channelA/resourceapi.