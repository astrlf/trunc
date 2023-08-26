# 🔗 trunc

a small url shortener

![screenshot](.github/assets/website.png)

# 🚀 usage

running `trunc` requires a postgres database, nodejs and pnpm  
we provide a docker-compose file for the database

```bash
$ pnpm i
$ pnpm db:up # if you're using docker-compose
$ pnpm db:migrate
$ pnpm dev
```

# 📝 notes

- switch to raw sql queries instead of prisma but still use prisma for migrations
- route to get info based on a slug
- view to inspect slug information
- handle urls with views
- ~~implement better logging (make use of NODE_ENV better, maybe switch to winston/pino/morgan/whatever)~~
- add proper log rotation and add logging in routes for debugging
- get better error handling, use a monadic result library if needed