'use strict';

const express = require('express');
const { rateLimit } = require('express-rate-limit');
const app = express();
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apiDocs/swagger.json');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

const logger = require('./logger');


db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);

    // attach swagger for api documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        // store: ... , // Use an external store for more precise rate limiting
    })
    
    // Apply the rate limiting middleware to all requests
    app.use(limiter)

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});

