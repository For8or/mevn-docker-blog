# Stack MEVN dockerized

MongoDB, Express, Vue and NodeJS

Launch project

1. Start Docker Desktop
2. Run docker-compose command
```
docker-compose up --build
```

Okay, now your containers are running!

API >> `localhost:3000`
Client >> `localhost:8080`
Mongo Express >> `localhost:8081`

To create admin's user go to:

`localhost:3000/users/init`

Login data:

email: admin@admin.com
password: admin

