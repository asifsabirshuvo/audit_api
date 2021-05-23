require("dotenv").config();
const { app } = require("./index.js");
const mongoose = require("mongoose");
const axios = require("axios");
var qs = require('qs');

// beforeEach((done) => {
//     mongoose.connect("mongodb://localhost/auditCollection", { useNewUrlParser: true, useUnifiedTopology: true },
//         () => done());
// });

// afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(() => done());
//     });
// });

test("POST /api/v1/audit", async() => {

    const result = await axios.post('http://localhost:4000/api/v1/audit', {
        name: 'JOHN',
        address: 'LONDON',
        description: 'LONDON IS THE BEST CITY',
        latitude: 1.23,
        longitude: 5.34,
        createdBy: new Date().toISOString(),
        updatedBy: new Date().toISOString()
    });
    expect(typeof result.data.success).not.toBeFalsy();
    expect(typeof result.data.message).toBe('string');

});

test("GET /api/v1/audit", async() => {
    const result = await axios.get("http://localhost:4000/api/v1/audit");
    result.data.message.map(element => {
        expect(typeof element.name).toBe('string');
        expect(typeof element.address).toBe('string');
        expect(typeof element.description).toBe('string');
        expect(typeof element.latitude).toBe('number');
        expect(typeof element.longitude).toBe('number');
        expect(typeof element.code).toBe('string');
        expect(typeof element.createdAt).toBe('string');
        expect(typeof element.updatedAt).toBe('string');
    });
});