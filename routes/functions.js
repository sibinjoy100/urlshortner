var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url ='mongodb://localhost:27017/urlshortner'
var datetime = require('node-datetime');
var validator = require('validator');
var functions = require('./functions');
var shortid = require('shortid');


// Check URL existing or not in DB
exports.checkURLExist = function(urlText,callBack){
	mongo.connect(url, function(err, db){
		try{
		 	db.collection('urlhash')
			.find({urlText : urlText})
			.toArray(function (err, existArr){
				callBack(err, existArr);
			});	
		}
		catch(e){
			callBack(e,"");
		}					
	});
}

// Check hash value existing or not in DB
exports.checkHashExist = function(hashVal,callBack){
	mongo.connect(url, function(err, db){
		try{
		 	db.collection('urlhash')
			.find({hashValue : hashVal})
			.toArray(function (err, existArr){
				callBack(err, existArr);
			});	
		}
		catch(e){
			callBack(e,"");
		}					
	});
}

// Get URL By hash
exports.getURL = function(hashVal,callBack){
	mongo.connect(url, function(err, db){
		try{
		 	db.collection('urlhash')
			.find({urlText : urlText})
			.toArray(function (err, existArr){
				callBack(err, existArr);
			});	
		}
		catch(e){
			callBack(e,"");
		}					
	});
}

// Shorten URL
exports.shorten_url = function(urlText,callBack){
	shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
	if(urlText != null)
		return shortid.generate();
	else
		return;
}
