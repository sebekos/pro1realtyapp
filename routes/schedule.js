const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
require("dotenv").config();

const { Schedule } = require("../sequelize");

// @route       schedule
// @description get schedule
// @access      public
router.get("/", async (req, res) => {
  try {
    const schedule = await Schedule.findAll({ where: { deleted: 0 } });
    res.json(schedule);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route       schedule
// @description add or update schedule
// @access      private
router.post(
  "/",
  [
    auth,
    check("startDate", "First name is required").isLength({ min: 3 }),
    check("endDate", "Last name is required").isLength({ min: 3 }),
    check("race", "Title is required").isLength({ min: 5 }),
    check("location", "Info is required").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, startDate, endDate, race, location, results, deleted } =
      req.body;

    // Setup team object
    let teamFields = {
      startDate,
      endDate,
      race,
      location,
      results,
      deleted: deleted ? 1 : 0,
    };

    try {
      // Update if exists, else create new
      let schedule = id ? await Schedule.findOne({ where: { id } }) : null;
      if (schedule) {
        schedule = await Schedule.update(teamFields, { where: { id } });
      } else {
        schedule = await Schedule.create(teamFields);
      }
      res.json(schedule);
    } catch (err) {
      throw new Error(err);
    }
  }
);

module.exports = router;
