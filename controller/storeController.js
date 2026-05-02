 const Favourites = require('../models/favourites');

const Home=require('../models/homedata');

exports.homePage=(req,res,next)=>{
   Home.fetchAll().then(registeredHome=>{res.render('store/homelist',{registeredHome:registeredHome,pagetitle:"Home List"})})
};

exports.homedetails=(req,res,next)=>{
   const homeid=req.params.homeid;
   Home.findById(homeid).then(home=>{
     console.log(homeid);
      res.render('store/home-detail',{home:home,pagetitle:"Home details"});
   }) 
};

exports.getIndex=(req,res,next)=>{   
       Home.fetchAll().then(registeredHome=> res.render('store/homepage',{registeredHome:registeredHome,pagetitle:"Airbnb Home"}));  
};

exports.getbookings=(req,res,next)=>{
    res.render('store/bookings',{pagetitle:"My bookings"}); 
};


exports.getFavouriteList=(req,res,next)=>{
 Favourites.getFavouriteList().then(favourites=>{favourites=favourites.map(fav=>fav.houseId);
    Home.fetchAll().then(registeredHome=>{
      console.log(favourites,registeredHome);
      const favouritesWithDetails=registeredHome.filter((home)=>favourites.includes(home._id.toString()));
      res.render('store/favourite-list',{favourites:favouritesWithDetails,pageTitle:"My favourites"});
   });
 });   
};





exports.postAddToFavourite=(req,res,next)=>{
    const homeId=req.body.id;
   const fav=new Favourites(homeId);
   fav.save().then(result=>{
      console.log('Added to favourites',result);
   }).catch(error=>{
     console.log('error while marking favourites',error)
   }).finally(()=>{
      res.redirect('/favourites'); 
   });
};

exports.postRemoveFromFavourite=(req,res,next)=>{
   const homeId=req.params.homeid;
   console.log('Home removed from favourties',homeId);
   Favourites.removeFromFavouriteById(homeId).then(result=>{
      console.log('Removed from favourites',result);
   }).catch(error=>{
     console.log('error while deleting from favourites',error)
   }).finally(()=>{
      res.redirect('/favourites'); 
   })
};





