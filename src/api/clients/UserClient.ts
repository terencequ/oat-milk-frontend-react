import {UserApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

export const createUserClient = (): UserApi => {
    return new UserApi(undefined, process.env.REACT_APP_API_URL);
}