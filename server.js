const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// connection a mongoDB
db.mongoose
  .connect(`${dbConfig.mongoURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connecte à MongoDB.')
    initial()
  })
  .catch((err) => {
    console.error('Connection error', err)
    process.exit()
  })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API Hour." });
});

require("./app/routes/auth.routes")(app);

// Port d'ecoute
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}.`);
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("'user' est ajouté à la collection de rôles");
      });      
    }
  });
}
