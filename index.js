const fetch = require("node-fetch");
const cheerio = require("cheerio");
const url = require("url");

class Search {
    constructor () {
        this.__query = null;
        this.__host = "www.google.com";
        this.__lang = "en";
    }

    /**
     * @ignore
     */
    __parseBody (html) {
        const $ = cheerio.load(html);
        const results = [];

        $("h3.r > a").each(function (i, anchor) {
            let elem = $(anchor);
            let plink = url.parse(elem.attr("href"), true);

            if(plink.pathname === "/url") {
                let link = plink.query.q;
                results.push( link );
            }
        });

        return results;
    }

    /**
     * @param {String} queryString 
     */
    query (queryString) {
        this.__query = queryString;
        return this;
    }

    /**
     * @param {String} hostname 
     */
    host (hostname) {
        this.__host = hostname;
        return this;
    }

    /**
     * @param {String} langstring 
     */
    lang (langstring) {
        this.__lang = langstring;
        return this;
    }

    exec () {
        return new Promise((res, rej) => {
            fetch(`https://${this.__host}/search?q=${encodeURIComponent(this.__query)}&hl=${encodeURIComponent(this.__lang)}`)
            .then(r => r.text())
            .then(body => {
                let results = this.__parseBody(body);
                res(results);
            })
            .catch(err => rej(err));
        });
    }
}

module.exports = Search;