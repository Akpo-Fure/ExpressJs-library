const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../dist/app')
require("dotenv").config();
jest.setTimeout(100000); 


 let mongod

beforeAll(async () => {
mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
await mongoose.connect(uri, 
  {dbName: 'Akpofure-library'}
  );
  }, 60000);


afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
  app.close()
});

describe("GET all books from database", () => {
    it("should return all books", async () => {
      const res = await request(app).get("/books/");
      console.log("What I got from test database ", res.body)
      expect(res.statusCode).toBe(200);
    });
  });

  

describe("GET a book by id", () => {
    it("should return a book", async () => {
      const res = await request(app).get("/books/64e1c6e78bccfcd550233d11");
      expect(res.statusCode).toBe(200);
    });
  }
);  

