const router = require('express').Router();
const { Stylist, Post, Service, City } = require('../../models');

const session = require('express-session');
const withAuth = require('../../utils/auth');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// get all Stylists
router.get('/', (req, res) => {
    Stylist.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbStylistData => res.json(dbStylistData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// get single Stylist
router.get('/:id', (req, res) => {
    Stylist.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'name', 'post_text', 'sevice_id', 'city_id', 'link_url']
        },
        {
          model: Service,
          attributes: ['id', 'title']
        },
        {
          model: City,
          attributes: ['id', 'name']
        }

      ]
    })
      .then(dbStylistData => {
        if (!dbStylistData) {
          res.status(404).json({ message: 'No Stylist found with this id' });
          return;
        }
        res.json(dbStylistData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// add Stylist
router.post('/', withAuth, (req, res) => {
    Stylist.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbStylistData => res.json(dbStylistData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

 // update Stylist info
 router.put('/:id', withAuth, (req, res) => {  
     // pass in req.body instead to only update what's passed through
     Stylist.update(req.body, {
       individualHooks: true,
       where: {
         id: req.params.id
       }
     })
       .then(dbStylistData => {
         if (!dbStylistData[0]) {
           res.status(404).json({ message: 'No Stylist found with this id' });
           return;
         }
         res.json(dbStylistData);
       })
       .catch(err => {
         console.log(err);
         res.status(500).json(err);
       });
   });
 // delete a Stylist
 router.delete('/:id', withAuth, (req, res) => {
     Stylist.destroy({
       where: {
         id: req.params.id
       }
     })
       .then(dbStylistData => {
         if (!dbStylistData) {
           res.status(404).json({ message: 'No Stylist found with this id' });
           return;
         }
         res.json(dbStylistData);
       })
       .catch(err => {
         console.log(err);
         res.status(500).json(err);
       });
   });

module.exports = router;