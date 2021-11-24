var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool')
var table = 'category';
const fs = require("fs");
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {
console.log(req.session.usernumber)
   
// req.session.usernumber = 85

 if(req.session.usernumber){
  var query1 = `select * from category;`
  var query2 = `select * from banner where type = 'Front Banner' order by id desc;`
  var query3 = `select * from users where id = '${req.session.usernumber}';`
  var query4 = `select * from banner where type = 'Instagram Banner' order by id desc;`
  var query5 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where type ='Most Loved'  and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
 
  var query6 = `select * from banner where type = 'Art Elements Banner' order by id desc;`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  var query9 = `select * from testimonials order by id desc;`
  var query10 = `select * from banner where type='About Video' order by id desc limit 1;`




  pool.query(query1+query2+query3+query4+query5+query6+query7+query8+query9+query10,(err,result)=>{
    if(err) throw err;
    else  res.render('index', { title: 'Express',result,login:true });
  })
 }
 else{
  var query1 = `select * from category;`
  var query2 = `select * from banner where type = 'Front Banner' order by id desc;`
  var query3 = `select * from cart where usernumber = '${req.session.ipaddress}';`
  var query4 = `select * from banner where type = 'Instagram Banner' order by id desc;`
  

  var query5 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where  type ='Most Loved'  and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
 

  var query6 = `select * from banner where type = 'Art Elements Banner' order by id desc;`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
  var query9 = `select * from testimonials order by id desc;`
  var query10 = `select * from banner where type='About Video' order by id desc limit 1;`





  pool.query(query1+query2+query3+query4+query5+query6+query7+query8+query9+query10,(err,result)=>{
    // err ? console.log(err) : res.render('index', { title: 'Express',result,login:false });
    if(err) throw err;
    else  res.render('index', { title: 'Express',result,login:false });
  })
 }


 
});



router.get('/order-history',(req,res)=>{
  pool.query(`select  b.* , (select p.name from product p where p.id = b.booking_id) as productname,
  (select u.email from users u where u.id = b.usernumber) as usermobilenumber,
  (select a.address1 from address a where a.id = b.address ) as useraddress1,
  (select a.address2 from address a where a.id = b.address ) as useraddress2,
  (select a.city from address a where a.id = b.address ) as usercity,
  (select a.postcode from address a where a.id = b.address ) as userpostcode,
  (select a.id_state from address a where a.id = b.address ) as userstate,
  (select a.id_country from address a where a.id = b.address ) as usercountry
  
  from booking b where b.status =  'completed' order by id desc;`,(err,result)=>{
    if(err) throw err;
    else res.render('show-orders',{result:result})
  })
})




router.get('/running-order',(req,res)=>{
  pool.query(`select  b.* , (select p.name from product p where p.id = b.booking_id) as productname ,
  (select u.email from users u where u.id = b.usernumber) as usermobilenumber,
  (select a.address1 from address a where a.id = b.address ) as useraddress1,
  (select a.address2 from address a where a.id = b.address ) as useraddress2,
  (select a.city from address a where a.id = b.address ) as usercity,
  (select a.postcode from address a where a.id = b.address ) as userpostcode,
  (select a.id_state from address a where a.id = b.address ) as userstate,
  (select a.id_country from address a where a.id = b.address ) as usercountry
  
  from booking b where b.status != 'completed' and b.status != 'Cancel' order by id desc;`,(err,result)=>{
    if(err) throw err;
    else res.render('show-orders',{result:result})
  })
})


router.get('/cancel-order',(req,res)=>{
  pool.query(`select  b.* , (select p.name from product p where p.id = b.booking_id) as productname ,
  (select u.email from users u where u.id = b.usernumber) as usermobilenumber,
  (select a.address1 from address a where a.id = b.address ) as useraddress1,
  (select a.address2 from address a where a.id = b.address ) as useraddress2,
  (select a.city from address a where a.id = b.address ) as usercity,
  (select a.postcode from address a where a.id = b.address ) as userpostcode,
  (select a.id_state from address a where a.id = b.address ) as userstate,
  (select a.id_country from address a where a.id = b.address ) as usercountry
  
  from booking b where b.status = 'Cancel' order by id desc `,(err,result)=>{
    if(err) throw err;
    else res.render('show-orders',{result:result})
  })
})



router.get('/purchase-report',(req,res)=>{
  pool.query(`select * from cancel_booking order by id desc `,(err,result)=>{
    if(err) throw err;
    else res.render('purchase-report',{result:result})
  })
})


router.get('/sales-report',(req,res)=>{
  pool.query(`select b.*,
  (select u.email from users u where u.id = b.usernumber) as usermobilenumber
  
  from booking b order by id desc `,(err,result)=>{
    if(err) throw err;
    else res.render('sales-report',{result:result})
  })
})


router.get('/stock-report',(req,res)=>{
  pool.query(`select p.* ,
   (select c.name from product c where c.id = p.productid) as categoryname from product_manage p order by quantity `,(err,result)=>{
    if(err) throw err;
    else res.render('sales-report',{result:result})
  })
})


router.get('/shop',(req,res)=>{
// console.log(req.session.usernumber)
if(req.session.usernumber){
  var query = `select * from category order by id desc;`
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where p.categoryid = '${req.query.id}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
  var query2 = `select * from category where id = '${req.query.id}';`
  var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`


  pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
    if(err) throw err;
    // else res.json(result)
    else if(result[1][0]) res.render('shop',{result:result,login:true,title:result[2][0].name})
    else  res.render('shop',{result,login:true,title:result[2][0].name})
  })
}
else{
  var query = `select * from category order by id desc;`
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where p.categoryid = '${req.query.id}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
  
  var query2 = `select * from category where id = '${req.query.id}';`
  var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`


  pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
     if(err) throw err;
    else if(result[1][0]) res.render('shop',{result:result,login:false,title:result[2][0].name})
    else  res.render('shop',{result,login:false,title:result[2][0].name})
  })
}

  
 
})



router.get('/shop/all-collections',(req,res)=>{

  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select p.* ,
    (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
    (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
  
    from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
    
   
    var query2 = `select * from category where id = '${req.query.id}';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`

  
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('all-shop',{result:result,login:true,title:'All Collections'})
      else  res.render('all-shop',{result,login:true,title:'All Collections'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select p.* ,
    (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
    (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
  
    from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
    
    var query2 = `select * from category where id = '${req.query.id}';`
    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`


    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
       if(err) throw err;
      else if(result[1][0]) res.render('all-shop',{result:result,login:false,title:'All Collections'})
      else  res.render('all-shop',{result,login:false,title:'All Collections'})
    })
  }
  
    
   
  })



  router.get('/shop/most-loved',(req,res)=>{

    if(req.session.usernumber){
      var query = `select * from category order by id desc;`
      var query1 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
    
      from product p where p.categoryid = '${req.query.id}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
     
 
      var query2 = `select * from category where id = '${req.query.id}';`
      var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`

    
      pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
        if(err) throw err;
        else if(result[1][0]) res.render('all-shop',{result:result,login:true,title:'Most Loved'})
        else  res.render('all-shop',{result,login:true,title:'Most Loved'})
      })
    }
    else{
      var query = `select * from category order by id desc;`
      var query1 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
    
      from product p where p.categoryid = '${req.query.id}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
     
      var query2 = `select * from category where id = '${req.query.id}';`
      var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`

    
      pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
         if(err) throw err;
        else if(result[1][0]) res.render('all-shop',{result:result,login:false,title:'Most Loved'})
        else  res.render('all-shop',{result,login:false,title:'Most Loved'})
      })
    }
    
      
     
    })



router.get('/shop/subcategory',(req,res)=>{

 pool.query(`select categoryid from subcategory where id = '${req.query.id}'`,(err,result)=>{
   if(err) throw err;
   else {
     let categoryid = result[0].categoryid

     if(req.session.usernumber){
      var query = `select * from category order by id desc;`
      var query1 = `select * from product where subcategoryid = '${req.query.id}';`
      var query2 =  `select * from subcategory where categoryid = '${categoryid}';`
    
      pool.query(query+query1+query2,(err,result)=>{
        if(err) throw err;
        else if(result[1][0]) res.render('shop',{result:result,login:true})
        else  res.render('not_found',{result,login:true})
      })
    }
    else{
      var query = `select * from category order by id desc;`
      var query1 = `select * from product where subcategoryid = '${req.query.id}';`
      var query2 =  `select * from subcategory where categoryid = '${categoryid}';`
      pool.query(query+query1+query2,(err,result)=>{
        if(err) throw err;
        else if(result[1][0]) res.render('shop',{result:result,login:false})
        else  res.render('not_found',{result,login:false})
      })
    }
   }
 })
  })




router.get('/product',(req,res)=>{
// req.session.usernumber = 85
  pool.query(`select categoryid from product where id = '${req.query.id}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]) {
    let categoryid = result[0].categoryid
  if(req.session.usernumber){
      var query = `select * from category order by id desc;`

      var query1 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as quantity
      from product p where p.id = '${req.query.id}' ;`
     

      var query2 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as quantity

      from product p where p.categoryid = '${categoryid}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null order by id limit 8;`
     
     var query6 = `select * from users where id = '${req.session.usernumber}';`
     var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
     var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
     var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
     var query10 = `select * from product_manage where productid = '${req.query.id}';`
      pool.query(query+query1+query2+query6+query7+query8+query9+query10,(err,result)=>{
        if(err) throw err;
        else res.render('view-product', { title: 'Express',login:true, result : result,sizerequest:req.query.size,title:result[1][0].name});
      })
      
  
    }
    else{
      var query = `select * from category order by id desc;`
    

      var query1 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as quantity
      from product p where p.id = '${req.query.id}' ;`
     

      var query2 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = '${req.query.size}') as quantity

      from product p where p.categoryid = '${categoryid}' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null order by id limit 8;`
     

     var query6 = `select * from users where id = '84';`
     var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
     var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
     var query9 = `select * from wishlist_name where usernumber = '${req.session.ipaddress}';`
     var query10 = `select * from product_manage where productid = '${req.query.id}';`

      pool.query(query+query1+query2+query6+query7+query8+query9+query10,(err,result)=>{
        if(err) throw err;
         else res.render('view-product', { title: 'Express',login:false , result : result,sizerequest:req.query.size,title:result[1][0].name});
  // else res.json(result)
      })
  
    }

  }
  else {
    res.render('view-product')
  }
})


})




router.post('/mycart',(req,res)=>{
  res.json({msg:'success'})
})



router.post("/cart-handler", (req, res) => {
  let body = req.query
console.log('usern ka number',req.body)

if(req.session.usernumber || req.session.usernumber!= undefined){
  body['usernumber'] = req.session.usernumber;

  console.log(req.query)
  if (req.query.quantity == "0" || req.query.quantity == 0) {
  pool.query(`delete from cart where booking_id = '${req.query.booking_id}' and  usernumber = '${req.session.usernumber}' and status is null`,(err,result)=>{
      if (err) throw err;
      else {
        res.json({
          msg: "updated sucessfully",
        });
      }
  })
  }
  else {
      pool.query(`select oneprice from cart where booking_id = '${req.query.booking_id}' and  categoryid = '${req.query.categoryid}' and usernumber = '${req.session.usernumber}' and status is null`,(err,result)=>{
          if (err) throw err;
          else if (result[0]) {
             // res.json(result[0])
              pool.query(`update cart set quantity = ${req.query.quantity} , price = ${result[0].oneprice}*${req.query.quantity}  where booking_id = '${req.query.booking_id}' and categoryid = '${req.query.categoryid}' and usernumber = '${req.session.usernumber}'`,(err,result)=>{
                  if (err) throw err;
                  else {
                    console.log('h')
                    //  res.redirect('/mycart')
                    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
                    var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.usernumber}';`
                    pool.query(query7+query8,(err,result)=>{
                      if(err) throw err;
                      else res.json(result)
                    })
                    // res.json({msg:'su'})
                    }

              })
          }
          else {
            body["price"] = (req.query.price)*(req.query.quantity)
               pool.query(`insert into cart set ?`, body, (err, result) => {
               if (err) throw err;
               else {
                var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
                var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.usernumber}';`
                pool.query(query7+query8,(err,result)=>{
                  if(err) throw err;
                  else res.json(result)
                })
               }
             });

          }

      })
  }
}
else {



    body['usernumber'] = req.session.ipaddress;

    
    if (req.query.quantity == "0" || req.query.quantity == 0) {
    pool.query(`delete from cart where booking_id = '${req.query.booking_id}' and  usernumber = '${req.session.ipaddress}' and status is null`,(err,result)=>{
        if (err) throw err;
        else {
          res.json({
            msg: "updated sucessfully",
          });
        }
    })
    }
    else {
        pool.query(`select oneprice from cart where booking_id = '${req.query.booking_id}' and  categoryid = '${req.query.categoryid}' and usernumber = '${req.session.ipaddress}' and status is null`,(err,result)=>{
            if (err) throw err;
            else if (result[0]) {
               // res.json(result[0])
                pool.query(`update cart set quantity = ${req.query.quantity} , price = ${result[0].oneprice}*${req.query.quantity}  where booking_id = '${req.query.booking_id}' and categoryid = '${req.query.categoryid}' and usernumber = '${req.session.ipaddress}'`,(err,result)=>{
                    if (err) throw err;
                    else {
                      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      pool.query(query7+query8,(err,result)=>{
                        if(err) throw err;
                        else res.json(result)
                      })
                      }
  
                })
            }
            else {
              console.log(result)
              body["price"] = (req.query.price)*(req.query.quantity)
                 pool.query(`insert into cart set ?`, body, (err, result) => {
                 if (err) throw err;
                 else {
                  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                  var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                  pool.query(query7+query8,(err,result)=>{
                    if(err) throw err;
                    else res.json(result)
                  })
                 }
               });
  
            }
  
        })
    }
  


 
 


 

}



})


router.post("/cart-handler1", (req, res) => {
  let body = req.body
console.log('usern ka number',req.session.ipaddress)

if(req.session.usernumber || req.session.usernumber!= undefined){
  body['usernumber'] = req.session.usernumber;

  console.log(req.body)
  if (req.body.quantity == "0" || req.body.quantity == 0) {
  pool.query(`delete from cart where booking_id = '${req.body.booking_id}' and  usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
      if (err) throw err;
      else {
        res.json({
          msg: "updated sucessfully",
        });
      }
  })
  }
  else {
      pool.query(`select oneprice from cart where booking_id = '${req.body.booking_id}' and  categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
          if (err) throw err;
          else if (result[0]) {
            console.log(result[0])
              pool.query(`update cart set quantity = ${req.body.quantity} , price = ${result[0].oneprice}*${req.body.quantity}  where booking_id = '${req.body.booking_id}' and categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}'`,(err,result)=>{
                  if (err) throw err;
                  else {
                    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
                    var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.usernumber}';`
                    pool.query(query7+query8,(err,result)=>{
                      if(err) throw err;
                      else res.json(result)
                    })
                    }

              })
          }
          else {
            body["price"] = (req.body.price)*(req.body.quantity)
               pool.query(`insert into cart set ?`, body, (err, result) => {
               if (err) throw err;
               else {
                var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
                    var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.usernumber}';`
                    pool.query(query7+query8,(err,result)=>{
                      if(err) throw err;
                      else res.json(result)
                    })
               }
             });

          }

      })
  }
}
else {



  if(req.session.ipaddress){
    body['usernumber'] = req.session.ipaddress;

    console.log(req.body)
    if (req.body.quantity == "0" || req.body.quantity == 0) {
    pool.query(`delete from cart where booking_id = '${req.body.booking_id}' and  usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
        if (err) throw err;
        else {
          res.json({
            msg: "updated sucessfully",
          });
        }
    })
    }
    else {
        pool.query(`select oneprice from cart where booking_id = '${req.body.booking_id}' and  categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
            if (err) throw err;
            else if (result[0]) {
               // res.json(result[0])
                pool.query(`update cart set quantity = ${req.body.quantity} , price = ${result[0].oneprice}*${req.body.quantity}  where booking_id = '${req.body.booking_id}' and categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}'`,(err,result)=>{
                    if (err) throw err;
                    else {
                      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      pool.query(query7+query8,(err,result)=>{
                        if(err) throw err;
                        else res.json(result)
                      })
                      }
  
                })
            }
            else {
              body["price"] = (req.body.price)*(req.body.quantity)
                 pool.query(`insert into cart set ?`, body, (err, result) => {
                 if (err) throw err;
                 else {
                  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      pool.query(query7+query8,(err,result)=>{
                        if(err) throw err;
                        else res.json(result)
                      })
                 }
               });
  
            }
  
        })
    }
  


  }

  else {

    var otp =   Math.floor(100000 + Math.random() * 9000);
    req.session.ipaddress = otp;
    body['usernumber'] = otp;
    console.log(req.body)
    if (req.body.quantity == "0" || req.body.quantity == 0) {
    pool.query(`delete from cart where booking_id = '${req.body.booking_id}' and  usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
        if (err) throw err;
        else {
          res.json({
            msg: "updated sucessfully",
          });
        }
    })
    }
    else {
        pool.query(`select oneprice from cart where booking_id = '${req.body.booking_id}' and  categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}' and status is null`,(err,result)=>{
            if (err) throw err;
            else if (result[0]) {
               // res.json(result[0])
                pool.query(`update cart set quantity = ${req.body.quantity} , price = ${result[0].oneprice}*${req.body.quantity}  where booking_id = '${req.body.booking_id}' and categoryid = '${req.body.categoryid}' and usernumber = '${req.body.usernumber}' and size='${req.body.size}'`,(err,result)=>{
                    if (err) throw err;
                    else {
                      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      pool.query(query7+query8,(err,result)=>{
                        if(err) throw err;
                        else res.json(result)
                      })
                      }
  
                })
            }
            else {
              body["price"] = (req.body.price)*(req.body.quantity)
                 pool.query(`insert into cart set ?`, body, (err, result) => {
                 if (err) throw err;
                 else {
                  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      var query8 = `select sum(price) as counter from cart where usernumber = '${req.session.ipaddress}';`
                      pool.query(query7+query8,(err,result)=>{
                        if(err) throw err;
                        else res.json(result)
                      })
                 }
               });
  
            }
  
        })
    }
  


  }


 

}



})




router.get('/mycart',(req,res)=>{

 console.log(req.session.ipaddress)

  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select c.* , 
    (select p.name from product p where p.id = c.booking_id) as bookingname,
    (select p.image from product p where p.id = c.booking_id) as bookingimage,
    (select p.quantity from product_manage p where p.productid = c.booking_id and p.sizeid = c.size) as availablequantity
    

    
     from cart c where c.usernumber = '${req.session.usernumber}';`
   var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`   
   var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`   
   var query6 = `select * from users where id = '${req.session.usernumber}';`
   var query7 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
   var query8 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`           



    pool.query(query+query1+query2+query3+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else if(!result[1][0]){
        res.render('not_found1',{result,login:true,searchname:req.query.search_query,title:'My Cart'})

      }
      else{
if(result[2][0].totalprice > 500) {
  res.render('cart', { title: 'Cart',login:true,result , shipping_charges : 0 });

}
else if(result[1][0]) {
  res.render('cart', { title: 'Cart',login:true,result , shipping_charges : 500 });

}

   
      }
   
   
       })

  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select c.* , 
    (select p.name from product p where p.id = c.booking_id) as bookingname,
    (select p.image from product p where p.id = c.booking_id) as bookingimage,
    (select p.quantity from product_manage p where p.productid = c.booking_id and p.sizeid = c.size) as availablequantity


    
     from cart c where c.usernumber = '${req.session.ipaddress}';`
   var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.ipaddress}' ;`              
   var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
   var query6 = `select * from users where id = '84';`
   var query7 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
   var query8 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`              

    pool.query(query+query1+query2+query3+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else if(!result[1][0]){
        res.render('not_found1',{result,login:true,searchname:req.query.search_query,title:'My Cart'})

      }
      else{
     

        if(result[2][0].totalprice > 500) {
          res.render('cart', { title: 'Cart',login:false,result , shipping_charges : 0 });
        
        }
        else {
          res.render('cart', { title: 'Cart',login:false,result , shipping_charges : 500 });
        
        }
        
   
      }
   
   
       })

  }
})





router.get('/delete',(req,res)=>{
  if(req.session.usernumber){
  pool.query(`delete from cart where id = '${req.query.id}' and usernumber = '${req.session.usernumber}'`,(err,result)=>{
  if(err) throw err;
  else res.redirect('/mycart')
  })
  }
  else {
    pool.query(`delete from cart where id = '${req.query.id}' and usernumber = '${req.session.ipaddress}'`,(err,result)=>{
      if(err) throw err;
      else res.redirect('/mycart')
      })
  }
})





router.get('/checkout',(req,res)=>{
  //  req.session.usernumber = null;  
  if(req.session.usernumber){


 res.redirect('/address')

 
   

  }
  else{
    req.session.page = '1'
    var query = `select * from category order by id desc;`
    var query1 = `select c.* , 
    (select p.name from product p where p.id = c.booking_id) as bookingname,
    (select p.image from product p where p.id = c.booking_id) as bookingimage,
    (select p.quantity from product p where p.id = c.booking_id) as availablequantity

    
     from cart c where c.usernumber = '${req.session.ipaddress}';`
   var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.ipaddress}';`              
   var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`

   var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`


    pool.query(query+query1+query2+query3+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else{
     

        if(result[2][0].totalprice > 500) {
          res.render('checkout', { title: 'Express',login:true,result , shipping_charges : 0 ,msg:'' });
        
        }
        else {
          res.render('checkout', { title: 'Express',login:true,result , shipping_charges : 500,msg:'' });
        
        }
        
   
      }
   
   
       })
    // res.render('checkout',{msg:''})
  }
})





router.post('/order-as-a-guest',(req,res)=>{
  let body = req.body;



  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;
  



  pool.query(`select * from users where email = '${req.body.email}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      req.session.page = '1'
      var query = `select * from category order by id desc;`
      var query1 = `select c.* , 
      (select p.name from product p where p.id = c.booking_id) as bookingname,
      (select p.image from product p where p.id = c.booking_id) as bookingimage,
      (select p.quantity from product p where p.id = c.booking_id) as availablequantity
  
      
       from cart c where c.usernumber = '${req.session.ipaddress}';`
     var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.ipaddress}';`              
     var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
  
     var query6 = `select * from users where id = '84';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
  
  
      pool.query(query+query1+query2+query3+query6+query7+query8,(err,result)=>{
        if(err) throw err;
        else{
       
  
          if(result[2][0].totalprice > 500) {
            res.render('checkout', { title: 'Express',login:true,result , shipping_charges : 0 ,msg:'Email Already Exists' });
          
          }
          else {
            res.render('checkout', { title: 'Express',login:true,result , shipping_charges : 500,msg:'Email Already Exists' });
          
          }
          
     
        }
     
     
         })
    // res.render('checkout',{msg:'Email Already Exists'})
    }
    else{
      pool.query(`insert into users set ?`,body,(err,result)=>{
        if(err) throw err;
        else {
          console.log(result)

           req.session.usernumber = result.insertId;

           pool.query(`update cart set usernumber = '${result.insertId}' where usernumber = '${req.session.ipaddress}'`,(err,result)=>{
             if(err) throw err;


      pool.query(`insert into wishlist_name(name,quantity,created,usernumber) values('My Wishlist' , '0' , '${today}' , '${req.session.usernumber}')`,(err,result)=>{
        if(err){
          throw err;
        }
        else {
           res.redirect('/address');
        }
      })
           
            // 
           })
          
        }
      })
      
    }
  })
})




router.post('/signup-insert',(req,res)=>{
  let body = req.body;


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;



  pool.query(`select * from users where email = '${req.body.email}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      var query = `select * from category order by id desc;`
      var query1 = `select * from website_customize where name = 'pp';`
      var query2 = `select * from website_customize where name = 'about';`
    
      var query6 = `select * from users where id = '84';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
        pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
            if(err) throw err;
            else res.render('signup',{msg : 'Email Already Exists' , login:false,result:result})
        })
    }
    else{
      pool.query(`insert into users set ?`,body,(err,result)=>{
        if(err) throw err;
        else {
          pool.query(`insert into wishlist_name(name,quantity,created,usernumber) values('My Wishlist' , '0' , '${today}' , '${result.insertId}')`,(err,result)=>{
            if(err){
              throw err;
            }
            else {
              res.redirect('/login')
            }
          })
         
        }
      })
      
    }
  })
})



router.post('/login',(req,res)=>{
  let body = req.body;
  console.log(body);
  pool.query(`select * from users where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      console.log(result)
      req.session.usernumber = result[0].id;
      pool.query(`update cart set usernumber = '${req.session.usernumber}' where usernumber = '${req.session.ipaddress}'`,(err,result)=>{
        if(err) throw err;
        else res.redirect('/address');
      })
      // res.redirect('/address')
    }
    else{


      body['quantity'] = 0;
    
      body['created'] = today;
      body['usernumber'] = req.session.usernumber;
    
      pool.query(`insert into wishlist_name set ?`,body,(err,result)=>{
        if(err){
          throw err;
        }
        else {
          res.json({msg:'success'})
        }
      })

      
    



      // res.render('checkout',{msg:'Invalid Credentials'})

    }
  })
})



router.post('/login1',(req,res)=>{
  let body = req.body;
  console.log(body);
  pool.query(`select * from users where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      req.session.usernumber = result[0].id
       res.redirect('/');

    }
    else{
      var query = `select * from category order by id desc;`
      var query1 = `select * from website_customize where name = 'pp';`
      var query2 = `select * from website_customize where name = 'about';`
    
      var query6 = `select * from users where id = '82';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
        pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
            if(err) throw err;
            else res.render('login',{msg : 'Invalid Credentials' , login:false,result:result})
            // else res.json(result)
        })

    }
  })
})


router.get('/address',(req,res)=>{

// console.log(req.session.usernumber)
// console.log(req.session.ipaddress)

  var query = `select * from category order by id desc;`
  var query1 = `select c.* , 
  (select p.name from product p where p.id = c.booking_id) as bookingname,
  (select p.image from product p where p.id = c.booking_id) as bookingimage,
  (select p.quantity from product p where p.id = c.booking_id) as availablequantity

  
   from cart c where c.usernumber = '${req.session.usernumber}';`
 var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`              
 var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';` 
 var query4 = `select * from address where usernumber = '${req.session.usernumber}';` 
 var query5 = `select * from users where id = '${req.session.usernumber}';`

 var query7 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
 var query8 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`

 pool.query(query+query1+query2+query3+query5+query7+query8+query4,(err,result)=>{
   if(err) throw err;
   else if(result[7][0]){
    //  res.json(result)
    res.render('address1',{result:result,login:true})

   }
   else{
     res.render('address',{result:result,login:true})
    // res.json(result)

   }

 })            

})


router.get('/mylogout',(req,res)=>{
  req.session.usernumber = null;
  res.redirect('/checkout')
})


router.get('/shipping',(req,res)=>{
  console.log('query',req.query)
  req.session.address_id = req.query.id_address_delivery
  var query = `select * from category order by id desc;`
  var query1 = `select c.* , 
  (select p.name from product p where p.id = c.booking_id) as bookingname,
  (select p.image from product p where p.id = c.booking_id) as bookingimage,
  (select p.quantity from product p where p.id = c.booking_id) as availablequantity

  
   from cart c where c.usernumber = '${req.session.usernumber}';`
 var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`              
 var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';` 
 var query4 = `select * from address where usernumber = '${req.session.usernumber}';` 
 var query5 = `select * from users where id = '${req.session.usernumber}';`
 var query7 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
 var query8 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
 var query9 = `select charges from country where name = (select id_country from address where id = '${req.session.address_id}');`
 pool.query(query+query1+query2+query3+query4+query5+query7+query8+query9,(err,result)=>{
  if(err) throw err;
   else{
   res.render('shipping',{result:result,addressid:req.session.address_id,login:true})
// res.json(result)
  }

}) 
  // res.render('shipping') 
})




router.get('/payment',(req,res)=>{
  console.log(req.query)
  req.session.message = req.query.message
  
  var query = `select * from category order by id desc;`
  var query1 = `select c.* , 
  (select p.name from product p where p.id = c.booking_id) as bookingname,
  (select p.image from product p where p.id = c.booking_id) as bookingimage,
  (select p.quantity from product p where p.id = c.booking_id) as availablequantity

  
   from cart c where c.usernumber = '${req.session.usernumber}';`
 var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`              
 var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';` 
 var query4 = `select * from address where usernumber = '${req.session.usernumber}';` 
 var query5 = `select * from users where id = '${req.session.usernumber}';`
 var query7 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
 var query8 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
 var query9 = `select charges from country where name = (select id_country from address where id = '${req.session.address_id}');`

 pool.query(query+query1+query2+query3+query4+query5+query7+query8+query9,(err,result)=>{
  if(err) throw err;
   else{
     req.session.shipping_charges = result[8][0].charges;
   res.render('payment',{result:result,addressid:req.session.address_id,message:req.session.message,login:true})

  }

}) 
  // res.render('shipping') 





})



router.post('/payment-create',(req,res)=>{
  
  const url = `https://rzp_live_2AYlv8GRAaT63p:iIzpixX7YsDSUVPtAtbO5SMn@api.razorpay.com/v1/orders/`;

  const data = {
    // amount: req.body.amount* 100, // amount in the smallest currency unit
    amount:100,
    currency: "INR",
    payment_capture: true,
  };
  console.log("data", data);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((resu) => {
         res.render('open',{resu : resu.id})
        // res.json(resu)
    })
})



router.get('/size-chart',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`

    var query1 = `select * from website_customize where name = 'about';`
    var query2 = `select * from website_customize where name = 'about';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
    res.render('sizechart',{result:result,login:true,title:'Size Chart'})
    })
  }
  else{
    var query = `select * from category order by id desc;`

    var query1 = `select * from website_customize where name = 'about';`
    var query2 = `select * from website_customize where name = 'about';`
    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
    res.render('sizechart',{result:result,login:false,title:'Size Chart'})
    })
  }

 
})


router.get('/wishlist',(req,res)=>{
  console.log(req.session.usernumber)
  var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  var query2 = `select * from website_customize where name = 'about';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}' order by id desc;`
  if(req.session.usernumber){
pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
  if(err) throw err;
  else res.render('wishlist',{result:result,msg:'',login:true,title:'My Wishlist'})
})
  }
  else{
    res.redirect('/login')
  }
  
  // res.render('wishlist')
})



router.post('/delete-wishlist',(req,res)=>{
  console.log(req.body)
  pool.query(`delete from wishlist_name where id = '${req.body.id}'`,(err,result)=>{
    if(err) throw err;
    else {
      pool.query(`delete from wishlist where wishlistid = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else {
          res.json({msg:'success'})

        }
      })
    }
  })
})



router.post('/s',(req,res)=>{
  let body = req.body;
  console.log(req.body)

  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


  body['quantity'] = 0;

  body['created'] = today;
  body['usernumber'] = req.session.usernumber;

  pool.query(`insert into wishlist_name set ?`,body,(err,result)=>{
    if(err){
      throw err;
    }
    else {
      res.json({msg:'success'})
    }
  })

  // res.json({msg:'success'})
})


router.get('/identity',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  if(req.session.usernumber){
pool.query(query+query1+query7+query8,(err,result)=>{
  if(err) throw err;
  else res.render('identity',{result:result,msg:'',login:true})
})
  }
  else{
    res.redirect('/')
  }
  
})



router.post('/identity/update',(req,res)=>{
  let body = req.body;
  // console.log(req.body)
  pool.query(`update users set ? where id = ?`, [req.body, req.body.id], (err, result) => {
    if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
    }
    else {
      var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  
pool.query(query+query1,(err,result)=>{
  if(err) throw err;
  else res.render('identity',{result:result,msg:'Identity Successfully Updated'})
})
 

        
    }
})
})


router.get('/alert',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  var query2 = `select * from website_customize where name = 'about';`
  var query6 = `select * from users where id = '${req.session.usernumber}';`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  var query9 = `select * from alert where usernumber = '${req.session.usernumber}' order by id desc limit 20;`
  if(req.session.usernumber){
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else res.render('alert',{result:result,msg:'',login:true,title:'Alert'})
    })
      }
      else{
        res.redirect('/')
      }
  // res.render('alert')
})


router.get('/helpdesk',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  var query2 = `select * from website_customize where name = 'about';`
  var query6 = `select * from users where id = '${req.session.usernumber}';`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  var query9 = `select * from helpdesk where usernumber = '${req.session.usernumber}' order by id desc limit 7;`
  if(req.session.usernumber){
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else res.render('helpdesk',{result:result,msg:'',login:true,title:'Helpdesk'})
    })
      }
      else{
        res.redirect('/')
      }
  // res.render('helpdesk')
})



router.post('/order-now',(req,res)=>{
  let body = req.body;
// console.log('body',req.body)
  let cartData = req.body

  console.log('CardData',cartData)
  if(req.body.payment_mode == 'online') {

    req.session.userfirstname =  req.body.first_name;
  
    req.session.address1 = req.body.address1;
    req.session.address2 = req.body.address2;
    req.session.city = req.body.city;
    req.session.state = req.body.state;
    req.session.pincode = req.body.pincode;
    req.session.time = req.body.time;
    req.session.payment_mode = req.body.payment_mode;
   
   
    if((+req.session.totalprice) > 500) {
      amount = req.session.totalprice
    }
    else {
     amount = (+req.session.totalprice) + 500
    }


    const url = `https://rzp_live_wdTkjI7Ba4b5qN:rxR0Prlwb9Gz7HctbrpukFOe@api.razorpay.com/v1/orders/`;
    const data = {
      amount: amount* 100, // amount in the smallest currency unit
      //amount:100,
      currency: "INR",
      payment_capture: true,
    };
    console.log("data", data);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((resu) => {
           res.render('open',{resu : resu.id})
      })

  }
  else{


    console.log('CardData',cartData)

       body['status'] = 'pending'
        
    
      var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 
    
    if(mm<10) 
    {
      mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    
    
    body['date'] = today
    
    
    
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for ( var i = 0; i < 12; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
     orderid = result;
     req.session.orderid = orderid;
    
    
        body['address'] = req.body.address1 + ',' + req.body.address2 + ',' + req.body.city + ',' + req.body.state + ',' + req.body.pincode;
        body['name'] = req.body.first_name  ;
    
    
     console.log(req.body)
    
    
     pool.query(`select * from cart where usernumber = '${req.session.usernumber}'`,(err,result)=>{
         if(err) throw err;
         else {
    
         let data = result
    
         for(i=0;i<result.length;i++){
          data[i].name = req.body.name
          data[i].date = today
          data[i].orderid = orderid
          data[i].status = 'pending'
          data[i].number = req.session.usernumber
          data[i].usernumber = req.session.usernumber
          data[i].payment_mode = 'cash'
          data[i].address = req.body.address
          data[i].id = null
          data[i].pincode = req.body.pincode
          data[i].order_date = today
          data[i].time = req.body.time

          if((+data[i].price) > 500){
            data[i].price = data[i].price
            data[i].shipping_charges = 0
          }
          else{
          data[i].price = (+data[i].price) + 500;
          data[i].shipping_charges = 500
          }
    
    
         }
    
    
       
    
    for(i=0;i<data.length;i++) {
      console.log('quantity1',data[i])
    
    let quantity = data[i].quantity;
    let booking_id = data[i].booking_id;
    
     pool.query(`insert into booking set ?`,data[i],(err,result)=>{
             if(err) throw err;
             else {
        
    
    pool.query(`update product set quantity = quantity - ${quantity} where id = '${booking_id}'`,(err,result)=>{
     if(err) throw err;
     else {
    
     }
    
    })
    
             }
        })
    }
    
    
      
    
    
    pool.query(`delete from cart where usernumber = '${req.session.usernumber}'`,(err,result)=>{
      if(err) throw err;
      else {
         res.redirect('/confirmation')
      }
    })
    
    
         }
     })

  }

  

 
})





router.get('/myorder',(req,res)=>{
  if(req.session.usernumber){
    req.session.page = null;
    var query = `select * from category order by id desc;`
    var query1 = `select b.* , (select p.name from product p where p.id = b.booking_id) as bookingname,
    (select p.image from product p where p.id = b.booking_id) as bookingimage,
    (select u.email from users u where u.id = b.usernumber) as usermobilenumber

    from booking b where usernumber = '${req.session.usernumber}' and status!='Cancel' order by id desc;`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('myorder',{result:result,login:true,msg1:'You have not placed any orders.',msg2:`Here are the orders you've placed since your account was created`,title:'Order History'})
    })
  }
  else{
    req.session.page = null;
  res.redirect('/login')
  }
 
})


router.get('/credit-slip',(req,res)=>{
  if(req.session.usernumber){
    req.session.page = null;
    var query = `select * from category order by id desc;`
    var query1 = `select b.* , (select p.name from product p where p.id = b.booking_id) as bookingname,
    (select p.image from product p where p.id = b.booking_id) as bookingimage,
    (select u.email from users u where u.id = b.usernumber) as usermobilenumber

    from booking b where usernumber = '${req.session.usernumber}' and status = 'Cancel'  order by id desc;`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('myorder',{result:result,login:true,msg1:'You have not received any credit slips.',msg2:'Credit slips you have received after canceled orders.',title:'Credit Slips'})
    })
  }
  else{
    req.session.page = null;
  res.redirect('/login')
  }
 
})





router.get('/myorder/cancel',(req,res)=>{
  pool.query(`update booking set status = 'cancel' where id = '${req.query.orderid}'`,(err,result)=>{
      if(err) throw err;
      else res.redirect('/myorder')
  })
})





// router.get('/search',(req,res)=>{

// if(req.session.usernumber){
//   var query = `select * from category order by id desc;`
//   var query1 = `select * from product where keywords Like '%${req.query.search}%' order by quantity desc;`
//    var query2 = `select * from category order by id desc;`

//   var query6 = `select * from users where id = '${req.session.usernumber}';`
//     var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
//     var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
//     var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
//   pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
//     if(err) throw err;
//     else if(result[1][0]){
//       res.render('shop',{result:result,login:true})
//     }
//     else res.render('not_found',{result:result,login:true})
//   })
// }
// else{
//   var query = `select * from category order by id desc;`
//   var query1 = `select * from product where keywords Like '%${req.query.search}%' order by quantity desc;`
//   var query2 = `select * from category where id = '${req.query.id}';`
//   var query6 = `select * from users where id = '84';`
//     var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
//     var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
//     var query9 = `select * from wishlist_name where usernumber = '${req.session.ipaddress}';`
//   pool.query(query+query1+query6+query7+query8+query9,(err,result)=>{
//     if(err) throw err;
//     else if(result[1][0]){
//       res.render('shop',{result:result,login:false})
//     }
//     else res.render('not_found',{result:result,login:false})

//   })
// }

  
 
// })




router.get('/search',(req,res)=>{
  // console.log(req.query.search)
  
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select p.* ,
    (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
    (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
  
    from product p where p.keywords Like '%${req.query.search_query}%' and (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
  
    
    var query2 = `select * from product where keywords Like '%${req.query.search_query}%' order by quantity desc;`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
  
  
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('shop',{result:result,login:true})
       else  res.render('not_found',{result,login:true,searchname:req.query.search_query,title:'Search'})
      // else res.json(result)
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from product where keywords Like '%${req.query.search_query}%' order by quantity desc;`
    var query2 = `select * from product where keywords Like '%${req.query.search_query}%' order by quantity desc;`
    var query6 = `select * from users where id = '84';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
  
  
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
       if(err) throw err;
      else if(result[1][0]) res.render('shop',{result:result,login:false})
      else  res.render('not_found',{result,login:true,searchname:req.query.search_query,title:'Search'})

    })
  }
  
    
   
  })





router.get('/website-customization',(req,res)=>{
  res.render('website_customization')
})



router.get('/faq-customization',(req,res)=>{
  res.render('faq_customization')
})




router.post('/faq-insert',(req,res)=>{
  let body = req.body
  pool.query(`insert into faq set ?`,body,(err,result)=>{
    if(err) throw err;
    else res.json({
      msg : 'success'
    })
  })
})



router.post('/website-customization-insert',(req,res)=>{
  let body = req.body   
  pool.query(`select * from website_customize where name = '${req.body.name}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      res.json({
        msg : 'Already Inserted'
      })
    }
    else {
      pool.query(`insert into website_customize set ?`,body,(err,result)=>{
        if(err) throw err;
        else res.json({
          msg : 'success'
        })
      })
    }
  })
})




router.get('/view-all-product',(req,res)=>{


  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select t.* ,   
    (select p.name from product p where p.id = t.productid) as productname,
    (select p.price from product p where p.id = t.productid) as productprice,
    (select p.quantity from product p where p.id = t.productid) as productquantity,
    (select p.discount from product p where p.id = t.productid) as productdiscount,
    (select p.image from product p where p.id = t.productid) as productimage,
    (select p.categoryid from product p where p.id = t.productid) as productcategoryid,
    (select p.subcategoryid from product p where p.id = t.productid) as productsubcategoryid,
    (select p.net_amount from product p where p.id = t.productid) as productnetamount 
    from promotional_text_management t where t.bannerid = '${req.query.id}' order by productquantity desc `
    pool.query(query+query1,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('view_all_product',{result:result,login:true})
      else  res.render('not_found',{result,login:true})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select t.* ,   
    (select p.name from product p where p.id = t.productid) as productname,
    (select p.price from product p where p.id = t.productid) as productprice,
    (select p.quantity from product p where p.id = t.productid) as productquantity,
    (select p.discount from product p where p.id = t.productid) as productdiscount,
    (select p.image from product p where p.id = t.productid) as productimage,
    (select p.categoryid from product p where p.id = t.productid) as productcategoryid,
    (select p.subcategoryid from product p where p.id = t.productid) as productsubcategoryid,
    (select p.net_amount from product p where p.id = t.productid) as productnetamount 
    from promotional_text_management t where t.bannerid = '${req.query.id}' order by productquantity desc ;`
    pool.query(query+query1,(err,result)=>{
      if(err) throw err;
      else  res.render('view_all_product',{result:result,login:false})
    })
  }
  

 
})




router.get('/banner-product',(req,res)=>{


  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select t.* ,   
    (select p.name from product p where p.id = t.productid) as productname,
    (select p.price from product p where p.id = t.productid) as productprice,
    (select p.quantity from product p where p.id = t.productid) as productquantity,
    (select p.discount from product p where p.id = t.productid) as productdiscount,
    (select p.image from product p where p.id = t.productid) as productimage,
    (select p.categoryid from product p where p.id = t.productid) as productcategoryid,
    (select p.subcategoryid from product p where p.id = t.productid) as productsubcategoryid,
    (select p.net_amount from product p where p.id = t.productid) as productnetamount 
    from banner_manage t where t.bannerid = '${req.query.id}' `
    pool.query(query+query1,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('view_all_product',{result:result,login:true})
      else  res.render('not_found',{result,login:true})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select t.* ,   
    (select p.name from product p where p.id = t.productid) as productname,
    (select p.price from product p where p.id = t.productid) as productprice,
    (select p.quantity from product p where p.id = t.productid) as productquantity,
    (select p.discount from product p where p.id = t.productid) as productdiscount,
    (select p.image from product p where p.id = t.productid) as productimage,
    (select p.categoryid from product p where p.id = t.productid) as productcategoryid,
    (select p.subcategoryid from product p where p.id = t.productid) as productsubcategoryid,
    (select p.net_amount from product p where p.id = t.productid) as productnetamount 
    from banner_manage t where t.bannerid = '${req.query.id}' ;`
    pool.query(query+query1,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('view_all_product',{result:result,login:true})
      else  res.render('not_found',{result,login:true})
    })
  }
  
})



router.get('/myaccount',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`

    pool.query(query+query1+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('myaccount',{result:result,login:true,msg:''})
    })
  }
  else{
 res.redirect('/login')
  }
  
})







router.post('/myaccount-update', (req, res) => {
  console.log(req.body)
  pool.query(`update users set ? where number = ?`, [req.body, req.body.number], (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {

  if(req.session.newuser){
    req.session.newuser = null;
        res.redirect('/checkout')
  }
  else {
    res.redirect('/myaccount')

  }


          
      }
  })
})




router.get('/about',(req,res)=>{
  if(req.session.usernumber) {
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'about';`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    var query10 = `select * from banner where type='About Video' order by id desc limit 1;`

    pool.query(query+query1+query2+query6+query7+query8+query10,(err,result)=>{
      if(err) throw err;
     
      else res.render('website_customize',{result,login:true,msg:'about',title:'About Us'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'about' ;`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    var query10 = `select * from banner where type='About Video' order by id desc limit 1;`

    pool.query(query+query1+query2+query6+query7+query8+query10,(err,result)=>{
      if(err) throw err;
       else res.render('website_customize',{result,login:false,msg:'about',title:'About Us'})
      // else res.json(result)
    })
  }
})



router.get('/art-elements',(req,res)=>{
  if(req.session.usernumber) {
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'art_elements';`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
     
      else res.render('website_customize',{result,login:true,msg:'art_elements',title:`Leffet's Art Elements`})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'art_elements' ;`

    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('website_customize',{result,login:false,msg:'art_elements',title:`Leffet's Art Elements`})
    })
  }
})





router.get('/g',(req,res)=>{
  var query1 = `select * from website_customize where name = '${req.query.msg}';`
  pool.query(query1,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})


router.get('/content',(req,res)=>{
  var query1 = `select * from category where name = '${req.query.msg}';`
  pool.query(query1,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})





router.get('/product-description',(req,res)=>{
  var query1 = `select * from product where id = '${req.query.msg}';`
  var query2 = `select * from product_manage where productid = '${req.query.msg}' && sizeid = '${req.query.size}';`
  pool.query(query1+query2,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})


router.get('/celebrity-description',(req,res)=>{
  var query1 = `select * from photoshot where id = '${req.query.msg}';`
  pool.query(query1,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})



router.get('/privacy-policy',(req,res)=>{
  if(req.session.usernumber) {
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'pp';`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
     
      else res.render('website_customize',{result,login:true,msg:'pp',title:'Privacy Ploicy'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'pp' ;`

    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('website_customize',{result,login:false,msg:'pp',title:'Privacy Ploicy'})
    })
  }
})




router.get('/terms-and-conditions',(req,res)=>{
  if(req.session.usernumber) {
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'tc';`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
     
      else res.render('website_customize',{result,login:true,msg:'tc',title:'Terms & Conditions'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'tc' ;`

    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('website_customize',{result,login:false,msg:'tc',title:'Terms & Conditions'})
    })
  }
})








router.get('/refund-policy',(req,res)=>{
  if(req.session.usernumber) {
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'rp';`
    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
     
      else res.render('website_customize',{result,login:true,msg:'rp',title:'Shipping & Refund Policy'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from website_customize where name = 'rp' ;`

    var query2 = `select * from website_customize where name = 'about';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('website_customize',{result,login:false,msg:'rp',title:'Refund Policy'})
    })
  }
})











router.post('/razorpay-response',(req,res)=>{
  let body = req.body;
  let cartData = req.body
console.log(req.session.usernumber)



pool.query(`select firstname , lastname from users where id = '${req.session.usernumber}'`,(err,result)=>{
  if(err) throw err;
  else {
    body['name'] = result[0].firstname + ' ' + result[0].lastname ;
    body['shipping_charges'] =  req.session.shipping_charges;

// res.send(result[0])
    body['status'] = 'pending'
        
    
      var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 
    
    if(mm<10) 
    {
      mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    
    
    body['date'] = today
    
    
    
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for ( var i = 0; i < 12; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
     orderid = result;
    
    
        body['address'] = req.session.address_id
    
    
     console.log(req.body)
    
    
     pool.query(`select * from cart where usernumber = '${req.session.usernumber}'`,(err,result)=>{
         if(err) throw err;
         else {
    
         let data = result
    
         for(i=0;i<result.length;i++){
          data[i].name = req.body.name
          data[i].date = today
          data[i].orderid = orderid
          data[i].status = 'pending'
          data[i].number = req.session.usernumber
          data[i].usernumber = req.session.usernumber
          data[i].payment_mode = 'online'
          data[i].address = req.body.address
          data[i].id = null
         data[i].order_date = today
          data[i].razorpay_order_id = req.body.razorpay_order_id;
          
          // if((+data[i].price) > 500){
          //   data[i].price = data[i].price
          //   data[i].shipping_charges = 0
          // }
          // else{
          // data[i].price = (+data[i].price) + 500;
          // data[i].shipping_charges = 500
          // }
    
    
         }
    
    
       
    
    for(i=0;i<data.length;i++) {
      console.log('quantity1',data[i].quantity)
    
    let quantity = data[i].quantity;
    let booking_id = data[i].booking_id;
    
     pool.query(`insert into booking set ?`,data[i],(err,result)=>{
             if(err) throw err;
             else {
        
    
    pool.query(`update product_manage set quantity = quantity - ${quantity} where productid = '${booking_id}'`,(err,result)=>{
     if(err) throw err;
     else {
    
     }
    
    })
    
             }
        })
    }
    
    
      
    
    
    pool.query(`delete from cart where usernumber = '${req.session.usernumber}'`,(err,result)=>{
      if(err) throw err;
      else {
         res.redirect('/confirmation')
      }
    })
    
    
         }
     })

  


  }
})

})




router.get('/myaddress',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from address where usernumber = '${req.session.usernumber}';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else res.render('myaddress',{result,login:true})
    })
  }
  else{
res.redirect('/login')
  }
  
  
})









router.post('/save-address',(req,res)=>{
  let body = req.body;
  body['usernumber'] = req.session.usernumber
  console.log(req.body)
  pool.query(`insert into address set ?`,req.body , (err,result)=>{
  if(err) throw err;
  else{
  //  result.insertId;
 res.redirect(`/shipping?id_address_delivery=${result.insertId}`)
  }
  // else res.redirect('/address')
  })
})




router.post('/save-myaddress',(req,res)=>{
  let body = req.body;
  
  pool.query(`insert into address set ?`,req.body , (err,result)=>{
  if(err) throw err;
  else{
  //  result.insertId;
 res.redirect(`/myaddress`)
  }
  // else res.redirect('/address')
  })
})


router.get('/delete-address',(req,res)=>{
  pool.query(`delete from address where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/address')
  })
})


router.get('/cancel-orders',(req,res)=>{


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

  pool.query(`select * from booking where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else {
        pool.query(`insert into alert(usernumber,status,orderid,date) values ('${result[0].usernumber}' , 'Cancel' , '${result[0].orderid}','${today}')`,(err,result)=>{
            if(err) throw err;
           else{
            pool.query(`update booking set status = 'Cancel' where id = '${req.query.id}'`,(err,result)=>{
              if(err) throw err;
              else res.redirect('/myorder')
            })
           }
        })
    }
})
 
})


router.get('/delete-myaddress',(req,res)=>{
  pool.query(`delete from address where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else res.redirect('/myaddress')
  })
})


router.get('/new-address',(req,res)=>{
  if(req.session.usernumber){
  var query = `select * from category order by id desc;`
  var query1 = `select * from users where id = '${req.session.usernumber}';`
  var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  pool.query(query+query1+query6+query7+query8,(err,result)=>{
    if(err) throw err;
    else  res.render('new-address',{result:result,login:true})
  })
  
  }
  else{
    res.redirect('/login')
  }
})


router.get('/add-new-address',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select c.* , 
  (select p.name from product p where p.id = c.booking_id) as bookingname,
  (select p.image from product p where p.id = c.booking_id) as bookingimage,
  (select p.quantity from product p where p.id = c.booking_id) as availablequantity

  
   from cart c where c.usernumber = '${req.session.usernumber}';`
 var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`              
 var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';` 
 var query4 = `select * from address where usernumber = '${req.session.usernumber}';` 
 var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
 var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
 pool.query(query+query1+query2+query3+query4+query7+query8,(err,result)=>{
   if(err) throw err;
   else{
    res.render('address',{result:result,login:true})

   }

 })            

})





router.get('/edit-address',(req,res)=>{

  var query = `select * from category order by id desc;`
  var query1 = `select c.* , 
  (select p.name from product p where p.id = c.booking_id) as bookingname,
  (select p.image from product p where p.id = c.booking_id) as bookingimage,
  (select p.quantity from product p where p.id = c.booking_id) as availablequantity

  
   from cart c where c.usernumber = '${req.session.usernumber}';`
 var query2 = `select sum(price) as totalprice from cart where usernumber = '${req.session.usernumber}';`              
 var query3 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';` 
 var query4 = `select * from address where usernumber = '${req.session.usernumber}';`
 var query5 = `select * from address where id = '${req.query.id}';` 
 var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
 var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  pool.query(query+query1+query2+query3+query4+query5+query7+query8,(err,result)=>{
    if(err) throw err;
    else res.render('edit-address',{result:result,login:true})
  })
  
})




router.get('/update-address',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from address where id = '${req.query.id}';`
  var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
  pool.query(query+query1+query6+query7+query8,(err,result)=>{
    if(err) throw err;
    else res.render('update-address',{result,login:true})
  })
  
})





router.post('/update-address', (req, res) => {
  console.log('data',req.body)
  pool.query(`update address set ? where id = ?`, [req.body, req.body.id], (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {
          res.redirect('/address')

          
      }
  })
})


router.post('/update-myaddress', (req, res) => {
  console.log('data',req.body)
  pool.query(`update address set ? where id = ?`, [req.body, req.body.id], (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {
          res.redirect('/myaddress')

          
      }
  })
})



router.get('/logout',(req,res)=>{
  req.session.usernumber = null;
  res.redirect('/')
})



router.post('/contact-us',(req,res)=>{
  let body = req.body;
  console.log(req.body)
  pool.query(`insert into contact set ?`,body,(err,result)=>{
    if(err) throw err;
    else {
      if(req.session.usernumber){
        var query = `select * from category order by id desc;`
        var query1 = `select * from category;`
        var query5 = `select * from users where id = '${req.session.usernumber}';`
    
        var query6 = `select * from users where id = '${req.session.usernumber}';`
        var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
        var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
        pool.query(query+query1+query5+query6+query7+query8,(err,result)=>{
          if(err) throw err;
          else  res.render('contact',{login:true,result,msg:'Your message has been successfully sent to our team.'})
        })
      }
      else{
        var query = `select * from category order by id desc;`
        var query1 = `select * from category;`
        pool.query(query+query1,(err,result)=>{
          if(err) throw err;
          else  res.render('contact',{login:false,result,msg:'Your message has been successfully sent to our team.'})
        })
      }
    }
  })
})


router.get('/contactus',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from category;`
    var query5 = `select * from users where id = '${req.session.usernumber}';`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query5+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else  res.render('contact',{login:true,result,msg:''})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from category;`
    var query5 = `select * from users where id = '84';`

    var query6 = `select * from users where id = '84';`
    var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
    var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query5+query6+query7+query8,(err,result)=>{
      if(err) throw err;
      else  res.render('contact',{login:false,result,msg:''});
    })
  }
 
})



router.get('/faq',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from faq where type = 'General Question';`
    var query2 = `select * from faq where type = 'Wallet Question';`
    pool.query(query+query1+query2,(err,result)=>{
      if(err) throw err;
      else  res.render('faq',{login:true,result})
    })
  }
  else{
    var query = `select * from category order by id desc;`
    var query1 = `select * from faq where type = 'General Question';`
    var query2 = `select * from faq where type = 'Wallet Question';`
    pool.query(query+query1+query2,(err,result)=>{
      if(err) throw err;
      else  res.render('faq',{login:false,result})
    })
  }
 
})



router.post('/contactus/submit',(req,res)=>{
  let body = req.body;
  pool.query(`insert into contact set ?`,body,(err,result)=>{
    if(err) throw err;
    else
    {

      if(req.session.usernumber){
        var query = `select * from category order by id desc;`
        var query1 = `select * from category;`
        pool.query(query+query1,(err,result)=>{
          if(err) throw err;
          else  res.render('contact',{login:true,result,msg : 'Our Team Will Contact You Soon'})
        })
      }
      else{
        var query = `select * from category order by id desc;`
        var query1 = `select * from category;`
        pool.query(query+query1,(err,result)=>{
          if(err) throw err;
          else  res.render('contact',{login:false,result,msg : 'Our Team Will Contact You Soon'})
        })
      }

    } 

  })
})



router.post('/quename/submit',(req,res)=>{
  let body = req.body;
  pool.query(`insert into question set ?`,body,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })
})


router.get('/invoice',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select c.*,
    (select p.name from product p where p.id = c.booking_id) as bookingname,
    (select p.image from product p where p.id = c.booking_id) as bookingimage,
    (select u.email from users u where u.id = c.usernumber) as usermobilenumber,
    (select a.address1 from address a where a.id = c.address ) as useraddress1,
    (select a.address2 from address a where a.id = c.address ) as useraddress2,
    (select a.city from address a where a.id = c.address ) as usercity,
    (select a.postcode from address a where a.id = c.address ) as userpostcode,
    (select a.id_state from address a where a.id = c.address ) as userstate,
    (select a.id_country from address a where a.id = c.address ) as usercountry



    from booking c where c.orderid = '${req.query.orderid}';`
    var query10= `select sum(price) as totalamount from booking where orderid = '${req.query.orderid}';`


    var query2 = `select * from category where id = '${req.query.id}';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`


  
  
    pool.query(query+query1+query2+query6+query7+query8+query9+query10,(err,result)=>{
      if(err) throw err;
       else res.render('invoice',{login:true,result,title:'Invoice'})
      // else res.json(result)
    })
  }
  else{
    res.redirect('/login')
  }
})



router.get('/confirmation',(req,res)=>{
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from booking order by id desc limit 1;`
    var query2 = `select * from category where id = '${req.query.id}';`
    var query6 = `select * from users where id = '${req.session.usernumber}';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else res.render('confirmation',{result,login:true,orderid:req.session.orderid,title:'Confirmation'});
    })
  }
  else {
    res.redirect('/login')
  }
})








router.post('/add_wishlist',(req,res)=>{
  let body = req.body;
  body['usernumber'] = req.session.usernumber
  console.log(body)
  pool.query(`select * from wishlist where wishlistid = '${req.body.wishlistid}' and usernumber = '${req.session.usernumber}' and booking_id = '${req.body.booking_id}'`,(err,result)=>{
    
    
    if(err) throw err;
    else if(result[0]){
      res.json({msg:'The product already exists in your wishlist'})
      // pool.query(`update wishlist_name set quantity = quantity-1 where id = '${req.body.booking_id}'`,(err,result)=>{
      //   if(err) throw err;
      //   else res.json({msg:'The product already exists in your wishlist'})
      // })
      // res.json({msg : 'item removed'})
    }

    else{
  pool.query(`insert into wishlist set ?`,body,(err,result)=>{
    if(err) throw err;
    else {
      pool.query(`update wishlist_name set quantity = quantity+1 where id = '${req.body.wishlistid}'`,(err,result)=>{
        if(err) throw err;
        else res.json({msg:'The product was successfully added to your wishlist'})
      })
    }
    //  res.json({msg:'item success'})
  })
    }
  })

})




router.get('/signup',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from website_customize where name = 'pp';`
  var query2 = `select * from website_customize where name = 'about';`

  var query6 = `select * from users where id = '84';`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
        if(err) throw err;
        else res.render('signup',{msg : '' , login:false,result:result})
        // else res.json(result)
    })
  

})


router.get('/view-wishlist',(req,res)=>{
console.log('ss',req.session.usernumber)
var query = `select * from category order by id desc;`
  var query1 = `select * from website_customize where name = 'pp';`
  var query2 = `select * from website_customize where name = 'about';`

  var query6 = `select * from users where id = '${req.session.usernumber}';`
  var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`




  var query9=`select w.*,
  (select p.name from product p where p.id = w.booking_id) as productname,
  (select p.image from product p where p.id = w.booking_id) as productimage,
  (select m.net_amount from product_manage m where m.productid = w.booking_id and m.sizeid = w.size) as productprice,
  (select m.quantity from product_manage m where m.productid = w.booking_id and m.sizeid = w.size) as productquantity,

  (select p.categoryid from product p where p.id = w.booking_id) as productcategoryid

  from wishlist w where w.wishlistid = '${req.query.id}';`
  var query10 = `select * from wishlist_name where usernumber = '${req.session.usernumber}' and id!= '${req.query.id}';`
  var query11 = `select * from wishlist_name where id = '${req.query.id}';`

    pool.query(query+query1+query2+query6+query7+query8+query9+query10+query11,(err,result)=>{
    if(err) throw err;
    // else res.json(result)
    else res.render('view-wishlist',{result:result,login:true,title:'Wishlist'})
  })
})










router.get('/contact-report',(req,res)=>{
  pool.query(`select * from contact order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('contact-report',{result})
  })
})





router.get('/celebrity',(req,res)=>{
  // console.log(req.session.ipaddress)
  if(req.session.usernumber){
    var query = `select * from category order by id desc;`
    var query1 = `select * from photoshot order by id desc;`
    var query2 = `select * from photoshot;`

    var query6 = `select * from users where id = '${req.session.usernumber}';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
      
  
  
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
      if(err) throw err;
      else if(result[1][0]) res.render('celebrity-list',{result:result,login:true,title:'Celebrity Closet'})
      else  res.render('celebrity-list',{result,login:true,title:'Celebrity Closet'})
    })
  }
  else{
    var query = `select * from category order by id desc;`
        var query1 = `select * from photoshot order by id desc;`
        var query2 = `select * from photoshot;`
       var query6 = `select * from users where id = '84';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
  
  
    pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
       if(err) throw err;
      else if(result[1][0]) res.render('celebrity-list',{result:result,login:false,title:'Celebrity Closet'})
      else  res.render('celebrity-list',{result,login:false,title:'Celebrity Closet'})
    })
  }
  
    
   
  })












  router.get('/celebrity-details',(req,res)=>{
   
      
    
       
    
        if(req.session.usernumber){
          var query = `select * from category order by id desc;`
          var query1 = `select p.* from photoshot p where p.id = '${req.query.id}';`
         var query2 = `select * from photoshot;`
         var query6 = `select * from users where id = '${req.session.usernumber}';`
         var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
         var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
         var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
          pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
            if(err) throw err;
            else res.render('celebrity-details', { title: 'Express',login:true, result : result,title:result[1][0].name});
          })
          
      
        }
        else{
          var query = `select * from category order by id desc;`
          var query1 = `select p.* from photoshot p where p.id = '${req.query.id}';`
         var query2 = `select * from photoshot;`
         var query6 = `select * from users where id = '84';`
         var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
         var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
         var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`

    
          pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
            if(err) throw err;
            else res.render('celebrity-details', { title: 'Express',login:false , result : result,result : result,title:result[1][0].name});
      
          })
      
        }
    
    
    })






    router.get('/blogs',(req,res)=>{
      // console.log(req.session.usernumber)
      if(req.session.usernumber){
        var query = `select * from category order by id desc;`
        var query1 = `select * from blog order by id desc;`
        var query2 = `select * from category where id = '${req.query.id}';`
        var query6 = `select * from users where id = '${req.session.usernumber}';`
          var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
          var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
          var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
      
      
        pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
          if(err) throw err;
          else if(result[1][0]) res.render('blogs',{result:result,login:true,title:'Editorial'})
          else  res.render('blogs',{result,login:true,title:'Editorial'})
        })
      }
      else{
        var query = `select * from category order by id desc;`
        var query1 = `select * from blog order by id desc;`

        var query2 = `select * from category where id = '${req.query.id}';`
        var query6 = `select * from users where id = '84';`
          var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
          var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
          var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
      
      
        pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
           if(err) throw err;
          else if(result[1][0]) res.render('blogs',{result:result,login:false,title:'Editorial'})
          else  res.render('blogs',{result,login:false,title:'Editorial'})
        })
      }
      
        
       
      })









      router.get('/date-wise-report',(req,res)=>{
        if(req.session.adminid){
            res.render('date-wise-report')
           }
           else{
           res.redirect('/admin')
           }
    })
    


    router.get('/sales/report',(req,res)=>{
      pool.query(`select  b.* , (select p.name from product p where p.id = b.booking_id) as productname,
      (select u.email from users u where u.id = b.usernumber) as usermobilenumber,
      (select a.address1 from address a where a.id = b.address ) as useraddress1,
  (select a.address2 from address a where a.id = b.address ) as useraddress2,
  (select a.city from address a where a.id = b.address ) as usercity,
  (select a.postcode from address a where a.id = b.address ) as userpostcode,
  (select a.id_state from address a where a.id = b.address ) as userstate,
  (select a.id_country from address a where a.id = b.address ) as usercountry
      
      from booking b where date between '${req.query.from_date}' and '${req.query.to_date}' order by id desc;`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
      })
    })
    
 













    router.post('/helpdesk/insert',upload.single('helpdesk_attachment'),(req,res)=>{
      let body = req.body


      var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


console.log(req.body)

if(req.file){
  body['helpdesk_attachment'] = req.file.filename;
}






        body['status'] = 'Online'
        body['date'] = today;
        console.log('body h',req.body)
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        var result = '';
        for ( var i = 0; i < 12; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
     ticket_number = result;
     body['ticket_number'] = ticket_number;
     body['usernumber'] = req.session.usernumber;


        pool.query(`insert into helpdesk set ?`,body,(err,result)=>{
          if(err) {
              res.json({
                  status:500,
                  type : 'error',
                  description:err
              })
          }
          else {
              res.json({
                  status:200,
                  type : 'success',
                  description:'successfully added'
              })
              
          }
      })
    
    
    })
    



    router.get('/view-replied',(req,res)=>{
      var query = `select * from helpdesk where ticket_number = '${req.query.id}';`
      var query1 = `select * from replied where helpdeskid = '${req.query.id}' order by id desc;`
      pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else {
          res.render('replied_list',{result:result})
        }
      })
    })



    router.get('/view-helpdesk',(req,res)=>{

      var query = `select * from category order by id desc;`
      var query1 = `select * from helpdesk where ticket_number = '${req.query.id}';`
      var query2 = `select * from replied where helpdeskid = '${req.query.id}' order by id desc;`
      var query6 = `select * from users where id = '${req.session.usernumber}';`
        var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
        var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
        var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
    
    
      pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{

        if(err) throw err;
        else {
          res.render('helpdesk_list',{result:result,title:'Helpdesk',login:true})
        }
      })
    })




    router.post('/replied', (req, res) => {
      let body = req.body

      var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

body['update_date'] = today;



console.log(req.body)

pool.query(`insert into replied set ?`,body,(err,result)=>{
  if(err) {
    console.log(err)
    throw err;
  }
  else {
    console.log('ss',result)
    pool.query(`update helpdesk set update_date = '${today}' , status = 'Online' where ticket_number = '${req.body.helpdeskid}'`, (err, result) => {
      if(err) {
        console.log(err)
        throw err;
      }
      else {
          res.json({
              status:200,
              type : 'success',
              description:'successfully update'
          })
      }
  })

  }
})

    
                
  })







  router.get('/helpdesk-replied',(req,res)=>{
    var query = `select * from helpdesk where ticket_number = '${req.query.id}';`
    var query1 = `select * from replied where helpdeskid = '${req.query.id}';`
    pool.query(query+query1,(err,result)=>{
      if(err) throw err;
      else {
        
        res.render('helpdesk-list',{result:result})
      
      }
    })
  })






  router.get('/shop/all-collections/filter',(req,res)=>{

    if(req.session.usernumber){
      var query = `select * from category order by id desc;`

 if(req.query.filter == 'high-to-low') {
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null
  order by (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') 
  ;`
  
 }
 else if(req.query.filter=='low-to-high'){

  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null
  order by (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') desc
  ;`


 }
 else if(req.query.filter=='z-to-a'){
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null
  order by name 
  ;`
}
else if(req.query.filter=='a-to-z'){
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null
  order by name desc
  ;`
}
else if(req.query.filter=='Best Sellers'){
  var query1 = `select p.* ,
  (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
  (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity

  from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null
  and type='Best Sellers'

  ;`
}


   
     
      var query2 = `select * from category where id = '${req.query.id}';`
      var query6 = `select * from users where id = '${req.session.usernumber}';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.usernumber}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
  
    
      pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
        if(err) throw err;
        else if(result[1][0]) res.render('all-shop',{result:result,login:true,title:'All Collections'})
        else  res.render('all-shop',{result,login:true,title:'All Collections'})
      })
    }
    else{
      var query = `select * from category order by id desc;`
      var query1 = `select p.* ,
      (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') as net_amount,
      (select m.quantity from product_manage m where m.productid = p.id and m.sizeid = 'S') as quantity
    
      from product p where (select m.net_amount from product_manage m where m.productid = p.id and m.sizeid = 'S') is not null;`
      
      var query2 = `select * from category where id = '${req.query.id}';`
      var query6 = `select * from users where id = '84';`
      var query7 = `select sum(quantity) as counter from cart where usernumber = '${req.session.ipaddress}';`
      var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.ipaddress}';`
      var query9 = `select * from wishlist_name where usernumber = '${req.session.usernumber}';`
  
  
      pool.query(query+query1+query2+query6+query7+query8+query9,(err,result)=>{
         if(err) throw err;
        else if(result[1][0]) res.render('all-shop',{result:result,login:false,title:'All Collections'})
        else  res.render('all-shop',{result,login:false,title:'All Collections'})
      })
    }
    
      
     
    })





    router.get('/support/update', (req, res) => {
      console.log(req.body)
    
                  pool.query(`update helpdesk set ? where id = ?`, [req.query, req.query.id], (err, result) => {
                      if(err) throw err;
                      else {
                          res.redirect('/admin/support')
                      }
                  })
          
  }) 


module.exports = router;
