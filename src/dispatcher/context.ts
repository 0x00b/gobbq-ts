import { RequestType, CompressType, ContentType, Header, ServiceType } from '../../proto/bbq';
import * as _m0 from "protobufjs/minimal";

import {
  encode,
  // StreamInitMessage,
  // ,
  UnaryRequestMessage,
  // isUnaryMessage,
  UnaryResponseMessage,
} from '../codec/msg';
import { Packet } from '../codec/packet';
import { MethodDefinition } from './service';
import { ClientTransport } from '../transport/base';

const noopNext = () => Promise.resolve();

// 默认窗口大小 字节, 2^21 - 1
// eslint-disable-next-line @typescript-eslint/naming-convention
const DEFAULT_WINDOW_SIZE = 2097151;

/**
 * 方便处理Middleware声明，合并`UnaryContext`和`StreamContext`
 */
class Context {
  public readonly timestamp = Date.now();

  // public type: 'unary' | 'stream';

  /**
   * 用于unary调用
   * pkt
   */
  // public pkt: Packet | undefined;
  /**
   * 用于unary调用
   * request
   */
  public req: any;

  /**
   * 用于unary调用
   * request
   */
  // public sreq: StreamInitMessage | undefined;

  /**
   * server-side streaming RPC时客户端发送的数据
   * @api private
   */
  // public streamData: Buffer | undefined;

  /**
   * 用于unary调用
   */
  // private unaryResCode = 0//RetCode.INVOKE_SUCCESS;
  private unaryResMessage: any;

  // private source: Source | undefined;
  // private transport: ClientTransport | undefined;
  // private streamHandle?: Middleware<any>;
  private internalResponded = false;

  // private methodDef:MethodDefinition<any,any>;

  public constructor(private pkt: Packet, private methodDef: MethodDefinition<any, any>, private transport: ClientTransport /*| StreamInitMessage, source: Source | ITransport*/) {
    // if (isUnaryMessage(req)) {
    // this.type = 'unary';
    // this.pkt = pkt;

    let {
      requestDeserialize
    } = methodDef

    this.req = requestDeserialize(pkt.PacketBody())

    // this.transport = source as ITransport;
    // } else {
    // this.type = 'stream';
    // this.pkt = pkt;
    // this.sreq = req;
    // this.source = source as Source;
    // }
  }

  /**
   * 连接是否已销毁
   */
  public get connDestroyed(): boolean {
    // if (this.transport) {
    //   return !!this.transport.destroyed;
    // }

    // if (this.source) {
    //   return !!this.source.destroyed;
    // }

    return false;
  }

  /**
   * Return  `func`
   */
  public get Method(): string {
    if (this.pkt) {
      return this.pkt.Header.Method;
    }
    return ""//"this.pkt?.requestMeta?.func as string";
  }

  /**
   * 用于unary调用
   * Return  `request_id`
   */
  public get RequestId(): string | undefined {
    return this.pkt?.Header.RequestId;
  }

  /**
   * 用于unary调用
   * Return  `call_type`
   */
  public get ServiceType(): ServiceType | undefined {
    return this.pkt?.Header.ServiceType;
  }

  /**
   * 用于uanry调用
   * Return  `timeout`
   */
  public get Timeout(): number | undefined {
    return this.pkt?.Header.Timeout;
  }


  /**
   * `unaryReq.data` 或者 server-side streaming RPC时客户端发送的数据
   * @api public
   */
  public get data(): Buffer | undefined {
    if (this.req) {
      let body = this.req.PacketBody()
      if (!body) {
        return undefined
      }
      return Buffer.from(body);
    }

    return undefined//this.streamData;
  }

  /**
   * Return  `content_type`
   */
  public get ContentType(): ContentType {
    if (this.req) {
      return this.req.Header.ContentType;
    }
    return 0//this.spkt?.contentType as number;
  }

  /**
   * Return  `content_encoding`
   */
  public get CompressType(): CompressType {
    if (this.req) {
      return this.req.Header.CompressType;
    }
    return 0//this.spkt?.contentEncoding as number;
  }

  /**
   * Return  `trans_info`
   */
  public TransInfo(): Record<string, Uint8Array> | undefined {
    if (this.req) {
      return this.req.Header.TransInfo;
    }

    return undefined//this.spkt?.requestMeta?.context;
  }

  /**
   * 用于unary调用
   * status:  retCode
   */
  public get status(): number {
    return 0//this.unaryResCode;
  }

  public set status(status: number) {
    // this.unaryResCode = status;
  }

  /**
   * 用于unary调用
   *  unary调用响应消息
   */
  public get responseBody(): any {
    return this.unaryResMessage;
  }

  public set responseBody(message: any) {
    this.unaryResMessage = message;
  }

  // /**
  //  * 用于client-side streaimg RPC调用
  //  * @param data Buffer
  //  */
  // public respond(data?: Buffer): void

  // /**
  //  * 用于unary返回响应
  //  * @param message
  //  */
  // public respond(message: UnaryResponseMessage): void;

  public respond(/*message?: Buffer | UnaryResponseMessage*/): void {
    // if (this.type === 'unary') {
    this.respondUnary(/*message as UnaryResponseMessage*/);
    // } else {
    // this.respondStream(Buffer.isBuffer(message) ? message : undefined);
    // }
  }

  // 发送init系统错误
  public error(code: number, message: string) {
    // if (this.type === 'stream') {
    //   // this.source?.sendInitMessage({
    //   //   responseMeta: {
    //   //     retCode: code,
    //   //     errMessage: message,
    //   //   },
    //   //   initWindowSize: this.remoteWriteWindowSize,
    //   // });
    // } else {
    // this.respond({
    //   // Header:{
    //   //   ErrCode: code,
    //   //   ErrMsg:message,
    //   // }
    // });
    // }
  }

  /**
   * @api private
   * @param err
   */
  public onerror(err?: Error) {
    this.error(1, err?.message || 'sys error');
  }

  private respondUnary(/*message: UnaryResponseMessage*/): void {
    if (this.internalResponded /*|| this.callType === CallType.ONEWAY_CALL*/) {
      return;
    }

    // no response
    if (this.methodDef.responseType == undefined) {
      return
    }

    let respHdr = Header.create({ ...this.pkt?.Header })
    respHdr.RequestType = RequestType.RequestRespone
    respHdr.DstEntity = this.pkt?.Header.SrcEntity
    respHdr.SrcEntity = this.pkt?.Header.DstEntity

    let {
      responseSerialize
    } = this.methodDef

    this.internalResponded = true;

    this.transport?.send(encode({ Header: respHdr, Body: responseSerialize(this.responseBody) }));
  }
}

export type { Context };

export type ParameterizedContext<CustomContextT> = Context & CustomContextT;

export function createContext<CustomT = {}>(...args: ConstructorParameters<typeof Context>) {
  return new Context(...args) as ParameterizedContext<CustomT>;
}
