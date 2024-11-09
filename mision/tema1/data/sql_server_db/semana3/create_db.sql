-- Create a new database called 'semana3'
-- Connect to the 'master' database to run this snippet
-- Create the new database if it does not exist already
IF NOT EXISTS (
  SELECT [name]
    FROM sys.databases
    WHERE [name] = N'semana3'
)
CREATE DATABASE semana3
GO
CREATE TABLE [dbo].[product]
(
  [product_id] INT NOT NULL PRIMARY KEY,
  [product_name] VARCHAR(50),
  [product_price] MONEY 
)
