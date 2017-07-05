var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

/* CREATE a new Phone. */
router.post('/phones', (req, res, next) => {

  console.log(req.body);

  //********************************************************/
  // TEST WITH POSTMAN .....
  //********************************************************/
  /*
    When test with POSTMAN we have to define the following:
    POST request:
    --> Body must be x-www-form-urlencoded 
        this is require cause body.parser is defined as
                            app.use(bodyParser.json());
                            app.use(bodyParser.urlencoded({ extended: false }));

    --> Ones you define the body, the Headers will be 
                            key: Content-Type
                            value: application/x-www-form-urlencoded
  */

  // create a new phone
  const newPhone = new Phone({
    brand : req.body.brand,
    name  : req.body.name,
    specs : req.body.specs,
    image : req.body.image || ''
  });

  newPhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }
    // ones the new phone is saved 
    // the console will show this message and the phone id
    res.json({
      message: 'New Phone Created',
      id: newPhone._id
    });
  });
});

/* GET a single Phone. */
router.get('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Phone.findById(req.params.id, (err, thePhone) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(thePhone);
    });
});

/* EDIT a Phone. */
router.put('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };
  
  Phone.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Phone updated successfully'
    });
  });
});

/* DELETE a Phone. */
router.delete('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Phone.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Phone has been removed!'
    });
  });
});


module.exports = router;
