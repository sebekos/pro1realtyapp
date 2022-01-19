module.exports = (sequelize, type) => {
  return sequelize.define("news", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATE,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    text: {
      type: type.STRING,
      allowNull: false,
    },
    deleted: {
      type: type.INTEGER,
      defaultValue: 0,
    },
  });
};
