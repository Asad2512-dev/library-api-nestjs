declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    FINE_RATE_PER_DAY: number;
    THROTTLER_TTL: number;
    THROTTLER_LIMIT: number;
}
export declare function validate(config: Record<string, any>): EnvironmentVariables;
export {};
