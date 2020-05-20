const request = require('request');
const fs = require('fs');
let xmlParser = require('xml2json');

const cron = require('node-cron');

const url = 'http://api.cba.am/exchangerates.asmx';
const h = {
    'SOAPAction': 'http://www.cba.am/ExchangeRatesLatest',
    'Content-Type': 'text/xml; charset=utf-8',
};
const xml = fs.readFileSync('xml.xml', 'utf-8');

cron.schedule('10 10 10 * * * ', () => {
    request.post({
        url: url,
        headers:h,
        body: xml,
    }, function (error, response, body) {
        let newData=[];
        if (!error && response.statusCode == 200) {
            let jsonobj=JSON.parse(xmlParser.toJson(body));
            let jsonData =jsonobj['soap:Envelope']['soap:Body']
                .ExchangeRatesLatestResponse
                .ExchangeRatesLatestResult;
            newData.push( {'date':jsonData.CurrentDate})
            jsonData.Rates.ExchangeRate.forEach(function (item) {
                if (item.ISO == 'USD' || item.ISO == 'EUR' ||item.ISO ==  'RUB' ){
                    item.Rate= +item.Rate;
                    newData.push(item);
                }
            });

            let jsonExchange= JSON.stringify(newData,'\n',4);
            fs.unlinkSync('exchangerate.json');
            fs.writeFileSync('exchangerate.json', jsonExchange)


        }
    });

});


