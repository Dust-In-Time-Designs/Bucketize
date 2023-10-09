import {supabase} from '../lib/supabase';
import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {User, CreateUser} from '../models/users';

enablePromise(true);

export const getUsers = async (db: SQLiteDatabase): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql('SELECT rowid as id,value FROM users');
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
    const user = await db.executeSql(`SELECT * FROM users where rowid = ${id}`);
    return user;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get userss !!!');
  }
};

export const addUser = async (user: CreateUser) => {
  const {data, error} = await supabase.from('todo').insert([
    {
      firstName,
    },
  ]);
};

export const updateUser = async (db: SQLiteDatabase, user: User) => {
  const insertQuery =
    'REPLACE INTO users(id, firstName, lastName, email, phoneNumber, birthday) values' +
    `(${user.id}, '${user.firstName}', '${user.lastName}', '${user.email}', '${user.phoneNumber}', '${user.birthday}')`;

  return db.executeSql(insertQuery);
};

export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from users where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};
