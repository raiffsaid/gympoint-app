import Sequelize from 'sequelize';
// Importar os models
import User from '../app/models/User';
import Student from '../app/models/Student';

import databaseConfig from '../config/database';

// Array com todos os models da aplicação
const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    // Percorre o array, chamando o método init de cada model
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
