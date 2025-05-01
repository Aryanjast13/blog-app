-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blog;

-- Switch to using the blog database
USE blog;

-- Drop tables if they already exist (helpful for dev resets)
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Users;

-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts table
CREATE TABLE Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author INT NOT NULL,
    content TEXT,
    cover_image VARCHAR(2083), -- S3 URLs can be long
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author) REFERENCES Users(id) ON DELETE CASCADE
);
