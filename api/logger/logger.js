var Logger = function () {};

Logger.prototype.info = (logText) => {
  console.log(new Date() + " info: " + logText);
};

Logger.prototype.debug = (logText) => {
  console.log(new Date() + "debug: " + logText);
};

Logger.prototype.error = (logText) => {
  console.log(new Date() + "error: " + logText);
};

module.exports = new Logger();
