import clc from 'cli-color';
import { LOG_LEVEL } from '../constants';

const loglevelList = ['debug', 'log', 'info', 'warn', 'error'];
let loglevelIndex = loglevelList.indexOf(LOG_LEVEL);
loglevelIndex = loglevelIndex < 0 ? 1 : loglevelIndex;

type LogFn = {
  debug: (...args: any) => void;
  log: (...args: any) => void;
  info: (...args: any) => void;
  warn: (...args: any) => void;
  error: (...args: any) => void;
};

const logFn: LogFn = loglevelList.reduce(
  (acc: any, level: string, index: number) => {
    if (index >= loglevelIndex) {
      acc[level] = (...args: any) => {
        switch (level) {
          case 'error':
            level = clc.red(level);
            break;
          case 'warn':
            level = clc.yellow(level);
            break;
          case 'info':
            level = clc.blue(level);
            break;
          case 'log':
            level = clc.magenta(level);
            break;
          case 'debug':
            level = clc.cyan(level);
            break;
          default:
            break;
        }
        console.log(`[${level}] `, ...args);
      };
    } else {
      acc[level] = () => {};
    }
    return acc;
  },
  {}
);

export default logFn;
