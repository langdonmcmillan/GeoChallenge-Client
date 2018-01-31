import User from "./user";

export default interface Authentication {
    user: User;
    authenticated: boolean;
};
