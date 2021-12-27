const router = require("express").Router();
let Ongoing = require("../models/ongoing");
router.route("/").get((req, res) => {
  Ongoing.find()
    .then((ong) => res.json(ong))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const projectName = req.body.projectName;
  const description = req.body.description;
  const newProject = new Ongoing({ projectName, description });
  newProject
    .save()
    .then(() => res.json("Project added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Ongoing.findById(req.params.id)
    .then((ong) => res.json(ong))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  console.log("deleted");
  Ongoing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Ongoing.findById(req.params.id)
    .then((ong) => {
      ong.projectName = req.body.projectName;
      ong.description = req.body.description;

      ong
        .save()
        .then(() => res.json("Project updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
