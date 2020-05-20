const config = require('./config');
const fs = require('fs');
const ejs = require('ejs');
const cities = config.cities;
const icons = config.icons;
const jsonPath = config.jsonPath;

class Weather {
    getRenederedHTML(citySearch, lang = 'am') {
        if (!config.langList.includes(lang)) lang = 'am';
        return new Promise((resolve, reject) => {
            citySearch = (typeof citySearch == 'string') ? citySearch.toLowerCase() : '';
            let city = cities.filter((x) => {
                if (typeof x.likeName == 'string')
                    return x.likeName.toLowerCase().indexOf(citySearch) >= 0;
                return false;
            });
            city = (city.length) ? city = city[0] : cities[0];
            let filePath = this.getFilePath(city.key);
            
            if (fs.existsSync(filePath)) {
                let data = require(this.getFilePath(city.key));
                if (data) {
                    let renderdata = {};
                    renderdata.cityName = city['name_' + lang];
                    renderdata.icon = data && data.weather && data.weather[0] && data.weather[0].main && icons[data.weather[0].main] ? icons['Clear'] : '';
                    renderdata.temp = data.main.temp;
                    renderdata.cloud = data.clouds && data.clouds.all ? data.clouds.all : 0;
                    renderdata.wind = data.wind && data.wind.speed ? data.wind.speed : 0;
                    renderdata.humidity = data.main && data.main.humidity ? data.main.humidity : 0;
                    renderdata.ms = config.translation['ms_' + lang];
                    ejs.renderFile(__dirname + '/html/weather.html', { data: renderdata }, function (err, res) {
                        if (err) console.log(err);
                        return resolve(res)
                    });
                }
            }
            return resolve('');
        })
    }
    getFilePath(key) {
        return __dirname + '/' + jsonPath + '/' + key + '.json';
    }
}
module.exports = new Weather();



