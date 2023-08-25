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
- todo views à la catbox using templates
