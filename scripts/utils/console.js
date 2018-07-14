// console's color
const Color = {
  Reset: '\x1b[0m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
};

const Func = {
  notSupport(str) {
    console.log(`${Color.FgBlue}Sorry ${str} is not support now,
we will add the feature soon!${Color.Reset}`);
  },
  success(str) {
    console.log(`${Color.FgGreen}${str}${Color.Reset}`);
  },
  info(str) {
    console.log(`${Color.FgCyan}${str}${Color.Reset}`);
  },
};

module.exports = {
  Color,
  Func,
};
