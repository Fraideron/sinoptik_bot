const needle = require('needle');
const cheerio = require('cheerio');

class Sinoptik {
    constructor(city) {
        this.siteName = 'https://sinoptik.ua/'
        this.city = city;
    }



    getDescription() {
        return new Promise((resolve, reject) => {
            const link = encodeURIComponent(`погода-${this.city.toLowerCase()}`);
            needle.get(this.siteName + link, (error, response, body) => {
                if (error) {
                    reject(error);
                };
                const $ = cheerio.load(body);
                const result = $('div.description').text(); 
                                
                resolve(result);
            });
        })
        
    }

}
module.exports = Sinoptik;
