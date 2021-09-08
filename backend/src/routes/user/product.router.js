const express = require('express');
const passport = require('passport');
const {ProductController, CollectionController} = require('../../controllers');
const {HttpModule} = require('../../modules');
const router = express.Router();

router.get('/', (req, res, next) => {
    const body = req.params || {};
    ProductController.getProducts(body)
        .then((result) => {
            HttpModule.sendResponse(req, res, result);
        })
        .catch((err) => {
            HttpModule.sendError(req, res, err);
        });
});
router.post('/pid', (req, res, next) => {
    const body = req.body || {};
    ProductController.getById(body)
        .then((result) => {
            HttpModule.sendResponse(req, res, result);
        })
        .catch((err) => {
            HttpModule.sendError(req, res, err);
        });
});

// router.get(
//     '/categories',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         ProductCategoryController.getCategories(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );

// router.get(
//     '/category/:id',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         ProductController.getByCategory(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );

// router.get(
//     '/collections',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         CollectionController.getCollections(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );
// router.get(
//     '/collection/:id',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         ProductController.getProductsByCollection(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );
// router.get(
//     '/archives',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         ArchiveController.getArchives(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );
// router.get(
//     '/archive/:id',
//     (req, res, next) => next(),
//     (req, res, next) => {
//         const body = req.params || {};
//         ArchiveController.getCollectionsByArchive(body)
//             .then((result) => {
//                 HttpModule.sendResponse(req, res, result);
//             })
//             .catch((err) => {
//                 HttpModule.sendError(req, res, err);
//             });
//     }
// );
module.exports = router;
