// NOTE:!!
// DON'T EDIT IT!!
//  请勿添加其他内容，包括函数，结构体，变量等等，否则重新生成时会丢失。

import { UnaryResponse } from "../src/context/unary";
import { Client, Context } from "../src";
import { makeClientConstructor } from "../src/bbq/bbq";
import { ServiceType } from "./bbq";
import Long from "long";
import { PingPong } from "./gate"
import { RegisterClientRequest } from "./gate"
import { RegisterClientResponse } from "./gate"
	
// GateService
export type GateServiceDefinition = typeof GateServiceDefinition;
export const GateServiceDefinition = {
  typeName: "gatepb.GateService",
  serviceType: ServiceType.Service, 
  methods: {
    RegisterClient: {
      methodName: "RegisterClient",
      requestType: RegisterClientRequest,
      responseType: RegisterClientResponse,
      requestSerialize: (req: RegisterClientRequest): Buffer => {
        return Buffer.from(RegisterClientRequest.encode(req).finish())
      },
      requestDeserialize: (input: Uint8Array): RegisterClientRequest => {
        return RegisterClientRequest.decode(input)
      },
      responseSerialize: (req: RegisterClientResponse): Buffer => {
        return Buffer.from(RegisterClientResponse.encode(req).finish())
      },
      responseDeserialize: (input: Uint8Array): RegisterClientResponse => {
        return RegisterClientResponse.decode(input)
      },
    },
	
    UnregisterClient: {
      methodName: "UnregisterClient",
      requestType: RegisterClientRequest,
      responseType: undefined,
      requestSerialize: (req: RegisterClientRequest): Buffer => {
        return Buffer.from(RegisterClientRequest.encode(req).finish())
      },
      requestDeserialize: (input: Uint8Array): RegisterClientRequest => {
        return RegisterClientRequest.decode(input)
      },
      responseSerialize: (req: any): Buffer => {
        return Buffer.from("")
      },
      responseDeserialize: (input: Uint8Array): any => {
        
      },
    },
	
    Ping: {
      methodName: "Ping",
      requestType: PingPong,
      responseType: PingPong,
      requestSerialize: (req: PingPong): Buffer => {
        return Buffer.from(PingPong.encode(req).finish())
      },
      requestDeserialize: (input: Uint8Array): PingPong => {
        return PingPong.decode(input)
      },
      responseSerialize: (req: PingPong): Buffer => {
        return Buffer.from(PingPong.encode(req).finish())
      },
      responseDeserialize: (input: Uint8Array): PingPong => {
        return PingPong.decode(input)
      },
    },
	},
} as const;

export interface GateService {

	// RegisterClient
	RegisterClient(request: RegisterClientRequest):UnaryResponse<RegisterClientResponse>

	// UnregisterClient
	UnregisterClient(request: RegisterClientRequest):void

	// Ping
	Ping(request: PingPong):UnaryResponse<PingPong>
}

export interface GateServiceService {

	// RegisterClient
	RegisterClient(c: Context, request: RegisterClientRequest):UnaryResponse<RegisterClientResponse>

	// UnregisterClient
	UnregisterClient(c: Context, request: RegisterClientRequest):void

	// Ping
	Ping(c: Context, request: PingPong):UnaryResponse<PingPong>
}

export function RegisterGateServiceService(client: Client<any>, svc: GateServiceService){
  client.register(GateServiceDefinition, svc)
}

export function NewGateService(client: Client<any>): GateService {
  return makeClientConstructor(client, GateServiceDefinition) as unknown as GateService
}

