const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const options = {
    allowEIO3: true
};
const io = require("socket.io")(httpServer, options);

// App setup
const PORT = 5099;
const server = httpServer.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));
app.use(express.json());

const activeUsers = new Map();
const clipboards = new Map();

let data = "";

app.get('/api/clipboards/:id', function (req, res) {
    res.send(JSON.stringify({text: data}));
});
app.post('/api/clipboards/:id', function (req, res) {
    console.log(req.body);
    clipboards.set(req.params.id);
    data = req.body.text;
    res.send({params: req.params, body: req.body});
});

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("clipboard:join", function (data) {
    console.log("clipboard:join", data);
    if (clipboards.has(data.clipboard_id)) {
        let clip = clipboards.get(data.clipboard_id);
        console.log(clip);
    } else {
        clipboards.set(data.clipboard_id, data.browser_id);
    }

    io.emit("clipboard:join", [data.clipboard_id, data.browser_id]);
  });

  socket.on("clipboard:update", function (data) {
    io.emit("clipboard:update", data);
});


  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });
});