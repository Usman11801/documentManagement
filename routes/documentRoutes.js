const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin, isOwnerOrAdmin } = require("../middlewares/roleMiddleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Routes
router.post("/", documentController.createDocument);
router.get("/", documentController.getDocuments);
router.get("/:id", documentController.getDocument);
router.put("/:id", isOwnerOrAdmin, documentController.updateDocument);
router.delete("/:id", isAdmin, documentController.deleteDocument);

module.exports = router;
