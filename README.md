# Overview

This Repository is my solution to the Fetch Rewards take home assessment. This problem was solved using a Node Express.js App using Node V20. Although not specified in the requirements, I assumed that endpoints must require input validation and automated unit testing would be required for something nearing production ready standards.

## Endpoints:

### POST - /receipts/process

This endpoint takes in a body of a reciept formatted in JSON. This endpoint will then parse the reciept and determine the reward points value.

-   > This endpoint returns a JSON object with the ID of the reciept that was generated
-   > This endpoint will then store that ID and calculated Points Value in an internal memory database
-   > This endpoint will return status 200 on success, and status 400 on fail.
    >
    > -   > Status 400 will be a result of incorrect input. All inputs must follow the schema specified in [schemas.js](./schemas.js)

### GET - /receipts/{id}/points

This endpoint takes in an ID in the URL, and will return the reward points value for that ID.

-   > This endpoint returns a JSON object with the format: {ID: Points}
-   > This endpoint will return status 200 on success, and status 400 on fail
    >
    > -   > Status 400 will be a result of incorrect input, OR if the ID does not exist in our database.

---

# How to Run the API

I have created a simple to use docker file that will be used to create our container. This app will run on port 3000, please ensure your local port 3000 is not occupied by another application. After git cloning the repository in your local system, ensure docker desktop is installed, then run the following command:

1. `docker compose build` - This will build or images

To Run the application, do the following:

1. `docker compose up app`

After running, you can use postman to interact with it by sending a get requires to the url: `localhost:3000/reciepts/{id}/points` or post request to the url `localhost:3000/receipts/process` with the reciept as the body expressed as a JSON.

I have also taken the time to create an automatic testing suite.

# Run The Automated Test Suite:

1. `docker compose up test`

You should see a total of 11/11 successful tests.

# Final Thoughts

I actually really enjoyed working on this assignment. I have taken on dozens of person projects in the past, and they've followed the same process as I did for this one. I made sure to follow all best practices and something I would actually do in real production ready code. However, the only thing I would change if it actually was for production would be the database.

For the simplicity of the program, I used a simply dictionary as the data store. However, if this was something more production grade, I'd use an actual in-memory store database. As the requirements said you didn't want to install any databases or do anything complicated, I assume this was the best option. However I want to re-iterate that for something production grade, this would not be acceptable and I would create a database server instead such as a redis in memory server.

Moreover, I would of edited the response when it came to input validation. If input is incorrect, normally I'd like to relay to the user what part of their input was incorrect, but for the purpose of the requirements, I did not have specific response codes. I'd also want clarification as to how the dates are expressed, weather it was YEAR-MONTH-DAY or YEAR-DAY-MONTH, as it was tough to tell in the requirements. I'd also want to clarify the timezone that should be used for handling all of the calculations.

Another thing I added that was not in the requirements was to check that all body inputs were in JSON format, and if not, to let the user know. This way services and developers interacting with the API are able to get a basic idea of how we want data sent in.

Thank you for taking the time to review my application!
