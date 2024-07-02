const mongoose= require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;



const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    },

    description:String,
    image:{
        url:String,
        filename:String,




        // type:String,
        // default:
        //    " https://images.unsplash.com/photo-1590523278191-995cbcda646b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
        // set:(v)=>v==="" ? "http://images.unsplash.com/photo-1527672809634-04ed36500acd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
        // :v,
    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
           type:Schema.Types.ObjectId, 
           ref:"Review",
        }
    ],
    owner:{
       type: Schema.Types.ObjectId,
       ref:"User", 
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
