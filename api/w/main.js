const config = require(__dirname + '/config');
const fs=require('fs');
const schedule=require('node-cron');
const fetch=require('node-fetch');
class weather_schedule {
    constructor() {
        this.ApiKey = config.apiKey;
        this.cities = config.cities;
        this.jsonPath = config.jsonPath;
        if(!fs.existsSync(__dirname+'/'+config.jsonPath)){
            fs.mkdirSync(__dirname+'/'+config.jsonPath, { recursive: true });
        }
        this.startSchedule();
    }
    getUrl(city) {
        let id = city.id ? city.id : 616051; // 616051 YEREVAN  id
        return `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${this.ApiKey}&units=metric`;
    }
    getFilePath(key){
        return __dirname+'/'+this.jsonPath +'/'+key + '.json';
    }
    getNextCityData( i = 0) {
        let THIS = this;
        if (Array.isArray(this.cities) && this.cities.length) {
            (async ()=>{
                while (i < this.cities.length){
                    let city = this.cities[i];
                    let response = await fetch(THIS.getUrl(city), {
                        "credentials": "include",
                        "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "en-US,en;q=0.9",
                            "cache-control": "no-cache",
                            "pragma": "no-cache",
                            "upgrade-insecure-requests": "1"
                        },
                        "referrerPolicy": "no-referrer-when-downgrade",
                        "body": null,
                        "method": "GET",
                        "mode": "cors"
                    });
                    let json = await response.json();
                    let filePath = await THIS.getFilePath(city.key);
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    fs.writeFileSync(filePath, JSON.stringify(json, '\n', 4));
                    i++;
                }

            })();
        }
    }
    startSchedule(){
        let THIS=this;
        this.schedule = schedule.schedule(config.schedule, function(){
            THIS.getNextCityData(0);
        });
    }
}
new weather_schedule();
