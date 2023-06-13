/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "gatepb";

export interface PingPong {
}

export interface RegisterClientRequest {
  EntityID: Long;
}

export interface RegisterClientResponse {
  EntityID: Long;
}

function createBasePingPong(): PingPong {
  return {};
}

export const PingPong = {
  encode(_: PingPong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingPong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingPong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): PingPong {
    return {};
  },

  toJSON(_: PingPong): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<PingPong>): PingPong {
    return PingPong.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<PingPong>): PingPong {
    const message = createBasePingPong();
    return message;
  },
};

function createBaseRegisterClientRequest(): RegisterClientRequest {
  return { EntityID: Long.UZERO };
}

export const RegisterClientRequest = {
  encode(message: RegisterClientRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.EntityID.isZero()) {
      writer.uint32(8).uint64(message.EntityID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterClientRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterClientRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.EntityID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterClientRequest {
    return { EntityID: isSet(object.EntityID) ? Long.fromValue(object.EntityID) : Long.UZERO };
  },

  toJSON(message: RegisterClientRequest): unknown {
    const obj: any = {};
    message.EntityID !== undefined && (obj.EntityID = (message.EntityID || Long.UZERO).toString());
    return obj;
  },

  create(base?: DeepPartial<RegisterClientRequest>): RegisterClientRequest {
    return RegisterClientRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RegisterClientRequest>): RegisterClientRequest {
    const message = createBaseRegisterClientRequest();
    message.EntityID = (object.EntityID !== undefined && object.EntityID !== null)
      ? Long.fromValue(object.EntityID)
      : Long.UZERO;
    return message;
  },
};

function createBaseRegisterClientResponse(): RegisterClientResponse {
  return { EntityID: Long.UZERO };
}

export const RegisterClientResponse = {
  encode(message: RegisterClientResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.EntityID.isZero()) {
      writer.uint32(8).uint64(message.EntityID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterClientResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterClientResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.EntityID = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterClientResponse {
    return { EntityID: isSet(object.EntityID) ? Long.fromValue(object.EntityID) : Long.UZERO };
  },

  toJSON(message: RegisterClientResponse): unknown {
    const obj: any = {};
    message.EntityID !== undefined && (obj.EntityID = (message.EntityID || Long.UZERO).toString());
    return obj;
  },

  create(base?: DeepPartial<RegisterClientResponse>): RegisterClientResponse {
    return RegisterClientResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RegisterClientResponse>): RegisterClientResponse {
    const message = createBaseRegisterClientResponse();
    message.EntityID = (object.EntityID !== undefined && object.EntityID !== null)
      ? Long.fromValue(object.EntityID)
      : Long.UZERO;
    return message;
  },
};

export type GateDefinition = typeof GateDefinition;
export const GateDefinition = {
  name: "Gate",
  fullName: "gatepb.Gate",
  methods: {
    registerClient: {
      name: "RegisterClient",
      requestType: RegisterClientRequest,
      requestStream: false,
      responseType: RegisterClientResponse,
      responseStream: false,
      options: {},
    },
    unregisterClient: {
      name: "UnregisterClient",
      requestType: RegisterClientRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    ping: {
      name: "Ping",
      requestType: PingPong,
      requestStream: false,
      responseType: PingPong,
      responseStream: false,
      options: {},
    },
  },
} as const;

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
