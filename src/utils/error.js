
/**
 * https://note.youdao.com/ynoteshare1/index.html?id=19109a01a9d964e92b425d0d7f64b787&type=note
 */
const SCRIPT_ERROR = 'scriptError';
const PROMISE_ERROR = 'promiseError';
const RESOURCE_LOAD_ERROR = 'resourceLoadError';
const DEFAULT = 'default';

export default class SystemErrorMan {
  constructor() {

    this.handlers = {};
  }

  // 包装一层额外信息产生新的error
  static wrap( err, info ) {
    if ( !info ) info = {};

    if ( typeof info === 'string' ) {
      info = {
        type: info,
        payload: {},
      };
    }

    const { type = DEFAULT, payload = {} } = info;

    // 重载
    if ( !err ) err = new Error( '' );

    let newError;
    if ( err._wrapped ) {
      newError = err;
      !err.payload && (err.payload = {});
      err.payload = {
        ...payload,
      };
    } else {
      newError = Object.create( err );
      newError._error = err;
      // 根据 payload 为newError 新增属性
      newError._wrapped = true;
      newError.name = 'SystemError';
      newError.handleType = type;
      newError.payload = payload;
    }
    return newError;
  }

  init( {
          listenGlobal = false,
          registerConfig,
          defaultHandle = err => {
            console.log( 'systemErrorMan默认处理的err' + err );
          },
        } ) {
    this.registerHandle( {
      [ DEFAULT ]: defaultHandle,
    } );

    if ( listenGlobal ) this.listenGlobal();
    if ( registerConfig ) this.registerHandle( registerConfig );
  }

  listenGlobal() {
    // 捕获阶段监听
    const isBrowser = typeof window !== 'undefined';

    isBrowser && window.addEventListener( 'error', ( event ) => {
      if ( event.error.message ) {
        this.handle( event.error, SCRIPT_ERROR  );
        //资源加载错误
      } else {
        this.handle( event.error, RESOURCE_LOAD_ERROR );
      }
    }, true );

    isBrowser && window.addEventListener( 'unhandledrejection', error => {
      // console.log(`Promise.reject()中的内容，告诉你发生错误的原因:${error.reason}`);
      // console.log(`Promise对象 :${error.promise}`);
      this.handle( error, PROMISE_ERROR);
    } );
  }

  handle( err, info ) {
    // 选择错误处理程序进行handle
    const newError = SystemErrorMan.wrap( err, info );
    const handler = this.selectHandle( newError );
    handler(newError, newError.payload);
  }

  throw( err, info ) {
    throw SystemErrorMan.wrap( err, info );
  }

  // 注册handle 处理程序
  // handleType 用来匹配具体的错误处理程序
  registerHandle( handleType, handle ) {
    // 批量注册
    if ( typeof handleType === 'object' ) {
      this._registerHandleMul( handleType );
    } else {
      this._registerHandleOne( handleType, handle );
    }
  }

  // 单个handle的注册
  _registerHandleOne( handleType, handle ) {
    if ( this.handlers[ handleType ] ) console.warn(
      `类型为${ type }的错误处理函数重复注册` );
    this.handlers[ handleType ] = handle;
  }

  // 多个handle的注册
  _registerHandleMul( handleMap ) {
    for ( let handleType in handleMap ) {
      if ( handleMap.hasOwnProperty( handleType ) ) {
        this._registerHandleOne( handleType, handleMap[ handleType ] );
      }
    }
  }

  // 选择错误处理程序
  selectHandle( err ) {
    return this.handlers[ err.handleType ] || this.handlers[ DEFAULT ];
  }
}