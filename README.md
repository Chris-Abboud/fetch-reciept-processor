# Overview

This Repository is my solution to the Fetch Rewards take home assessment. This problem was solved using a Node Express.js App. Although not specified in the requirements, I assumed that endpoints must require input validation and automated unit testing would be required for something nearing production ready standards.

## Endpoints:

### POST - /receipts/process

This endpoint takes in a body of a reciept formatted in JSON. This endpoint will then parse the reciept and determine the reward points value.

-   > This endpoint returns a JSON object with the ID of the reciept that was generated
-   > This endpoint will then store that ID and calculated Points Value in an internal memory database
-   > This endpoint will return status 200 on success, and status 400 on fail.
-   -   > Status 400 will be a result of incorrect input. All inputs must follow the schema specified in [schemas.js](./schemas.js)

### GET - /receipts/{id}/points

This endpoint takes in an ID in teh URL, and will return the reward points value for that ID.

-   > This endpoint returns a JSON object with the format: {ID: Points}
-   > This endpoing will return status 200 on success, and status 400 on fail
-   -   > Status 400 will be a result of incorrect input, OR if the ID does not exist in our database.

---

# How to Run the API

I have created a simple to use docker file that will be used to create our container. This app will run on port 3000, please ensure your local port 3000 is not occupied by another application. After git cloning the repository in your local system, ensure docker desktop is installed, then run the following command:

1. docker-compose build - This will build or images

To Run the application, do the following:

1. docker-compose up app

I have also taken the time to create an automatic testing suite.

# Run The Automated Test Suite:

1. docker-compose up test

You should see a total of 11/11 successful tests.
