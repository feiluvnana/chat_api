export const baseMessages = {
    OK: {
        code: 1000,
        msg: "OK."
    },
    RESOURCE_NOT_FOUND: {
        code: 1001,
        msg: "The requested resource isn't exist."
    },
    INVALID_PARAMS: {
        code: 1002,
        msg: "The parameters are invalid."
    },
    UNAUTHORIZED: {
        code: 1003,
        msg: "Login failed."
    },
    INVALID_TOKEN: {
        code: 1004,
        msg: "Token is missing or invalid."
    },
    RESOURCE_CREATION_FAILED: {
        code: 1005,
        msg: "The resource creation failed."
    },
    RESOURCE_LOOKUP_FAILED: {
        code: 1006,
        msg: "An error occured when looking up for resource."
    },
    RESOURCE_DUPLICATED: {
        code: 1007,
        msg: "This info is already used."
    },
    RESOURCE_DELETION_FAILED: {
        code: 1008,
        msg: "An error occured when deleting resource."
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