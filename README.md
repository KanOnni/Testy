# Web-and-c-project

## Database

``` py

CREATE DATABASE testy;

USE testy;

CREATE TABLE Category (
  CategoryID INT PRIMARY KEY,
  CategoryName VARCHAR(20)
);

CREATE TABLE Clothing (
  ClothingID INT PRIMARY KEY,
  CategoryID INT,
  Name VARCHAR(50),
  Type VARCHAR(50),
  Description TEXT,
  IMAGE BLOB,
  Price INT,
  Color VARCHAR(50),
  Size VARCHAR(10),
  Amount INT, 
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE Admins ( 
  AdminID INT PRIMARY KEY, 
  Name VARCHAR(50), 
  Password VARCHAR(50)
);

CREATE TABLE Users ( 
  UserID INT PRIMARY KEY, 
  Username VARCHAR(50), 
  Password VARCHAR(50)
);

# index 
CREATE INDEX idx_Clothing_Name ON Clothing(Name);
# CREATE INDEX idx_Clothing_Name ON Clothing(Name);
# CREATE INDEX idx_ChildrensClothing_Name ON ChildrensClothing(Name);


# random data 
INSERT INTO Category (CategoryID, CategoryName)
VALUES
    (1, 'Men'),
    (2, 'Women'),
    (3, 'Children');

INSERT INTO Clothing (ClothingID, CategoryID, Name, Type, Description, Price, Color, Size, Amount, Image)
VALUES
    (1, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'S', 40, LOAD_FILE('c:\T-Shirt.png')),
    (2, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'M', 800, LOAD_FILE('c:\T-Shirt.png')),
    (3, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'L', 40, LOAD_FILE('c:\T-Shirt.png')),
    (4, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'White', 'S', 50, LOAD_FILE('c:\T-Shirt.png')),
    (5, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'White', 'M', 100, LOAD_FILE('c:\T-Shirt.png')),
    (6, 1, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'White', 'L', 50, LOAD_FILE('c:\T-Shirt.png')),
    (7, 2, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'S', 60, LOAD_FILE('c:\T-Shirt.png')),
    (8, 2, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'M', 100, LOAD_FILE('c:\T-Shirt.png')),
    (9, 2, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', 'L', 40, LOAD_FILE('c:\T-Shirt.png')),
    (10, 3, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', '80 cm', 50, LOAD_FILE('c:\T-Shirt.png')),
    (11, 3, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', '100 cm', 100, LOAD_FILE('c:\T-Shirt.png')),
    (12, 3, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', '120 cm', 50, LOAD_FILE('c:\T-Shirt.png')),
    (13, 3, 'T-shirt', 'Shirt', 'Lorem Ipsum', 200, 'Wine red', '140 cm', 50, LOAD_FILE('c:\T-Shirt.png'));

INSERT INTO Admins (AdminID, Name, Password)
VALUES
    (1, 'Admin', 'Admin');

```
