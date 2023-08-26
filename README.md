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

- ~~handle errors with views~~
  - this is not as straightforward as it seems, since i'm using plain HTML files as views, i can't just pass a variable to the view and have it render the error message, i'd have to use a templating engine like ejs or pug, which i don't want to do for this project
- ~~implement better logging (make use of NODE_ENV better, maybe switch to winston/pino/morgan/whatever)~~
- ~~add proper log rotation and add logging in routes for debugging~~
