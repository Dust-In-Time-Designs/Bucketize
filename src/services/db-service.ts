import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'bucketize.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase, tableName: String) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase, tableName: String) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
