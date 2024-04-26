const { StatusCodes } = require("http-status-codes");
const gameService = require("../services/gameService");
const catchAsync = require("../helpers/catchAsync");

const getGame = async (req, res) => {
  gameService.startGame(req, res);
  console.log("credits start-game: " + req.session.credits);
};

const roll = catchAsync(async (req, res) => {
  console.log("credits roll: " + req.session.credits);
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
  console.log("credits cahsOut: " + req.session.credits);
  // Logique de récolte de gain
  res.status(StatusCodes.OK).json({ message: "Game cashed out" });
});

// ****** Export des Controllers ******************/

module.exports = {
  getGame,
  roll,
  cashOut,
};
