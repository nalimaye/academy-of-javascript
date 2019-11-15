const router = require('express').Router();
const { Student, Campus } = require('../db/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const aStudent = await Student.findAll({
      where: {
        id: { [Op.eq]: req.params.studentId },
      },
      include: [Campus],
    });
    res.json(aStudent);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:studentId', async (req, res, next) => {
  try {
    const [numUpdatedRows, updatedStudentRows] = await Student.update(
      req.body,
      {
        where: { id: { [Op.eq]: req.params.studentId } },
        returning: true,
      }
    );
    if (numUpdatedRows === 1) {
      res.json(updatedStudentRows[0]);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:studentId', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.studentId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
