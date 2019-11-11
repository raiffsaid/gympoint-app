import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // Verifica se o usuário já existe no banco
    if (studentExists) {
      return res.status(400).json({
        error: 'Student already exists',
      });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed',
      });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({
        error: 'User does not exist',
      });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({ id, name, email, age, weight, height });
  }

  async index(req, res) {
    const allStudents = await Student.findAll();
    return res.json(allStudents);
  }
}

export default new StudentController();
