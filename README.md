# StackOverflow powered by instantsearch.js

This app grabs all content for a tag and builds a search engine with faceted navigation.
Then it runs cron to keep it up to date.

Demo [https://is-so-test.herokuapp.com/]


## The heroku way

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Set env var

Create an algolia account and choose which keywork on StackOverflow you want to index.

### Init Index

visit /grab
Grab a coffee...
... done!
Visit /

### Notes
```heroku git:remote -a YOUR_HEROKU_APP_NAME```

## Run locally

```npm install```
```npm run postinstall```
```npm start```
