import convict from "convict";

const config = convict({
  app: {
    name: {
      default: "Account Service",
      doc: "Service Name'",
      format: String,
    },
  },
  cacheTTL: {
    default: 60 * 60 * 1,
    doc: "TTL for node cache.",
    env: "CACHE_TTL",
    format: Number,
  },
   decimalPoint: {
    default: 3,
    doc: "Decimal point for account balance.",
    env: "DECIMAL_POINT",
    format: Number,
  },
  defaultAccountBalance: {
    default: 1000000000,
    doc: "The default account balance of user.",
    env: "DEFAULT_ACCOUNT_BALANCE",
    format: Number,
  },
  env: {
    default: "development",
    doc: "The application environment.",
    env: "NODE_ENV",
    format: ["production", "development", "staging", "test"],
  },
  maximumAmountInAccount: {
    default: 999999999999999,
    doc: "Maximum Amount In Account.",
    env: "MAXIMUM_AMOUNT_IN_ACCOUNT",
    format: Number,
  },
  maximumDepositLimit: {
    default: 1000000,
    doc: "Maximum Deposit limit at the time.",
    env: "MAXIMUM_DEPOSIT_LIMIT",
    format: Number,
  },
  maximumWithdrawLimit: {
    default: 1000000,
    doc: "Maximum Withdraw limit at the time.",
    env: "MAXIMUM_WITHDRAW_LIMIT",
    format: Number,
  },
  port: {
    default: 4000,
    doc: "The port to bind.",
    env: "PORT",
    format: Number,
  },
  socket:  {
    path: {
      default: "/faye",
      doc: "Faye service socket path",
      env: "SOCKET_PATH",
      format: String,
    },
    timeout: {
      default: 45,
      doc: "Faye service timeout",
      env: "SOCKET_TIMEOUT",
      format: Number,
    },
  },
  transferService: {
    password: {
      default: "admin@#@$%!",
      doc: "Transfer service password",
      format: String,
    },
    userName: {
      default: "admin@transferService.com",
      doc: "Transfer service username",
      format: String,
    },
  },
});

config.validate({ allowed: "strict" });

export default config;
