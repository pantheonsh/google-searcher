# google-searcher
A tiny, chainable library for scraping Google with Node.js

## Example
```js
const GoogleSearch = require("./index");

new GoogleSearch()
    .host("www.google.com")
    .lang("en")
    .query("rick astley never gonna give you up youtube")
    .exec()
    .then(results => {
        console.log(results[0]); // https://www.youtube.com/watch?v=qb_hqexKkw8
    });
```