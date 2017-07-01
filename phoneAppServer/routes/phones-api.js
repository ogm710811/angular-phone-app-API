var express = require('express');
var router = express.Router();

// get a Phone mongoose reference to operate on the phones collection
const Phone = require('../model/phone-model');

/*******************************************
 *        REST API architecture
 * 
 *  /api/phones	GET	(empty)	Returns all the phones
 *  /api/phones	POST	JSON	Add a new phone
 *  /api/phones/:id	GET	(empty)	Returns the specified phone
 *  /api/phones/:id	PUT	JSON	Edits the specified phone
 *  /api/phones/:id	DELETE	(empty)	Deletes the specified phone
 *  
 * ***/

/* GET phones listing. */
router.get('/phones', (req, res, next) => {
  // find method without parameters to retrieve all the phones
  Phone.find((err, phoneList) => {
    if (err) {
      res.json(err);
      return;
    }
    // response with the list as a JSON if there’s no error 
    res.json(phoneList);
  });
});
bodyParser2 = require('body-parser').json();
/* CREATE a new Phone. */
router.post('/phones', (req, res, next) => {

  
  // create a new phone
  const newPhone = new Phone({
    brand : 'req.body.brand',
    name  : 'req.body.name',
    specs : 'req.body.specs',
    image : 'req.body.image' || ''
  });

  console.log(newPhone);

  newPhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Phone Created'

    });
  });
});

module.exports = router;
