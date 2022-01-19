const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multiparty = require("multiparty");
const fs = require("fs");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const FileType = require("file-type");
const dotenv = require("dotenv");
require("dotenv").config();

const { Team } = require("../sequelize");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.AWS_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

router.post("/", [auth], async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    // Check for data
    if (fields === undefined || files === undefined)
      throw new Error("Data not received correctly");

    // Constants
    const memberId = fields.memberId;
    const photoCnt = Object.keys(files).length;

    let updatedTeam = {};

    // Error check
    if (error) throw new Error(error);
    if (photoCnt !== 1) throw new Error("Server Error");

    try {
      // File info
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await FileType.fromBuffer(buffer);
      const timestamp = Date.now().toString();
      const fileName = `avatars/${memberId}-${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);

      if (data) {
        // Add to Photo MySQL
        const teamFields = {
          avatar_link: Object.entries(data)[1][1],
        };
        const updated = await Team.update(teamFields, {
          where: { id: memberId },
        });
        updatedTeam = await Team.findOne({ where: { id: memberId } });
      } else {
        throw new Error("Upload error");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Server Error");
    }
    res.send(updatedTeam);
  });
});

module.exports = router;
