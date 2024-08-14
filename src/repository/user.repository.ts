import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}


@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    getFilteredUsers(
        firstname?: string,
        lastname?: string,
        state?: string,
        sortBy?: string,
        sortOrder?: SortOrder,
        page: number = 1,
        limit: number = 10,
    ):SelectQueryBuilder<User> {
        const query: SelectQueryBuilder<User> = this.createQueryBuilder('user');

        if (firstname) {
            query.andWhere('user.firstname ILIKE :firstname', { firstname: `%${firstname}%` });
        }

        if (lastname) {
            query.andWhere('user.lastname ILIKE :lastname', { lastname: `%${lastname}%` });
        }

        if (state) {
            query.andWhere('user.state ILIKE :state', { state: `%${state}%` });
        }

        query.orderBy(`user.${sortBy}`, sortOrder);
        query.skip((page - 1) * limit).take(limit);

        return query;
    }
}
