export default class Mod{
    static username = '';
    static articles = [];
    static setArticlesCallback = null;

    static setArticles(articles) {
        if (Mod.setArticlesCallback) {
            Mod.setArticlesCallback(articles);
        }
    }

    static initialize(setArticles) {
        Mod.setArticlesCallback = setArticles;
    }


}