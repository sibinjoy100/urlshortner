var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url ='mongodb://localhost:27017/urlshortner'
var datetime = require('node-datetime');
var validator = require('validator');
var functions = require('./functions');
var domainName  = 'Place your domain'
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/doshort', function(req, res, next) {
	var urlText = req.body.urlText;
	if(urlText != null){
		if(validator.isURL(urlText)){
			functions.checkURLExist(urlText, function(err, existArr1){
				if(existArr1.length > 0){
					var hashValue = existArr1[0]['hashValue'];
					res.json({
						status : true,
						newURL : domainName+'/'+hashValue,
						msg : 'already exist in DB'
					});
				}
				else{
					var newHash =functions.shorten_url(urlText);
					if(newHash != null){
						functions.checkHashExist(newHash, function(err, existArr2){
							if(existArr2.length >0){

								console.log('generated hashValue already existing in DB -->'+existArr2[0]['hashValue']);
								res.json({
									status : true,
									msg : "Something went wrong. Please try again later"
								});
							}
							else{
								var dt = datetime.create();
								var formatted_date = dt.format('d-m-Y H:M:S');
								var item = {
									urlText : urlText,
									hashValue : newHash,
									createdAt : formatted_date,									
								};
								mongo.connect(url, function(err, db){
									db.collection('urlhash').insertOne(item);
									res.json({
										status : true,
										newURL : domainName+'/'+newHash,
										msg : "Success"
									});
								});
							}
						});
					}
					else{
						console.log('url field was empty');
						res.json({
							status : true,
							msg : "Something went wrong. Please try again later"
						});
					}				
				}
			});
		}
		else{
			res.json({
				status : false,
				msg : "Invalid URL"
			});
		}
		
	}
	else{
		res.json({
			status : false,
			msg : "Please type URL"
		});
	}
});

router.get('/:hashValue', function(req, res, next) {
	var hashValue = req.params.hashValue;
	console.log('hashValue :'+hashValue)
	if(hashValue != null){
		functions.checkHashExist(hashValue, function(err, existArr){
			console.log(existArr);
			if(existArr.length > 0){
				var url = existArr[0]['urlText'];
				console.log('helooo');
			 //   	res.writeHead(301, {
				// 	"location" : url
				// });
				// res.end();
				res.redirect(url);
			}
			else{
				res.json({
					status : false,
					msg : "Invalid hash"
				});
			}
		});
	}
	else{
		res.json({
			status : false,
			msg : "Something went wrong. Please try again later"
		});
	}
});

module.exports = router;
