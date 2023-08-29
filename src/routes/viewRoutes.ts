import express, { Response, Request, NextFunction } from 'express'
import { getOverview, getBook, getLoginForm, getAccount, getMyBooks, getSignupForm, addBookForm, deleteBookForm, updateBookForm } from '../controllers/viewsController'
import { isLoggedIn } from '../middleware/authMiddleware'
import { logout } from '../controllers/authorContoller'
import { protect } from '../middleware/authMiddleware'
import { deleteBook } from '../controllers/bookController'
const router = express.Router()





router.get('/', isLoggedIn, getOverview)
router.get('/book/:id', protect, getBook)
router.get('/login', isLoggedIn, getLoginForm)
router.get('/signup', isLoggedIn, getSignupForm)
router.get('/logout', isLoggedIn, logout)
router.get('/me', protect, getAccount)
router.get('/my-books', protect, getMyBooks)
router.get('/add-book', protect, addBookForm)
router.get('/delete-book', protect, deleteBookForm)
router.get('/update-book', protect, updateBookForm)



export default router