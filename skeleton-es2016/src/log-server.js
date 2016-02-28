import {HttpClient} from 'aurelia-fetch-client';

export class LogServer {

  httpClient;
  cache = []; // TODO localStorage

  constructor() {
    this.httpClient = new HttpClient();
    setInterval(this.sendToServer.bind(this), 5000);
  }

  sendToServer() {
    if (this.cache.length) {
      console.log(['SEND CACHE!!!', ''].concat(this.cache).join('\n'));
      this.cache = [];
    }
  }

  debug(logger, ...rest) {
    this.storeInCache('DEBUG', logger, ...rest);
  }

  info(logger, ...rest) {
    this.storeInCache('INFO', logger, ...rest);
  }

  warn(logger, ...rest) {
    this.storeInCache('WARNING', logger, ...rest);
  }

  error(logger, ...rest) {
    this.storeInCache('ERROR', logger, ...rest);
  }

  storeInCache(type, logger, ...rest) {
    this.cache.push(new Date().toISOString() + ' ' + type + ' [' + logger.id + '] ' + Array.from(rest).join('\n'));
  }
}

