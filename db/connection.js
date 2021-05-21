const mongoose = require("mongoose");//mongodb said to use it for stopping findandupdate warnings IDK

mongoose.set("useFindAndModify", false);
mongoose.connect(
  "mongodb://localhost/auditCollection",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb!");
  }
);

module.exports = {mongoose};