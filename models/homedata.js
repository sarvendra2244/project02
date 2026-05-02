const {getDb}=require('../utils/databaseUtil');
const {ObjectId}=require('mongodb');

module.exports=class Home{
  constructor(username,price ,location,rating,phone,photo,description,_id){
    this.username=username;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.phone=phone;
    this.photo=photo;
    this.description=description;
    if(_id){
      this._id=_id;
    }
  }
  
  save(){
    const db=getDb();
    if(this._id){//edit case
      const updatedFields={
      username:this.username,
      price:this.price,
      location:this.location,
      rating:this.rating,
      phone:this.phone,
      photo:this.photo,description:this.description

      }

    return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:updatedFields});

    }
    else{//insert new case
      return db.collection('homes').insertOne(this); 
    }
    
    } 

  static fetchAll(){
    const db=getDb();
    return db.collection('homes').find().toArray();
   
  }


  static findById(homeid){
    console.log(homeid);
     const db=getDb();
    return db.collection('homes').find({_id: new ObjectId(String(homeid))}).next();
    
   
  }

   static deletebyid(homeid){
    const db=getDb();
    return db.collection('homes').deleteOne({_id: new ObjectId(String(homeid))});
  
 
  }

   static favourite(homeid,callback){

  }


}
