const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../dist/app');  
require("dotenv").config();
jest.setTimeout(100000); 
const Author = require('../dist/models/authorModel');
// const signup = require('../dist/controllers/authorController.js')





describe.skip("GET all authors from database", () => {
    it("should return all authors", async () => {
      const res = await request(app).get("/authors/");
      expect(res.statusCode).toBe(200);
    });
  }
);