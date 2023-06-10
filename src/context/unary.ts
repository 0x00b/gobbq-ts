import { strictEqual } from 'assert';
import { BaseContext } from './base';
import { ERROR, RpcError } from '../error';

// type only
import type { UnaryRequestMessage, UnaryResponsePacket } from '../codec/msg';
import type { Options } from './base';
import type { Endpoint } from '../endpoint';


export type UnaryResponse<ResponseType> = Promise<{ error: ERROR, response: ResponseType }>


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UnaryOptions extends Options {
  /**
   * 是否自动重试
   */
  retry: boolean;
}

/**
 * unary 调用的上下文
 */
export class UnaryContext<CustomOptions extends UnaryOptions> extends BaseContext<CustomOptions> {
  public response?: UnaryResponsePacket;
  public type = 'unary' as const;

  public constructor(
    public readonly request: UnaryRequestMessage,
    public readonly options: Pick<UnaryOptions, 'timeout' | 'retry'> & Partial<CustomOptions>,
  ) {
    super();
  }

  /** 便于观察 */
  public toJSON() {
    return {
      ...super.toJSON(),
      request: this.request,
      response: this.response,
    };
  }

  /**
   * 处理 Unary 响应
   */
  public respond(res: UnaryResponsePacket | undefined, local: Endpoint | undefined) {
    console.log('[respond]', res, local);
    if (!this.pending) { return };
    if (!this.options.hasResponse) { return }

    strictEqual<undefined>(this.response, undefined);
    if (!res) {
      throw "unexpected res"
    }

    this.local = local;
    this.response = res;

    const { ErrCode } = res.Header;
    // 框架错误
    if (typeof ErrCode === 'number' && ErrCode !== 0) {
      this.end(new RpcError(ErrCode, res.Header.ErrMsg ?? `framework error ${ErrCode}`));
      return;
    }
  }
}
