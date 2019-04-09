const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// var server = require('http').Server(app);


//social media routes
var twitterRoutes = require('./routes/twitter')

//use routes
app.use('/twitter',twitterRoutes)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  var server = app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  var io = require('socket.io')(server);

  io.set('origins', '*:*')
  io.set('match origin protocol', true)
  // server.listen(80);
  // WARNING: app.listen(80) will NOT work here!

  var chatMessages = []
  var isAdminConnected = false
  
  io.on('connection', function (socket) {

    console.log('there is a connection',socket.id)

    //get all the recent messages
    socket.on('Created',(data)=>{
      socket.emit('Created',chatMessages)
      
      socket.emit('is-admin-logged-in',isAdminConnected)
    })

    //a user disconnected
    socket.on('disconnect',()=>{
      console.log('disconnected',socket.id)
    })


    socket.on('send-to-all', function (data) {
      console.log(data,socket.id)
      socket.broadcast.emit('chat-message',(data))
      chatMessages.push({...data,type:3})
    }); 

    socket.on('is-admin-logged-in',(data)=>{
      console.log(data)
      isAdminConnected = data
      io.emit('is-admin-logged-in',isAdminConnected)
    })
    
  });

}
start()
