import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // Verifica se o usuário já existe no banco
    if (userExists) {
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
    });
  }

  async update(req, res) {
    const { id, name, email, age, weight, height } = req.body;

    const student = await Student.findByPk(req.studentId);
  }
}

export default new StudentController();
