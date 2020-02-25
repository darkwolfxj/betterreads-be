const router = require('express').Router();
const UserBooks = require('../models/user-books.js');
const Books = require('../models/books.js');

router.get('/:userId/library', (req, res) => {
	const userId = req.params.userId;
	UserBooks.findByUserId(userId)
		.then(userbooks => {
			if (userbooks == undefined) {
				res.status(400).json({ message: 'userbooks: does not exist' });
			} else {
				res.status(200).json(userbooks);
			}
		})
		.catch(err =>
			res.status(500).json({ message: 'error in returning data' })
		);
});

// router.post('/:userId/library/', (req, res) => {
// 	const userId = req.params.userId;
// 	const book = req.body;
//  Books.findBy({ title }).then(book => {
//		if(book == undefined) {

//		}
//	}).catch()
// 	const userbookObject = { bookId: bookId, readingStatus: , userId: userId}
// 	UserBooks.add(book).then(added => {
// 		console.log(added)
// 		if(added == undefined) {
// 			res.status(400).json({ message: 'userbooks: please provide book' });
// 		} else {
// 			res.status(201).json(added)
// 		}
// 	})
// 	.catch(err => {
// 		res.status(500).json({ message: 'error in posting userbook' });
// 	})
// })

router.get('/:userId/library/:id', (req, res) => {
	const userId = req.params.userId;
	const bookId = req.params.id;
	UserBooks.findDetailByUserId(userId, bookId)
		.then(userbook => {
			if (userbook == undefined) {
				res.status(400).json({ message: 'userbook: does not exist' });
			} else {
				res.status(200).json(userbook);
			}
		})
		.catch(err =>
			res.status(500).json({ message: 'error in returning data' })
		);
});

router.put('/:userId/library/:id', (req, res) => {
	const userId = req.params.userId;
	const bookId = req.params.id;
	const rs = req.body.readingStatus;
	UserBooks.updateReadingStatus(userId, bookId, rs)
		.then(userbook => {
			if (userbook == undefined) {
				res.status(400).json({
					message: 'userbook: does not exist. no change.'
				});
			} else {
				res.status(201).json(userbook);
			}
		})
		.catch(err =>
			res.status(500).json({ message: 'error in changing data' })
		);
});

// MARK: -- Delete userbook from library grab id through body
router.delete('/:userId/library/', (req, res) => {
	const userId = req.params.userId;
	const bookId = req.body.id;
	UserBooks.remove(userId, bookId)
		.then(deleted => {
			if (deleted == undefined) {
				res.status(400).json({
					message: 'userbook: does not exist. nothing removed.'
				});
			} else {
				if (deleted == 0) {
					res.status(500).json({
						message: 'deleted == 0, nothing was deleted'
					});
				} else {
					res.status(204).json(deleted);
				}
			}
		})
		.catch(err =>
			res.status(500).json({ message: 'error in removing data' })
		);
});

router.delete('/:userId/library/:id', (req, res) => {
	const userId = req.params.userId;
	const bookId = req.params.id;
	UserBooks.remove(userId, bookId)
		.then(deleted => {
			if (deleted == undefined) {
				res.status(400).json({
					message: 'userbook: does not exist. nothing removed.'
				});
			} else {
				if (deleted == 0) {
					res.status(500).json({ message: '' });
				} else {
					res.status(204).json(deleted);
				}
			}
		})
		.catch(err =>
			res.status(500).json({ message: 'error in removing data' })
		);
});

module.exports = router;