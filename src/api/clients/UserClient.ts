import {
    ErrorResponse,
    UserApi,
    UserAuthTokenResponse,
    UserLoginRequest
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {processError} from "./helpers/ErrorHelper";

const createUserClient = (): UserApi => {
    return new UserApi(undefined, process.env.REACT_APP_API_URL);
}

export async function login (request: UserLoginRequest): Promise<[UserAuthTokenResponse | null, ErrorResponse | null]> {
    try {
        const res = await createUserClient().userLoginPost(request);
        return [res.data, null];
    } catch (err) {
        return [null, processError(err)];
    }
}