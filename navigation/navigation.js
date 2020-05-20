const fs=require('fs')
const Category = require('../models/category');
Category.getNavigationMenu()
    .then(([categories]) => {

        fs.writeFileSync(__dirname + '/menu.json', JSON.stringify(categories, '\n', 4));

    });
