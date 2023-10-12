process.env.PWD = process.cwd()

let express = require('express');
let app = express();

app.set('view engine', 'ejs');
const dbname = 'dia_db';

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/admin_home', (req, res) => {
  res.render('pages/admin/admin_home');
})

app.get('/abbot', (req, res) => {
  res.render('pages/abbot');

})

app.get('/contact', (req, res) => {
  res.render('pages/contact');

})

app.get('/quiz', (req, res) => {
  res.render('pages/quiz');

})
app.get('/newsfeed', (req, res) => {
  res.render('pages/newsfeed');

})


app.get('/profil', (req, res) => {
  var assert = require('assert');
  // let user_list = [{'name':'blabla'}, {'name':'oxox'}]
  // res.render('pages/admin/users', {'users': user_list})
  const collection = db.collection('users');
  collection.find({}).toArray(function (err, user_list) {
    assert.equal(err, null);


    let proname = req.headers.cookie;
    proname = proname.replace("username;", "");
    proname = proname.replace("username=", "");
    res.render('pages/profil', { 'users': user_list, 'proname': proname });

  })


})



app.get('/sights', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('sights');
  collection.find({}).toArray(function (err, sight_list) {
    assert.equal(err, null);

    res.render('pages/sights', { 'sights': sight_list });


  })
});

app.get('/register', (req, res) => {
  res.render('pages/register');

})

app.get('/login', (req, res) => {
  res.render('pages/login');

})



app.get('/act', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('acts');
  collection.find({}).toArray(function (err, act_list) {
    assert.equal(err, null);
    var acturl = '#';
    // res.render('pages/act', {'acts': act_list});
    res.render('pages/act', { 'acts': act_list, acturl: acturl });

  })
})

app.get('/act2', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('acts');
  collection.find({}).toArray(function (err, act_list) {
    assert.equal(err, null);
    var x = 0;
    res.render('pages/admin/act2', { 'acts': act_list, x: x });


  })
})


/*

app.get('/reserv', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('revs');
  collection.find({}).toArray(function (err, rev_list) {
    assert.equal(err, null);
    var revurl = '#';
    // res.render('pages/act', {'acts': act_list});
    res.render('pages/reserv', { 'revs': rev_list, revurl: revurl });

  })
})

*/



app.get('/reserv', (req, res) => {
  var assert = require('assert');

  const collectionUsers = db.collection('users');
  const collectionEvents = db.collection('events');

  // Retrieve user list
  collectionUsers.find({}).toArray(function (err, user_list) {
    assert.equal(err, null);

    // Retrieve event list
    collectionEvents.find({}).toArray(function (err, event_list) {
      assert.equal(err, null);
      
      if (req.headers.cookie) {
        proname = req.headers.cookie;
      } else {
        proname = 'Guest';
      }
      proname = proname.replace("username;", "");
      proname = proname.replace("username=", "");

      // Render the 'profil' page with the combined data
      res.render('pages/reserv', { 'users': user_list, 'events': event_list, 'proname': proname });
    });
  });
});

app.get('/rev2', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('userrev');
  collection.find({}).toArray(function (err, rev_list) {
    assert.equal(err, null);
    var x = 0;
    res.render('pages/admin/reserv2', { 'revs': rev_list, x: x });


  })
})

app.get('/events', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('events');
  collection.find({}).toArray(function (err, event_list) {
    assert.equal(err, null);

    res.render('pages/events', { 'events': event_list });


  })
});

app.get('/eventrate', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('events');
  collection.find({}).toArray(function (err, event_list) {
    assert.equal(err, null);

    res.render('pages/eventrate', { 'events': event_list });


  })
});

app.get('/history', (req, res) => {
  var assert = require('assert');

  const collectionUsers = db.collection('users');
  const collectionEvents = db.collection('events');
  const collectionUserrev = db.collection('userrev');

  // Retrieve user list
  collectionUsers.find({}).toArray(function (err, user_list) {
    assert.equal(err, null);

    // Retrieve event list
    collectionEvents.find({}).toArray(function (err, event_list) {
      assert.equal(err, null);

      collectionUserrev.find({}).toArray(function (err, userrev_list) {
        assert.equal(err, null);
      
      if (req.headers.cookie) {
        proname = req.headers.cookie;
      } else {
        proname = 'Guest';
      }
      proname = proname.replace("username;", "");
      proname = proname.replace("username=", "");

      // Render the 'profil' page with the combined data
      res.render('pages/history', { 'users': user_list, 'events': event_list, 'proname': proname, 'userrevs': userrev_list });
    });
  });
});
});

/* 
app.get('/history', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('events');
  collection.find({}).toArray(function (err, event_list) {
    assert.equal(err, null);

    res.render('pages/history', { 'events': event_list });


  })
});
*/



app.get('/sights2', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('sights');
  collection.find({}).toArray(function (err, sight_list) {
    assert.equal(err, null);

    res.render('pages/admin/sights2', { 'sights': sight_list });


  })
});

app.get('/events2', (req, res) => {
  var assert = require('assert');

  const collection = db.collection('events');
  collection.find({}).toArray(function (err, event_list) {
    assert.equal(err, null);

    res.render('pages/admin/events2', { 'events': event_list });


  })
});




app.use(express.static(process.env.PWD + '/images'));
app.use(express.static(__dirname + '/public'));
app.listen(3000);




var bodyParser = require("body-parser")
var mongoose = require("mongoose");
const { Callbacks } = require('jquery');

var $ = require('jquery');
const { start } = require('repl');
app.use(express.static('scripts'));



app.use(bodyParser.json())
app.use(express.static('pages'))
app.use(bodyParser.urlencoded({
  extended: true
}))

mongoose.connect('mongodb://localhost:27017/dia_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))


app.get('/users', (req, res) => {
  var assert = require('assert');
  // let user_list = [{'name':'blabla'}, {'name':'oxox'}]
  // res.render('pages/admin/users', {'users': user_list})
  const collection = db.collection('users');
  collection.find({}).toArray(function (err, user_list) {
    assert.equal(err, null);

    res.render('pages/admin/users', { 'users': user_list });

  })
})

app.post('/delete', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('users');
  db.collection("users").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/users')
    })


})

app.post("/edit", (req, res) => {


  const name1 = req.body.name

  const name = req.body.id
  const email = req.body.email

  db.collection("users").updateOne({ name: name }, {
    $set: {
      name: name1,
      'email': email
    }
  })
    .then(function (doc) {

      res.redirect('/users')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});









/*const name = req.body.checkbox
console.log(name);
//const collection = db.collection('users');
//collection.deleteOne(function(err, user){
//})
const collection = db.collection('users');
db.collection("users").deleteOne({'name': name})
  .then(function(doc){
    console.log("User Deleted")
    res.redirect('/users')
  })
 
 
})*/


/* res.render('pages/admin/users');
 
const db = client.db(dbname);
db.collection('users').find({}).toArray(function(err, user_list){
  assert.equal(err, null);
  res.render('users', {'users': user_list})
});
*/


app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var psw = req.body.psw;

  var data = {
    "name": name,
    "email": email,
    "psw": psw
  }

  db.collection('users').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.render('pages/index');

});

app.post("/addreview", (req, res) => {
  
  var name = req.body.name;
  var desc = req.body.desc;
  var rate = req.body.rate;


  var data = {
    "name": name,
    "desc": desc,
    "rate": rate
  }
  const collection = db.collection('reviews');
  db.collection('reviews').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.redirect('/eventrate');

});



app.post("/addsight", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var tropoi = req.body.tropoi;
  var photo = req.body.photo;
  var xpos = req.body.xpos;
  var ypos = req.body.ypos;

  var data = {
    "name": name,
    "desc": desc,
    "tropoi": tropoi,
    "photo": photo,
    "xpos": xpos,
    "ypos": ypos
  }
  const collection = db.collection('sights');
  db.collection('sights').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.redirect('/sights2')

});

app.post("/editsight", (req, res) => {
  const name = req.body.original;

  const name1 = req.body.name;
  const photo = req.body.photo;
  const desc = req.body.desc;
  const tropoi = req.body.tropoi;
  var xpos = req.body.xpos;
  var ypos = req.body.ypos;

  db.collection("sights").updateOne({ name: name }, {
    $set: {
      name: name1,
      'desc': desc,
      'tropoi': tropoi,
      'photo': photo,
      "xpos": xpos,
      "ypos": ypos
    }
  })
    .then(function (doc) {

      res.redirect('/sights2')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});

app.post('/deletesight', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('sights');
  db.collection("sights").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/sights2')
    })


})

//ACTIVITIES
app.post("/addact", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var cat = req.body.cat;
  var photo = req.body.photo;

  var data = {
    "name": name,
    "desc": desc,
    "cat": cat,
    "photo": photo
  }
  const collection = db.collection('acts');
  db.collection('acts').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.redirect('/act2')

});

app.post("/editact", (req, res) => {
  const name = req.body.original;

  const name1 = req.body.name;
  const photo = req.body.photo;
  const desc = req.body.desc;
  const cat = req.body.cat;

  db.collection("acts").updateOne({ name: name }, {
    $set: {
      name: name1,
      'desc': desc,
      'cat': cat,
      'photo': photo
    }
  })
    .then(function (doc) {

      res.redirect('/act2')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});

app.post('/deleteact', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('acts');
  db.collection("acts").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/act2')
    })


})

app.post('/actfilter', function (req, res) {
  const name = req.body.checkbox;
  var acturl = String(name);
  var name1 = '/act#'.concat(acturl);

  var assert = require('assert');

  const collection = db.collection('acts');
  collection.find({}).toArray(function (err, act_list) {
    assert.equal(err, null);

    res.render('pages/act', { 'acts': act_list, acturl: acturl });


  })
  //  res.render('pages/act', {acturl: acturl});
  //      res.redirect(name1);

})

var moment = require("moment");
//USERRESERVATION
app.post("/adduserrev", (req, res) => {

  var revuser = req.body.revuser;
  var eventid = req.body.eventID;
  var many = req.body.data;
  var email = req.body.email;
  var seat = req.body.seat;
  var cardtype = req.body.cardtype;
  var price = req.body.price;
  var cardname = req.body.creditnum;
  var catchpa = req.body.catchfive;


  var data = {
    "revuser": revuser,
    "eventid": eventid,
    "many": many,
    "email": email,
    "seat": seat,
    "cardtype": cardtype,
    "price": price,
    "cardname": cardname,
    "catchpa": catchpa
  }
  const collection = db.collection('userrev');
  db.collection('userrev').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.render('pages/index');

});

app.post("/edituserrev", (req, res) => {
  var many = req.body.data;
  var dateValue = req.body.tripstart;
  var datestart = req.body.tripstart;
  var dateend = req.body.tripend;

  var trainhour = req.body.trainrideone;
  var trainhour2 = req.body.trainride11;
  var fclass = req.body.wagon;
  var seat = req.body.seat;
  var cardtype = req.body.cardtype;
  var price = req.body.price;
  var cardname = req.body.creditnum;
  var catchpa = req.body.catchfive;
  db.collection("userrev").updateOne({ many: many }, {
    $set: {
      "many": many,
      "datestart": datestart,
      "dateend": dateend,
      "trainhour": trainhour,
      "trainhour2": trainhour2,
      //  "fclass": fclass,
      "seat": seat,
      "cardtype": cardtype,
      "price": price,
      "cardname": cardname,
      "catchpa": catchpa
    }
  })
    .then(function (doc) {

      res.redirect('/index')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});

app.post('/deleteuserrev', function (req, res) {
  const many = req.body.checkbox


  const collection = db.collection('userrev');
  db.collection("userrev").deleteOne({ 'catchpa': many })
    .then(function (doc) {

      res.redirect('/rev2')
    })


})

app.post('/deletesight', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('sights');
  db.collection("sights").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/sights2')
    })


})

//RESERVATIONS
app.post("/addrev", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var price = req.body.price;
  var cat = req.body.cat;
  var photo = req.body.photo;


  var data = {
    "name": name,
    "desc": desc,
    "cat": cat,
    "photo": photo,
    "price": price
  }
  const collection = db.collection('revs');
  db.collection('revs').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.redirect('/rev2')

});

app.post("/editrev", (req, res) => {
  const name = req.body.original;

  const name1 = req.body.name;
  const photo = req.body.photo;
  const desc = req.body.desc;
  const price = req.body.price;
  const cat = req.body.cat;

  db.collection("revs").updateOne({ name: name }, {
    $set: {
      name: name1,
      'desc': desc,
      'cat': cat,
      'photo': photo,
      'price': price
    }
  })
    .then(function (doc) {

      res.redirect('/rev2')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});

app.post('/deleterev', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('revs');
  db.collection("revs").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/rev2')
    })


})

app.post('/revfilter', function (req, res) {
  const name = req.body.checkbox;
  var revurl = String(name);
  var name1 = '/reserv#'.concat(revurl);

  var assert = require('assert');

  const collection = db.collection('revs');
  collection.find({}).toArray(function (err, rev_list) {
    assert.equal(err, null);

    res.render('pages/reserv', { 'revs': rev_list, revurl: revurl });


  })
  //  res.render('pages/act', {acturl: acturl});
  //      res.redirect(name1);

})














//EVENTS
app.post("/addevent", (req, res) => {
  var name = req.body.name;
  var desc = req.body.desc;
  var date = req.body.date;
  var photo = req.body.photo;
  var mapp = req.body.mapp;

  var data = {
    "name": name,
    "desc": desc,
    "date": date,
    "photo": photo,
    "mapp": mapp
  }
  const collection = db.collection('events');
  db.collection('events').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  res.redirect('/events2')

});

app.post("/editevent", (req, res) => {
  const name = req.body.original;

  const name1 = req.body.name;
  const photo = req.body.photo;
  const mapp = req.body.mapp;
  const desc = req.body.desc;
  const date = req.body.date;

  db.collection("events").updateOne({ name: name }, {
    $set: {
      name: name1,
      'desc': desc,
      'date': date,
      'photo': photo,
      'mapp': mapp
    }
  })
    .then(function (doc) {

      res.redirect('/events2')
    })
    .catch((err) => {
      console.log('Error:' + err);
    })
});

app.post('/deleteevent', function (req, res) {
  const name = req.body.checkbox

  //const collection = db.collection('users');
  //collection.deleteOne(function(err, user){
  //})
  const collection = db.collection('events');
  db.collection("events").deleteOne({ 'name': name })
    .then(function (doc) {

      res.redirect('/events2')
    })


})

app.post('/logout', function (req, res) {
  res.clearCookie("username");
  res.clearCookie("admin");
  res.render('pages/index');
  res.end();


})







// AWESOME SOLUTION

app.post("/login", (req, res) => {




  var x = 0;
  db.collection('users').findOne(



    {
      $and: [
        { name: req.body.name },
        { psw: req.body.psw }
      ]
    },

    (err, result) => {

      if (err) {
        res.status(500).send(err);
        return;
      }

      if (req.body.name == 'admin' && req.body.psw == 'adminpass') {
        x = 2;
        res.cookie('admin', req.body.name)
        res.render('pages/admin/admin_home');

      } else if (!result) {

        res.render('pages/login');
      } else {
        x = 1;

        res.cookie('username', req.body.name)


        res.render('pages/index', { x: x });

      }
    });


})

/*
  db.collection('users').find(data,(err,collection)=>{
    if(){
          res.render('pages/login');
      }
      else{
      res.render('pages/index');
          
      }
 
  });

*/

