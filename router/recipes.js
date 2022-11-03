const {
  getAllRecipes,
  addRecipe,
  deleteRecipe,
} = require("../controllers/recipes");
const { authorize } = require("../helpers/authorize");
const { makeError } = require("../helpers/error");

// use JOI for making object models
const router = require("express").Router();

router.get("/", (req, res, next) => {
  getAllRecipes()
    .then((resp) => res.json(resp))
    .catch(next);
});

router.post("/", authorize, (req, res, next) => {
  const { name, description, ingredients, category } = req.body;
  if (!name) {
    throw makeError(new Error("Invalid Name", 400));
  }
  if (!description || (description && description.length <= 10)) {
    throw makeError(new Error("Description length should be atleast 10"), 400);
  }
  if (!ingredients || (ingredients && ingredients.length == 0)) {
    throw makeError(new Error("Enter at least one ingredient"), 400);
  }
  if (!category) {
    throw makeError(new Error("Invalid category"), 400);
  }

  const recipe = {
    name,
    description,
    ingredients,
    category,
  };
  addRecipe(recipe, req.user.username)
    .then((resp) => res.json(resp))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    throw makeError(new Error("Invalid ID", 400));
  }

  deleteRecipe(id)
    .then((resp) => {
      res.json(resp);
    })
    .catch(next);
});
module.exports = router;
