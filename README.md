# 🔗 trunc

a small url shortener

```bash
$ pnpm i
$ pnpm db:up
$ pnpm db:migrate
$ pnpm dev

 trunc  running in DEVELOPMENT mode
 trunc  listening on port 3000
```

# 📝 notes

i don't really like express' api, i'm going to write a small wrapper/library for it soon and rewrite the project
switch to raw sql queries instead of prisma but still use prisma for migrations
todo views à la catbox using templates
