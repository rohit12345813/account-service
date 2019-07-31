import config from "./config";

interface IMethodHelper {
  setDigit(input: string | number): string;
  getUniqId(): string;
  isEmail(input: string): boolean;
  isString(input: string): boolean;
  isNumber(input: number): boolean;
}

const methodHelper: IMethodHelper = {
  setDigit(input) {
    return parseFloat(input.toString()).toFixed(config.get("decimalPoint"));
  },

  getUniqId() {
    return (Math.floor(Math.random() * 90000) + 1000000000).toString();
  },

  isEmail(input)  {
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(input);
  },

  isString(input) {
    return !!(input && input.trim());
  },

  isNumber(input) {
    return ((!isNaN(input)) && input > 0);
  },
};

export default methodHelper;
