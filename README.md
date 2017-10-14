# StackOverflow powered by instantsearch.js

This app grabs all content for a tag and builds a search engine with faceted navigation.

Demo meteor.js https://is-so-test.herokuapp.com/
Demo algolia https://algolia-stackoverflow.herokuapp.com/


## The heroku way

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Set env var

Create an algolia account and choose which keywork on StackOverflow you want to index.

### Init Index

- visit /grab (blank page, no feedback -> to improve)
- then refresh /

### Notes

Add heroku to your git clone of this repo

```heroku git:remote -a YOUR_HEROKU_APP_NAME```

## Run locally

- ```npm install```
- ```npm start```
