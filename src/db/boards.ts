import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Boards = sequelize.define('Boards', {
    stage: DataTypes.INTEGER,
    title:DataTypes.STRING,
});

sequelize.sync({ force: true });

export default Boards;