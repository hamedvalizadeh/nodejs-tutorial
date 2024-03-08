const express = require('express');
const expressHandlebars = require('express-handlebars');
const handler = require('./lib/handler');

const app = express();

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3003;

app.get('/', handler.home);
app.get('/about', handler.about);

app.use(handler.notFound);
app.use(handler.serverError);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on
    http://localhost:${port}` +
            '; press Ctrl-C to terminate.')
    })
} else {
    module.exports = app
}