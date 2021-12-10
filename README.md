# dyte-task

A URL shortner with baked in url analytics

- captures total redirects
- collects total unique visitors(using client ip)
- extracts geo-location data like city/country from captured ip.

## getting started

**requirements**

- docker
- docker-compose

start the application using following command

```bash
docker-compose -f ./deployment/docker-compose.yaml up -d
```

## interact with application

for convenience following user and url have been added as fixtures

- user
```
email: user1@mail.com
password: test123
```

- url
```
url: https://github.com/Akshit8
code: gha
```

redirect to shortened url by visiting http://localhost:3000/gha
<br>
check out API docs [here](https://documenter.getpostman.com/view/11236795/UVR4N9mh).

## developer utils

- analyze db and database schema using [mongo-ui](http://localhost:8001).
- see applications logs extacted by **fluentd** at `./deployement/logs`.

## Author

**Akshit Sadana <akshitsadana@gmail.com>**

- Github: [@Akshit8](https://github.com/Akshit8)
- LinkedIn: [@akshitsadana](https://www.linkedin.com/in/akshit-sadana-b051ab121/)