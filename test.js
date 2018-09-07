const GoogleSearch = require("./index");

new GoogleSearch()
    .host("www.google.com")
    .lang("en")
    .query("rick astley never gonna give you up youtube")
    .exec()
    .then(results => {
        console.log(results[0]);
    });