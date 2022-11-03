const { ObjectId } = require("mongodb");
const db = require("../config/db");
const {
  collections: { RECIPE },
} = require("../constants");
const { makeError } = require("../helpers/error");

const getAllRecipes = async () => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);
  // Pagination can be applied by using limit
  return await recipes.find({}).toArray();
};

const getRecipe = async (id) => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);
  return await recipes.findOne({ _id: ObjectId(id) });
};

const getMyRecipe = async (name, username) => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);
  return await recipes.findOne({ name, username });
};

const addRecipe = async (recipe, username) => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);
  if (await getMyRecipe(recipe.name, username)) {
    throw makeError(new Error("Recipe with same name exists for you."), 400);
  }
  const recipeToInsert = { ...recipe, username };
  const result = await recipes.insertOne(recipeToInsert);
  return result;
};

const editRecipe = async (id, recipe, username) => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);

  const currentRecipe = await getRecipe(id);

  if (!currentRecipe) {
    throw makeError(new Error("ID not found"), 404);
  }

  const recipeToInsert = { ...currentRecipe, ...recipe };
  const result = await recipes.insertOne(recipeToInsert);
  return result;
};

const deleteRecipe = async (id) => {
  const dbo = await db;
  const recipes = dbo.collection(RECIPE);

  const result = await recipes.deleteOne({ _id: ObjectId(id) });
  if (result.deletedCount == 1) {
    return { message: "Deleted Successfully" };
  }
  throw makeError(new Error("ID not found"), 404);
};
module.exports = { getAllRecipes, addRecipe, getRecipe, deleteRecipe };
