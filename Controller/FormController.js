module.exports = (app, urlEncoder, fs, db) => {
  //data
  app.get("/", (req, res) => {
    res.status(200).render("index");
  });

  app.get("/form", (req, res) => {
    res.render("form", { qs: req.query });
  });

  const fileData = JSON.parse(fs.readFileSync("./Model/database.json"));

  app.post("/form", urlEncoder, (req, res) => {
    res.render("success", { getdata: req.body }); //Get body datas and route success page
    var obj = JSON.parse(JSON.stringify(req.body));
    fileData.push(obj);
    fs.writeFileSync(
      "./Model/database.json",
      JSON.stringify(fileData, null, 2)
    );
  });

  app.get("/form/:name", (req, res) => {
    const { name } = req.params;
    const people = fileData.find((person) => person.name === name);
    if (people) {
      res.status(200).json(people);
    } else {
      res.status(404).send("could not found your searchings");
    }
  });
};
