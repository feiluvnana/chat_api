export const baseMessages = {
    OK: {
        code: 1000,
        msg: "OK."
    },
    NOT_FOUND: {
        code: 1001,
        msg: "The requested resources are not found."
    },
    INVALID_PARAM: {
        code: 1002,
        msg: "The parameters are invalid."
    },
    CREATE_FAILED: {
        code: 1003,
        msg: "The resource creation failed."
    },
    DUPLICATED: {
        code: 1004,
        msg: "There's already another resource with these information."
    },
    LOGIN_FAILED: {
        code: 1005,
        msg: "Login failed."
    },

}

export interface BaseMessage {
    code: number;
    msg: string;
}

export interface SingleResourceMessage extends BaseMessage {
    data: object;
}

export interface MultiResourcesMessage extends BaseMessage {
    meta: {
        count: number,
        offset: number,
    };
    data: object[];
}

export interface ErrorMessage extends BaseMessage {
    error: {
        desc: string,
        details?: object | object[]
    }
}

export type ResponseMessage = BaseMessage | MultiResourcesMessage | SingleResourceMessage | ErrorMessage