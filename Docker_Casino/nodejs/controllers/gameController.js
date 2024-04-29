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
  try {
    const credits = req.session.credits;
    if (!credits) {
      throw new Error("Credits not provided");
    }
    const result = await gameService.roll(req, res);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
});

const cashOut = catchAsync(async (req, res) => {
  const response = gameService.cashOut(req, res);
  const credits = response.credits;
  const wallet = response.wallet;

  res.status(StatusCodes.OK).json({ credits, wallet });
});

//Export of the functions
module.exports = {
  getSessionData,
  getGame,
  roll,
  cashOut,
};
