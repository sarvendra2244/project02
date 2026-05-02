const { getDb } = require("../utils/databaseUtil");

module.exports=class Favourites{
  constructor(houseId){
    this.houseId=houseId;
  }
  save(){
    const db=getDb();
     return db.collection('favourites').findOne({houseId:this.houseId}).then(existingFav=>{
      if(!existingFav){
        return db.collection('favourites').insertOne(this);
      }
      return new Promise.resolve();
     })  
  }

static getFavouriteList(){
 const db=getDb();
    return db.collection('favourites').find().toArray();

}


//Remove From Favourite list
 static removeFromFavouriteById(delhomeid){
   const db=getDb();
      return db.collection('favourites').deleteOne({houseId:delhomeid});

  }

};
