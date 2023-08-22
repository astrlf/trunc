import { WriteStream } from 'node:tty';

enum Color {
  BG_MAGENTA = '\u001b[45m',
  BG_GREEN = '\u001b[42m',
  BG_RED = '\u001b[41m',

  RESET = '\u001b[0m',
}

/**
 * A simple coloured logger, mainly for eye candy.
 * Ideally, we'll want to add log files
 */
class Logger {
  /**
   * Singleton instance
   */
  private static _instance: Logger;

  constructor(public namespace: string) { }

  static instance(namespace: string): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger(namespace);
    }

    return Logger._instance;
  }

  /**
   * Internal method to rite to a given stream.
   * We can use this to write to stdout or stderr
   */
  private _write(color: Color, stream: WriteStream, ...args: unknown[]) {
    stream.write(`${color} ${this.namespace} ${Color.RESET} ${args.join(' ')}\n`);
  }

  /**
   * A normal log, prints to stdout
   */
  info(...args: unknown[]) {
    this._write(Color.BG_MAGENTA, process.stdout, ...args);
  }

  /**
   * A success log, prints to stdout
   */
  success(...args: unknown[]) {
    this._write(Color.BG_GREEN, process.stdout, ...args);
  }

  /**
   * An error log, prints to stderr
   */
  error(...args: unknown[]) {
    this._write(Color.BG_RED, process.stderr, ...args);
  }

  /**
   * A fatal error log, prints to stderr, then exits the process
   * with a non-zero exit code
   */
  fatal(...args: unknown[]) {
    this._write(Color.BG_RED, process.stderr, ...args);
    process.exit(1);
  }
}

export { Logger };