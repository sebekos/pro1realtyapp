module.exports = (sequelize, type) => {
  return sequelize.define("schedule", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: {
      type: type.DATE,
      allowNull: false,
    },
    endDate: {
      type: type.DATE,
      allowNull: false,
    },
    race: {
      type: type.STRING,
      allowNull: false,
    },
    location: {
      type: type.STRING,
      allowNull: false,
    },
    results: {
      type: type.STRING,
      allowNull: true,
    },
    deleted: {
      type: type.INTEGER,
      defaultValue: 0,
    },
  });
};
