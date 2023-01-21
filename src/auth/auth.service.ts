import { ForbiddenException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
    constructor(private readonly _users: UsersService) { }

    async login(
        email: string,
        password: string,
        values: { userAgent: string; ipAddress: string }
    ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        // need to import userService
        const user = await this._users.findByEmail(email);
        if (!user) throw new ForbiddenException('Access Denied');
        // verify your user -- use argon2 for password hashing!!
        if (user.password !== password) throw new ForbiddenException('Access Denied');
        // need to create this method
        return this.newRefreshAndAccessToken(user, values);
    }

    newRefreshAndAccessToken(user: User, values: { userAgent: string; ipAddress: string; }) {
        const refreshObject = new RefreshToken({
            userId: user.id,
            email: user.email,
            ...values,

        });
        // // add refreshObject to your db in real app
        // this.refreshTokens.push(refreshObject);

        return {
            refreshToken: refreshObject.sign(),
            // sign is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
            accessToken: sign(
                {
                    userId: user.id,
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                },
            ),
        };
    }


    async refresh(refreshStr: string) {
        // need to create this helper function.
        // const refreshToken = await this.retrieveRefreshToken(refreshStr);

        const refreshToken = verify(refreshStr, process.env.REFRESH_SECRET);
        if (typeof refreshToken === 'string') {
            return undefined;
        }

        if (!refreshToken) {
            return undefined;
        }

        const user = await this._users.findOne(refreshToken.userId);
        if (!user) {
            return undefined;
        }

        const accessToken = {
            userId: refreshToken.userId,
        };

        // sign is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
        return {
            accessToken: sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
        };
    }

}
