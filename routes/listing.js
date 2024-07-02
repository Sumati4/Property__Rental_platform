const express= require("express");
const router= express.Router();
const wrapAsync= require("../utils/wrapAsync.js")

const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
 
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


//index route...and create route
router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn,
  
    upload.single('listing[image]'),
   
    wrapAsync(listingController.createListing)

);



//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route, update route and delete route 
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
     wrapAsync(listingController.updateListings))
 .delete(
        isLoggedIn, 
        isOwner,
        wrapAsync(listingController.deleteListings));    











//edit route

router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing));





module.exports= router;