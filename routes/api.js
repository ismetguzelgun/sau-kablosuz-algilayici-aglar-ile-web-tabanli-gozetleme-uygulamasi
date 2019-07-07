var express = require('express');
var router = express.Router();

/* GET  */
router.get('/sensorVerileri', function(req, res) {
    var db = req.db;
    var collection = db.get('acceleration');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * SİL
 */
router.delete('/sil', function(req, res) {
    var db = req.db;
    var collection = db.get('acceleration');
   // var userToDelete = req.params.id;
    collection.delete();
});
var dd =module.exports = router;