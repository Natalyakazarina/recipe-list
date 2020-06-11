const DATA_KEY = "DATA_KEY";

class RecipesService {
  constructor (){
    this.save=this.save.bind(this)
  }
  save(data) {
    const currentRecipe = this.get();

    currentRecipe.push({ id: currentRecipe.length, ...data });

    window.localStorage.setItem(DATA_KEY, JSON.stringify(currentRecipe));
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
    const recipeData = window.localStorage.getItem(DATA_KEY(currentRecipeId));
    return recipeData;
  }
}

export default new RecipesService();