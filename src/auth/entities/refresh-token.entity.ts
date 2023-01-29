import { sign } from 'jsonwebtoken';

export class RefreshToken {
    id: number;
    userId: number;
    email: string;
    userAgent: string;
    ipAddress: string;

    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }

    sign() {
        return sign({ ...this }, process.env.REFRESH_SECRET);
    }
}
