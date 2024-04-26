const { StatusCodes } = require("http-status-codes");
const gameService = require("../../../Archive/services/gameService");
const catchAsync = require("../../../Archive/helpers/catchAsync");

const getGame = async (req, res) => {
  try {
    const game = await gameService.startGame(req, res);
    if (!game) {
      throw new Error("Game not found");
    }
  } catch (error) {
    // res.json({ message: error.message });
  }
};

const roll = catchAsync(async (req, res) => {
  try {
    const credits = req.body.credits;
    if (!credits) {
      throw new Error("Credits not provided");
    }
    const result = await gameService.roll(credits);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
});

const cashOut = catchAsync(async (req, res) => {
  // Logique de récolte de gain
  res.status(StatusCodes.OK).json({ message: "Game cashed out" });
});

// ****** Export des Controllers ******************/

module.exports = {
  getGame,
  roll,
  cashOut,
};
