import { Router } from 'express'
import userController from './controllers/userControllers'
import postController from './controllers/postController'

const router = Router()

router.post('/user', userController.createUser)
router.get('/users', userController.findAllUsers)
router.get('/user/:id', userController.findUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.post('/post/user/:id', postController.createPost)
router.get('/posts', postController.findAllPosts)
router.put('/post/:id', postController.updatePost)

export { router }