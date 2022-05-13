const Menu = require("../../models/menu");
function homeControler() {
  return {
    async index(req, res) {
      const pizza = await Menu.find({});
      res.render("home", { pizza: pizza });
    },
  };
}

module.exports = homeControler;
