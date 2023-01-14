import jwt from 'jsonwebtoken';

export const jwtSign = async (payload: object, secret: string, expiresIn: string | number): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const jwtVerify = async (token: string, secret: string): Promise<string | jwt.JwtPayload | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
};

export const jwtDecode = (token: string): string | jwt.JwtPayload | null => {
    return jwt.decode(token);
};
