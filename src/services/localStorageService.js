const DATA_KEY = "DATA_KEY";

class RecipesService {
  constructor() {
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
    this.clear = this.clear.bind(this)
    this.getData = this.getData.bind(this)
  }

  save(data) {
    const currentRecipes = this.get();
    let newItem;

    if (data.id !== undefined) {
      const editIndex = currentRecipes.findIndex((recipe) => recipe.id === data.id);
      currentRecipes[editIndex].name = data.name;
      currentRecipes[editIndex].description = data.description;

      newItem = currentRecipes[editIndex];
    } else {
      const id = currentRecipes.length === 0 ? 0 : currentRecipes[currentRecipes.length - 1].id + 1;
      newItem = { id, ...data };

      currentRecipes.push(newItem);
    }

    window.localStorage.setItem(DATA_KEY, JSON.stringify(currentRecipes));

    return currentRecipes;
  }

  remove(id) {
    const currentRecipes = this.get();
    const editIndex = currentRecipes.findIndex((recipe) => recipe.id === id);

    currentRecipes.splice(editIndex, 1);

    console.warn(currentRecipes);

    window.localStorage.setItem(DATA_KEY, JSON.stringify(currentRecipes));

    return currentRecipes;
  }


  clear() {
    window.localStorage.clear();
    console.log("Hello kitty");
  }


  get() {
    const dataRaw = window.localStorage.getItem(DATA_KEY);

    let recipes = [];

    if (dataRaw) {
      recipes = JSON.parse(dataRaw);
    }

    return recipes;
  }

  getData(currentRecipeId) {
    const recipes = this.get();

    return recipes.find((recipe) => recipe.id === +currentRecipeId);
  }
}

export default new RecipesService();
