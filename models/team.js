module.exports = (sequelize, type) => {
  return sequelize.define("team", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    info: {
      type: type.STRING,
      allowNull: false,
    },
    avatar_link: {
      type: type.STRING,
      allowNull: true,
    },
    deleted: {
      type: type.INTEGER,
      defaultValue: 0,
    },
    sort: {
      type: type.INTEGER,
      defaultValue: 999,
    },
  });
};
