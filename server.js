const app = require('./app')
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});
const port = process.env.PORT || 3001
/* app.listen(port , (req,res)=>{
console.log('server started @ port ' + port)
})
*/


server.listen(port, function() {
    console.log(`Server started on port ${port}`);
  });
  io.on('connection',(socket)=>{
    console.log("user connected"+socket.id);
    socket.on("message", (data)=>{
       socket.broadcast.emit('message' , data)
    })


    socket.on("servo1", (data)=>{
        socket.broadcast.emit('servo1' , data)
        console.log('servo1 responding ' ,data)
     })
     socket.on("servo2", (data)=>{
        socket.broadcast.emit('servo2' , data)
        console.log("light 1 : " + data)
     })
     socket.on("servo3", (data)=>{
        socket.broadcast.emit('servo3' , data)
        console.log("ligt 2 : " + data)
     })
   /*  socket.on("servo4", (data)=>{
        socket.broadcast.emit('servo4' , data)
        console.log("hey : " + data)
     })
     socket.on("servo5", (data)=>{
        socket.broadcast.emit('servo5' , data)
        console.log("hey : " + data)
     })


     socket.on("servo6", (data)=>{
        socket.broadcast.emit('servo6' , data)
        console.log("hey : " + data)
     })
     socket.on("servo7", (data)=>{
        socket.broadcast.emit('servo7' , data)
        console.log("hey : " + data)
     })
     socket.on("servo8", (data)=>{
        socket.broadcast.emit('servo8' , data)
        console.log("hey : " + data)
     })
     socket.on("servo9", (data)=>{
        socket.broadcast.emit('servo9' , data)
        console.log("hey : " + data)
     })
     socket.on("servo11", (data)=>{
        socket.broadcast.emit('servo11' , data)
        console.log("hey : " + data)
     })
     socket.on("servo12", (data)=>{
        socket.broadcast.emit('servo12' , data)
        console.log("hey : " + data)
     })
     */
    }) 