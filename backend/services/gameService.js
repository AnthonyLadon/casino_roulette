const initialCredits = process.env.INITIAL_USER_CREDIT;

const startGame = async (req, res) => {
  try {
    if (!req.session.hasOwnProperty("credits")) {
      req.session.credits = initialCredits;
    }
    const credits = req.session.credits;
    res.json({ credits });
  } catch (error) {
    res.json({ message: error.message });
  }
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
    const credits = req.body.credits;
    if (credits > req.session.credits) {
      throw new Error("Not enough credits");
    }

    req.session.credits -= 1;
    const result = generateRandomRollResult();

    // Logique pour calculer les gains et les crédits

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const cashOut = async () => {
  // Logique pour retirer les crédits
};

module.exports = {
  startGame,
  roll,
  cashOut,
};
