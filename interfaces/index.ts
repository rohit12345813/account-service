export interface ICreateAccountService {
  email: string;
}

export interface IDepositAmountService {
  amount: number;
  destinationAccountNumber: string;
}

export interface IWithdrawAmountService {
  amount: number;
  sourceAccountNumber: string;
  email: string;
}

export interface IPublishAccountBalanceService  {
  accountNumber: string;
  balance: string;
}

export interface ICache {
  cacheInstance: NodeCache | null;
  deleteKey(input: string): Promise<boolean | object>;
  setCache(): void;
  getCacheInstance(): NodeCache;
  getKey(key: string): Promise<string>;
  setKey(key: string, value: object): Promise<object>;
  getKeys(): Promise<[string] | string>;
  getMultipleKeysWithValues(keys: [string]): Promise<object>;
  isKeyValuePresent(key: string, value: string): Promise<boolean>;
}

export interface IMethodHelper {
  setDigit(input: string | number): string;
  getUniqId(): string;
  isEmail(input: string): boolean;
  isString(input: string): boolean;
  isNumber(input: number): boolean;
}

export interface IData  {
  data?: object | string;
  reason?: object | string;
}
