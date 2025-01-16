const Document = require("../models/document");

// Create document
exports.createDocument = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const document = await Document.create({
      title,
      content,
      owner: req.user._id,
    });

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

// Get all documents
exports.getDocuments = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { owner: req.user._id };
    const documents = await Document.find(query).populate(
      "owner",
      "fullName email"
    );
    res.json(documents);
  } catch (error) {
    next(error);
  }
};

// Get single document
exports.getDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id).populate(
      "owner",
      "fullName email"
    );

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Check if user has access to the document
    if (
      req.user.role !== "admin" &&
      document.owner._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(document);
  } catch (error) {
    next(error);
  }
};

// Update document
exports.updateDocument = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // req.document is now set by the isOwnerOrAdmin middleware
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    ).populate("owner", "fullName email");

    res.json(updatedDocument);
  } catch (error) {
    next(error);
  }
};

// Delete document
exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
