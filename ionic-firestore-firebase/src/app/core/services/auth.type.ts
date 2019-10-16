enum AuthProvider {
    Email,
    Facebook
}

interface User {
    name?: string;
    email: string;
    password: string;
}

interface AuthOptions {
    isSignIn: boolean;
    provider: AuthProvider;
    user: User;
}

export { AuthProvider, AuthOptions, User };
