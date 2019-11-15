const router = require('express').Router();
const { Campus, Student } = require('../db/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.json(allCampuses);
  } catch (error) {
    next(error);
  }
});

router.get('/:campusId', async (req, res, next) => {
  try {
    const aCampus = await Campus.findAll({
      where: {
        id: { [Op.eq]: req.params.campusId },
      },
      include: [
        {
          model: Student,
          where: {
            campusId: { [Op.eq]: req.params.campusId },
          },
          required: false,
        },
      ],
    });
    res.json(aCampus);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.json(newCampus);
  } catch (error) {
    next(error);
  }
});

router.put('/:campusId', async (req, res, next) => {
  try {
    const [numUpdatedRows, updatedCampusRows] = await Campus.update(req.body, {
      where: { id: { [Op.eq]: req.params.campusId } },
      returning: true,
    });
    if (numUpdatedRows === 1) {
      res.json(updatedCampusRows[0]);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:campusId', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.campusId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
