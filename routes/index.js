var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Convert Stuff' });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'New Order' });
});

router.get('/ordercomplete', function(req, res, next) {
    var tapeNumber = req.query.tapes;
    var custEmail = req.query.email;
    var totalcost = tapeNumber * 4.99;
    console.log('email wot I search:' + custEmail);
    var db = req.db;
    var collection = db.get('orderlist');

    collection.find({"email" : "michael@unomee.com"},{ limit : 1 },function(e,docs){
        console.log('stuff wot we get back: ' + docs);
        res.render('ordercomplete', {
            "orderDetails" : docs, cost:totalcost
        });
    });
});

router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'About Us' });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'About Us' });
});
/* POST to Add order Service */
router.post('/addorder', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var orderForename = req.body.inputForename;
    var orderSurname = req.body.inputSurname;
    var orderEmail = req.body.inputEmail;
    var orderPhonenumber = req.body.inputPhoneNumber;
    var orderAddressLine1 = req.body.inputAddressLine1;
    var orderAddressLine2 = req.body.inputAddressLine2;
    var orderTown = req.body.inputTown;
    var orderCounty = req.body.inputCounty;
    var orderPostcode = req.body.inputPostcode;
    var orderNumberOfTapes = req.body.inputNumberOfTapes;
   

    // Set our collection
    var collection = db.get('orderlist');

    // Submit to the DB
    collection.insert({
        "forename" : orderForename,
        "surname" : orderSurname,
        "email" : orderEmail,
        "phonenumber" : orderPhonenumber,
        "addressline1" : orderAddressLine1,
        "addressline2" : orderAddressLine2,
        "town" : orderTown,
        "county" : orderCounty,
        "postcode" : orderPostcode,
        "service" : orderNumberOfTapes

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("ordercomplete?email= " + orderEmail + "&" + "tapes=" + orderNumberOfTapes);
        }
    });
});

module.exports = router;
