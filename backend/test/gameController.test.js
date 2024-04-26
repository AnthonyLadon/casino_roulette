// test/controllers/gameController.test.js
const { expect } = require("chai");
const gameController = require("../controllers/gameController");
const gameService = require("../services/gameService");

describe("gameController", () => {
  describe("getGame", () => {
    it("devrait renvoyer le jeu avec un statut 200", async () => {
      // Mock de la fonction startGame du gameService
      const mockGame = {
        /* Définir les données du jeu simulé */
      };
      gameService.startGame = async () => mockGame;

      // Mock des objets req et res
      const req = {};
      const res = {
        status: function (status) {
          expect(status).to.equal(200);
          return this; // Retourne l'objet res pour permettre le chaînage
        },
        json: function (data) {
          expect(data).to.deep.equal({ game: mockGame });
        },
      };

      // Appel de la fonction du contrôleur
      await gameController.getGame(req, res);
    });
  });
});
