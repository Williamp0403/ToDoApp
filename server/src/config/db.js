import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()

export const db = createClient({  
  url: 'libsql://todo-app-williamp0403.aws-us-east-1.turso.io',
  authToken: process.env.TOKEN_DB
})

await db.execute (
  ` CREATE TABLE IF NOT EXISTS Users (
    id_user INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL 
  )`
)

await db.execute(`
  CREATE TABLE IF NOT EXISTS Tasks (
    id_task INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_user INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    id_category INTEGER,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE,
    FOREIGN KEY (id_user) REFERENCES Users(id_user),
    FOREIGN KEY (id_category) REFERENCES Categories(id_category)
  )
`)

await db.execute(`
  CREATE TABLE IF NOT EXISTS Categories (
    id_category INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`)

await db.execute(`
  INSERT INTO Categories (name) VALUES 
  ('Trabajo'),
  ('Personal'),
  ('Estudios'),
  ('Compras')
`)
