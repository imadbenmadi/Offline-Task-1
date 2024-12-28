-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS NotesApp;

-- Use the database
USE NotesApp;

-- Create the Refresh tokens table
CREATE TABLE IF NOT EXISTS Refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create an event to delete old tokens
CREATE EVENT delete_old_tokens
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM Refresh_tokens WHERE createdAt < NOW() - INTERVAL 3 DAY;
