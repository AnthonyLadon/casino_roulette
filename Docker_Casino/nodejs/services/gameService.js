const initialCredits = parseInt(process.env.INITIAL_USER_CREDIT);
const { StatusCodes } = require("http-status-codes");

const startGame = (req, res) => {
  req.session.credits = initialCredits;
  const credits = req.session.credits;
  if (!req.session.wallet) {
    req.session.wallet = 0;
  }
  const wallet = req.session.wallet;
  req.session.save();
  res.json({ credits, wallet });
};

// initiate symbols/values
const symbols = {
  cherry: 10,
  lemon: 20,
  orange: 30,
  watermelon: 40,
};

const generateRandomRollResult = () => {
  const symbolsArray = Object.keys(symbols);
  const result = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * symbolsArray.length);
    result.push(symbolsArray[randomIndex]);
  }
  return result;
};

const roll = async (req, res) => {
  try {
    let creditsWon = 0;

    if (req.session.credits < 1) {
      throw new Error("Not enough credits");
    }

    const result = generateRandomRollResult();
    req.session.credits -= 1;

    if (req.session.credits >= 40 && req.session.credits < 60) {
      const isWining = result.every((symbol) => symbol === result[0]);
      if (isWining) {
        const shouldReroll = Math.random() >= 0.7;
        if (shouldReroll) {
          result = generateRandomRollResult();
        }
      }
    } else if (req.session.credits >= 60) {
      const isWining = result.every((symbol) => symbol === result[0]);
      if (isWining) {
        const shouldReroll = Math.random() >= 0.4;
        if (shouldReroll) {
          result = generateRandomRollResult();
        }
      }
    }

    const isWining = result.every((symbol) => symbol === result[0]);
    if (isWining) {
      const symbol = result[0];
      creditsWon = symbols[symbol];
      req.session.credits += creditsWon;
    }

    const credits = req.session.credits;

    res.status(StatusCodes.OK).json({ result, credits, creditsWon, isWining });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const cashOut = async (req, res) => {
  try {
    const wallet = req.session.credits;
    req.session.credits = 0; // reset credits
    const credits = req.session.credits;

    res.status(StatusCodes.OK).json({ credits, wallet });

    // TODO logique pour transferer les crédits en base de données
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  startGame,
  roll,
  cashOut,
};
