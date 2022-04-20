export class Login {
    static readonly type = '[user] logged in';
}

export class Logout {
    static readonly type = '[user] logged out';
}

export class FetchUser {
    static readonly type = '[user] fetched';
}