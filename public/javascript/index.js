/* eslint-disable */
import '@babel/polyfill';
import { login } from "./login";
import { logout } from "./login";
import { signup } from "./login";
import { addBook } from "./book";
import { deleteBook } from "./book";
import { updateBook } from "./book";
import { updateData } from "./updateSettings";

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');

const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

const addBookForm = document.querySelector('.form--addbook');
const deleteBookForm = document.querySelector('.form--deletebook');
const updateBookForm = document.querySelector('.form--updatebook');




// DELEGATION
if(loginForm){
    loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;
    login(Email, Password);
    })
}

if(signupForm){
    signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const AuthorName = document.getElementById('name').value;
    const Email = document.getElementById('email').value;
    const PhoneNumber = document.getElementById('phonenumber').value;
    const Password = document.getElementById('password').value;
    signup(AuthorName, Email, PhoneNumber, Password);
    })
}

if(logoutBtn) logoutBtn.addEventListener('click', logout);

if(userDataForm) userDataForm.addEventListener('submit',  event => {
    event.preventDefault();
    const AuthorName = document.getElementById('name').value;
    const Email = document.getElementById('email').value;
    const PhoneNumber = document.getElementById('phonenumber').value;
    updateData(AuthorName, Email, PhoneNumber);
  
})

if(addBookForm)
    addBookForm.addEventListener('submit', event => {
        event.preventDefault();
        const Title = document.getElementById('title').value;
        const DatePublished = document.getElementById('datepublished').value;
        const Description = document.getElementById('description').value;
        const PageCount = document.getElementById('pagecount').value;
        const Genre = document.getElementById('genre').value;
        const BookImage = document.getElementById('bookimage').value;
        const BookLandscapeImagesInput = document.getElementById('booklandscapeimages').value;
        const BookLandscapeImages = BookLandscapeImagesInput.split(',').map(url => url.trim()); // Split URLs by comma
        const Summary = document.getElementById('summary').value;
        const Publisher = document.getElementById('author').value;
        addBook(Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, Publisher);
})

if(deleteBookForm)
    deleteBookForm.addEventListener('submit', event => {
        event.preventDefault();
        const BookID = document.getElementById('bookid').value;
        deleteBook(BookID);
})

if(updateBookForm)
    updateBookForm.addEventListener('submit', event => {
        event.preventDefault();
        const BookID = document.getElementById('bookid').value;
        const Title = document.getElementById('title').value;
        const DatePublished = document.getElementById('datepublished').value;
        const Description = document.getElementById('description').value;
        const PageCount = document.getElementById('pagecount').value;
        const Genre = document.getElementById('genre').value;
        const BookImage = document.getElementById('bookimage').value;
        const BookLandscapeImagesInput = document.getElementById('booklandscapeimages').value;
        const BookLandscapeImages = BookLandscapeImagesInput.trim() !== '' ? BookLandscapeImagesInput.split(',').map(url => url.trim()) : document.getElementById('booklandscapeimages').value;;
        const Summary = document.getElementById('summary').value;
        const Publisher = document.getElementById('author').value;
        updateBook(BookID, Title, DatePublished, Description, PageCount, Genre, BookImage, BookLandscapeImages, Summary, Publisher);
})