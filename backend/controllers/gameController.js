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
  await gameService.startGame(req, res);
};

const roll = catchAsync(async (req, res) => {
  await gameService.roll(req, res);
});

const cashOut = catchAsync(async (req, res) => {
  await gameService.cashOut(req, res);
});

//Export of the functions
module.exports = {
  getSessionData,
  getGame,
  roll,
  cashOut,
};
