 const Home=require('../models/homedata');
 exports.getAddHome=(req,res,next)=>{
    res.render('host/edit-home',{editing:false, home:""});
}

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeid;
  const editing = req.query.editing === 'true';

  try {
   Home.findById(homeId).then(home=>{
    
    if (!home) {
      console.log("Home not found for edition");
      return res.redirect('/host/host-home-list');
    }
        res.render('host/edit-home', {
      pagetitle: "Edit your Home",
      editing: editing,
      home: home
    });
    
   })

  } catch (err) {
    console.error("Error fetching home:", err);
    res.redirect('/host/host-home-list');
  }
};



exports.gethosthome=(req,res,next)=>{
    const success=req.query.success==='true';
    Home.fetchAll().then(registeredHome=> {res.render('host/host-home-list',{registeredHome:registeredHome,pagetitle:"Host home list",success:success})});
}



exports.postAddHome=(req,res,next)=>{  
  const{username,price ,location,rating,phone,photo,description,_id}=req.body;
  const home=new Home(username,price ,location,rating,phone,photo,description,_id);
  home.save().then(()=>{
    console.log('Home saved successfully');
  })
    
    res.redirect('/host/gethosthome?success=true');
};

exports.postUpdateHome = async (req, res, next) => {

    const { id, username, price, location, rating, phone, photo, description } = req.body;

    // Create Home instance
    const home = new Home(username, price, location, rating, phone, photo, description, id);

    // Await DB operation
    await home.save().then(result=>{
      console.log('Home updated',result);
    });

    // Redirect after success
    res.redirect("/host/gethosthome");
  
};


exports.postDeleteHome=(req,res,next)=>{
  
  const homeid=req.params.homeid;
 Home.deletebyid(homeid).then(()=>{
   
    res.redirect('/host/gethosthome');
 }).catch(error=>{
    console.log('error while deleteing home');
 })
  
};


