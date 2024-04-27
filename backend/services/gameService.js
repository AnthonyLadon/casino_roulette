const initialCredits = parseInt(process.env.INITIAL_USER_CREDIT);
const { StatusCodes } = require("http-status-codes");

const startGame = (req, res) => {
  if (req.session.credits < 10 || !req.session.credits) {
    req.session.credits = initialCredits;
  }
  const credits = req.session.credits;
  req.session.save();
  res.json({ credits });
};

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
    if (req.session.credits < 1) {
      throw new Error("Not enough credits");
    }

    const result = await generateRandomRollResult();
    req.session.credits -= 1;

    let creditsWon = 0;

    if (req.session.credits >= 40 && req.session.credits < 60) {
      const isWining = result.every((symbol) => symbol === result[0]);
      if (isWining) {
        const shouldReroll = Math.random() >= 0.7;
        if (shouldReroll) {
          result = await generateRandomRollResult();
        }
      }
    } else if (req.session.credits >= 60) {
      const isWining = result.every((symbol) => symbol === result[0]);
      if (isWining) {
        const shouldReroll = Math.random() >= 0.4;
        if (shouldReroll) {
          result = await generateRandomRollResult();
        }
      }
    }

    const isWining = result.every((symbol) => symbol === result[0]);
    if (isWining) {
      const symbol = result[0];
      creditsWon = symbols[symbol];
      req.session.credits += creditsWon;
    }

    const { credits } = req.session;

    res.status(StatusCodes.OK).json({ result, credits, creditsWon, isWining });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const cashOut = async (req, res) => {
  credits = req.session.credits;
  // TODO logique pour transfer les crédits dans la base de données de l'utilisateur
  res.json({ credits });
};

module.exports = {
  startGame,
  roll,
  cashOut,
};
