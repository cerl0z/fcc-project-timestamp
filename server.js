// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { application } = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let dateParams = req.params.date;
  const date = new Date(dateParams);

  if (dateParams === undefined) {
    const currDate = Date.now();
    const currUTCDate = new Date(currDate).toUTCString();
    res.json({
      unix: currDate,
      utc: currUTCDate,
    });
  } else if (
    date.toString().length !== 0 &&
    dateParams.toString().length === 13
  ) {
    let dateString = dateParams.toString();
    let dateNumber = new Number(dateString);

    const millisecondDate = new Date(dateNumber);
    res.json({
      unix: millisecondDate.getTime(),
      utc: millisecondDate.toUTCString(),
    });
  } else if (
    date.toString().length !== 0 &&
    date.toString() === "Invalid Date"
  ) {
    res.json({
      error: "Invalid Date",
    });
  } else
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
