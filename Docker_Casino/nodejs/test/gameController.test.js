// test/controllers/gameController.test.js
const { expect } = require("chai");
const gameController = require("../controllers/gameController");
const gameService = require("../services/gameService");

describe("gameController", () => {
  describe("getGame", () => {
    it("devrait renvoyer le jeu avec un statut 200", async () => {
      const mockGame = {
        /* Définir les données du jeu simulé */
      };
      gameService.startGame = async () => mockGame;

      const req = {};
      const res = {
        status: function (status) {
          expect(status).to.equal(200);
          return this;
        },
        json: function (data) {
          expect(data).to.deep.equal({ game: mockGame });
        },
      };

      await gameController.getGame(req, res);
    });
  });

  describe("getSessionData", () => {
    it("devrait renvoyer les données de session de type number avec un statut 200", async () => {
      const req = { session: {} };
      const res = {
        json: function (data) {
          expect(data).to.have.property("credits").that.is.a("number");
          expect(data).to.have.property("wallet").that.is.a("number");
        },
      };

      await gameController.getSessionData(req, res);
    });
  });

  describe("cashOut", () => {
    const testCases = [
      { credits: 50, wallet: 100 },
      { credits: 1000, wallet: 1000 },
      { credits: 0, wallet: 0 },
    ];

    testCases.forEach((testCase, index) => {
      it(`devrait renvoyer les crédits et le portefeuille mis à jour avec un statut 200 - Test ${
        index + 1
      }`, async () => {
        const mockResponse = testCase;
        gameService.cashOut = async () => mockResponse;

        const req = {};
        const res = {
          status: function (status) {
            expect(status).to.equal(200);
            return this;
          },
          json: function (data) {
            expect(data).to.deep.equal(mockResponse);
          },
        };

        await gameController.cashOut(req, res);
      });
    });
  });
});
