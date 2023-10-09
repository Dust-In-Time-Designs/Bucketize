import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {User} from '../models/users';

const tableName = 'users';

enablePromise(true);

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getUsers = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get userss !!!');
  }
};

export const getUser = async (db: SQLiteDatabase, id: number) => {
  try {
    const user = await db.executeSql(
      `SELECT * FROM ${tableName} where rowid = ${id}`,
    );
    return user;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get userss !!!');
  }
};

export const updateUser = async (db: SQLiteDatabase, user: User) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    `(${user.id}, '${user.firstName}', '${user.lastName}', '${user.email}', '${user.phoneNumber}', '${user.birthday}')`;

  return db.executeSql(insertQuery);
};

export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
