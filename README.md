
# Buildit@wiprodigital  Coding Test

Coding test completed by [Jozz Hart](me@jozzhart.com) for Buildit@wiprodigital.

## Intro

For the test I have used Angular 4.  It's overkill for simple requirements, but I have used it to showcase my skills using the framework.  It's a pretty straight forward implementation.  
- Use of observable for Open Weather API request.  Basic error handling with console log.  TODO - UI should show generic message to user.   
- Usage of http intercepter to append the API key from the environment config.  Makes it straight forward to use different API keys for dev and prod.
- Component for "Forecast Day"
- Using [Angular Material](https://material.angular.io/)
-  Tests and Istanbul coverage (see below)

### Additional Todo
- Further UI/UX work
- General production hardening, logging/analytics, etc.

## Setup

`npm install`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Unit tests

I wrote a couple of basic mocked unit tests for the weather service (responsible for loading the Open Weather API) and some simple integration tests for the main app component.  Ideally, these tests would be more extensive.

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## End-to-end tests

There's a token e2e test.  Further e2e tests could be written.

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Coverage

Run `npm run coverage`
View report in ./coverage/index.html

## Hosted version

The hosted version can be found here: [http://buildit.jozzhart.com/](http://buildit.jozzhart.com/).  It is hosted on S3 with cloudflare in front of it.