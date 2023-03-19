const Token = require("./models/token");
const fernet = require('fernet');


exports.token = async (req, res) => {
  try {
    const { riotToken } = req.body;
    const token = await Token.create({ riotToken });
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

exports.encrypt = async (req, res) => {
  try {
    const { data } = req.body;
    const token = await Token.findOne().catch(console.log)
    const fernetToken = new fernet.Token({
      secret: token.riotToken,
      time: Date.now(),
      payload: JSON.stringify(data),
    })
    const encryptedData = fernetToken.encode(data);
    res.json({ encryptedData});
  } catch (error) {
    console.log(error);
  }
};
const secret = new fernet.Secret(Token.riotToken);
  const token = new fernet.Token({ secret });
  const encrypted = token.encode(data);
  return encrypted;