const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
require("dotenv").config();

const { News } = require("../sequelize");

// @route       news
// @description get news
// @access      public
router.get("/", async (req, res) => {
  try {
    const news = await News.findAll({ where: { deleted: 0 } });
    res.json(news);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route       news
// @description add or update news
// @access      private
router.post(
  "/",
  [
    auth,
    check("date", "Date is required").isLength({ min: 3 }),
    check("title", "Last name is required").isLength({ min: 3 }),
    check("text", "Title is required").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, date, title, text, deleted } = req.body;

    // Setup team object
    let newsFields = {
      date,
      title,
      text,
      deleted: deleted ? 1 : 0,
    };

    try {
      // Update if exists, else create new
      let news = id ? await News.findOne({ where: { id } }) : null;
      if (news) {
        news = await News.update(newsFields, { where: { id } });
      } else {
        news = await News.create(newsFields);
      }
      res.json(news);
    } catch (err) {
      throw new Error(err);
    }
  }
);

module.exports = router;
