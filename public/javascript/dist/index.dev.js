"use strict";

require("@babel/polyfill");

var _login = require("./login");

var _book = require("./book");

var _updateSettings = require("./updateSettings");

/* eslint-disable */
// DOM ELEMENTS
var loginForm = document.querySelector('.form--login');
var signupForm = document.querySelector('.form--signup');
var logoutBtn = document.querySelector('.nav__el--logout');
var userDataForm = document.querySelector('.form-user-data');
var addBookForm = document.querySelector('.form--addbook');
var deleteBookForm = document.querySelector('.form--deletebook');
var updateBookForm = document.querySelector('.form--updatebook'); // DELEGATION

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var Email = document.getElementById('email').value;
    var Password = document.getElementById('password').value;
    (0, _login.login)(Email, Password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var AuthorName = document.getElementById('name').value;
    var Email = document.getElementById('email').value;
    var PhoneNumber = document.getElementById('phonenumber').value;
    var Password = document.getElementById('password').value;
    (0, _login.signup)(AuthorName, Email, PhoneNumber, Password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', _login.logout);
if (userDataForm) userDataForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var AuthorName = document.getElementById('name').value;
  var Email = document.getElementById('email').value;
  var PhoneNumber = document.getElementById('phonenumber').value;
  (0, _updateSettings.updateData)(AuthorName, Email, PhoneNumber);
});
if (addBookForm) addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var Title = document.getElementById('title').value;
  var DatePublished = document.getElementById('datepublished').value;
  var Description = document.getElementById('description').value;
  var PageCount = document.getElementById('pagecount').value;
  var Genre = document.getElementById('genre').value;
  var BookImage = document.getElementById('bookimage').value;
  var BookLandscapeImagesInput = document.getElementById('booklandscapeimages').value;
  var BookLandscapeImages = BookLandscapeImagesInput.split(',').map(function (url) {
    return url.trim();
  }); // Split URLs by comma

  var Summary = document.getElementById('summary').value;
  var Publisher = document.getElementById('author').value;
  (0, _book.addBook)(Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, Publisher);
});
if (deleteBookForm) deleteBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var BookID = document.getElementById('bookid').value;
  (0, _book.deleteBook)(BookID);
});
if (updateBookForm) updateBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var BookID = document.getElementById('bookid').value;
  var Title = document.getElementById('title').value;
  var DatePublished = document.getElementById('datepublished').value;
  var Description = document.getElementById('description').value;
  var PageCount = document.getElementById('pagecount').value;
  var Genre = document.getElementById('genre').value;
  var BookImage = document.getElementById('bookimage').value;
  var BookLandscapeImagesInput = document.getElementById('booklandscapeimages').value; // const BookLandscapeImages = BookLandscapeImagesInput.split(',').map(url => url.trim()); 

  var BookLandscapeImages = BookLandscapeImagesInput.trim() !== '' ? BookLandscapeImagesInput.split(',').map(function (url) {
    return url.trim();
  }) : [];
  var Summary = document.getElementById('summary').value;
  var Publisher = document.getElementById('author').value;
  (0, _book.updateBook)(BookID, Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, Publisher);
});