# Testing
Current tests take 21 seconds

## Setup
- start up backend with docker-compose or docker
- open terminal for Node container (click on button in Docker Desktop or use Docker command ```docker exec -it <docker id> /bin/sh```)
- ```npm run test```

## GUI
- EJS renders page from views/pages
- JSDom queries rendered page for elements
- Jest verifies value of element text

## API
- Jest verifies videoController results from CRUD operations on real MongoDB database in container

## References
https://developer.okta.com/blog/2020/01/27/best-nodejs-testing-tools
https://stackoverflow.com/questions/63426871/how-to-unit-test-ejs-files-that-produced-by-express-server