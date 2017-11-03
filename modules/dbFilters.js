exports.getDataFilter = function (db, type, query, cb) {
   var options = {
     page:1,
     limit:20
   }
   if(query.page){
      option['page']= query.page;
    }
    if(query.limit){
      option['limit'] = query.limit;
    }
    if(query.type == 'date'){
        option['start']    =  query.start;
        option['end']      =  query.end;
    }
    if (query.type == 'gender') {
      option['gender'] = query.gender;
    }
  if (type == 'pagination') {
    var _pageNumber = option.page,
      _pageSize = option.limit;

    db.count({}, function (err, count) {
      db.find({}, null, {
        sort: {
          Name: 1
        }
      }).skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0).limit(_pageSize).exec(function (err, docs) {
        if (err)
         cb(err, null);
        else
          cb(null, {data:docs,total:count,code:200,message:"SuccessFully Found"});
      });
    });
  }else{
    db.find(options, function (err, list) {
    if (err) {
      cb(err, null);
    } else if (list.length == 0 || !list) {
      cb([], null);
    } else {
      cb(null, list);
    }
  });
  }
}
