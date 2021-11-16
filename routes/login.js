var express = require('express');
var router = express.Router();
var pool =  require('./pool');








router.get('/',(req,res)=>{
  var query = `select * from category order by id desc;`
  var query1 = `select * from website_customize where name = 'pp';`
  var query2 = `select * from website_customize where name = 'about';`

  var query6 = `select * from users where id = '85';`
  var query7 = `select count(id) as counter from cart where usernumber = '${req.session.usernumber}';`
  var query8 = `select count(id) as counter from wishlist where usernumber = '${req.session.usernumber}';`
    pool.query(query+query1+query2+query6+query7+query8,(err,result)=>{
        if(err) throw err;
        else res.render('login',{msg : '' , login:false,result:result})
        // else res.json(result)
    })
  

})



router.post('/verification',(req,res)=>{
    let body = req.body
    // body['number'] = 91+req.body.number
    req.session.numberverify = 91+req.body.number
    var otp =   Math.floor(100000 + Math.random() * 9000);
    req.session.reqotp = otp;
    res.render('otp',{msg : otp , anothermsg:''  })
    //   console.log(req.body)


    
   })




router.post('/new-user',(req,res)=>{
  let body = req.body;
  if(req.body.otp == req.session.reqotp){
    body['number'] = req.session.numberverify
  

pool.query(`select * from users where number = '${req.session.numberverify}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]) {


    if(req.session.page){
  pool.query(`update cart set usernumber = '${req.session.numberverify}' where usernumber = '${req.session.ipaddress}'`,(err,result)=>{
    if(err) throw err;
    else {
      req.session.usernumber = req.session.numberverify;
      res.redirect('/checkout')
    }
  })
    }
    else {
      req.session.usernumber = req.session.numberverify;
      res.redirect('/')
    }


  }
  else {

    pool.query(`insert into users set ?`,body,(err,result)=>{
      if(err) throw err;
      else {
       





        if(req.session.page){
          pool.query(`update cart set usernumber = '${req.session.numberverify}' where usernumber = '${req.session.ipaddress}'`,(err,result)=>{
            if(err) throw err;
            else {
              req.session.usernumber = req.session.numberverify;
              res.redirect('/checkout')
            }
          })
            } 
            else {
              req.session.usernumber = req.session.numberverify;
              res.redirect('/')
            }



      }
    })
  }
})



  }
  else{

  res.render('otp',{msg : '' , anothermsg : 'Invalid Otp'})
    
  }
})


module.exports = router;
