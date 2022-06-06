import express, {Application, Request, Response} from 'express'

const app: Application = express()
const httpServer = require("http").createServer(app)
import {ClipboardCollection} from "./ClipboardCollection"
const options = {
    allowEIO3: true
};
const io = require("socket.io")(httpServer, options)

// App setup
const PORT = 5099;
const server = httpServer.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
});

// Static files
app.use(express.static("public"));
app.use(express.json());

const activeUsers = new Map();
//const clipboards = new Map();


const clipboards = ClipboardCollection.init();

app.get('/api/clipboards/:id', function (req: Request, res: Response) {
  console.log("get clipboard" + req.params.id);
  const clipboard = clipboards.get(req.params.id);

  if (clipboard) {
    res.send(JSON.stringify(clipboard));
  } else {
    res.statusCode = 404;
    res.send(JSON.stringify({
      error: "This clipboard does not exist"
    }));
  }
});
app.put('/api/clipboards/:id', function (req: Request, res: Response) {
    console.log("Update clipboard %s", req.params.id);
    console.log(req.body);
    clipboards.update(req.params.id, req.body.text);
    res.send({params: req.params, body: req.body});
});

app.post('/api/clipboards/', function (req: Request, res: Response) {
  console.log("New Clipboard");
  res.send(clipboards.new());
});

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("clipboard:join", function (data) {
    console.log("clipboard:join", data);
    /*if (clipboards.has(data.clipboard_id)) {
        let clip = clipboards.get(data.clipboard_id);
        console.log(clip);
    } else {
        clipboards.set(data.clipboard_id, data.browser_id);
    }*/

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