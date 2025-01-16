const Document = require("../models/document");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (
      req.user.role !== "admin" &&
      document.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    req.document = document;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isOwnerOrAdmin,
};
