const { StatusCodes } = require("http-status-codes");
const gameService = require("../services/gameService");
const catchAsync = require("../helpers/catchAsync");

const getSessionData = (req, res) => {
  if (!req.session.credits) {
    req.session.credits = 0;
  }
  if (!req.session.wallet) {
    req.session.wallet = 0;
  }
  const credits = req.session.credits;
  const wallet = req.session.wallet;
  res.json({ credits, wallet });
};

const getGame = async (req, res) => {
  gameService.startGame(req, res);
};

const roll = catchAsync(async (req, res) => {
  gameService.roll(req, res);
});

const cashOut = catchAsync(async (req, res) => {
  gameService.cashOut(req, res);
});

//Export of the functions
module.exports = {
  getSessionData,
  getGame,
  roll,
  cashOut,
};
