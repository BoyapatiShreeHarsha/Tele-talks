//Node server which will handle socket io connections
const io=require('socket.io')(8000)

const users={};
// io.once('connect', console.log);
io.on('connection',socket =>{
    socket.on('new-user-joined', namey =>{
        console.log(`new user ${namey} has joined`);
        users[socket.id]=namey;
        socket.broadcast.emit('user-joined',namey);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, n: users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
})

