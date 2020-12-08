const { clearCookies } = require("./cookie");

class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = async (err, res) => {
  const { status, message } = err;
  if (status === 401) {
    await clearCookies(res);
  }
  res.status(status || 500).json({
    status,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
