import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
import * as bcrypt from 'bcrypt';

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

        console.log(user);


        if (bcrypt.compare(user.password, password)) {
            return this.newRefreshAndAccessToken(user, values);
        } else {
            throw new ForbiddenException('Access Denied');
        }

    }

    newRefreshAndAccessToken(user: User, values: { userAgent: string; ipAddress: string; }) {
        const refreshObject = new RefreshToken({
            userId: user.id,
            email: user.email,
            ...values,

        });

        return {
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
            refreshToken: refreshObject.sign(),


        };
    }


    async refresh(refreshStr: string) {

        try {
            const refreshToken = verify(refreshStr, process.env.REFRESH_SECRET);

            if (typeof refreshToken == 'string') return undefined
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

        } catch (err) {
            return new HttpException({ err }, HttpStatus.BAD_REQUEST)
        }

    }

}
