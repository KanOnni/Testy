# Web-and-c-project

## Database

``` py

CREATE DATABASE testy;

USE testy;

CREATE TABLE Category (
  CategoryID INT PRIMARY KEY,
  CategoryName VARCHAR(20)
);

CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  CategoryID INT,
  Name VARCHAR(50),
  Type VARCHAR(50),
  Description TEXT,
  IMAGE BLOB,
  Price INT,
  Discount INT,
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
  Adress VARCHAR(50), 
  Password VARCHAR(50)
);

CREATE TABLE Workers ( 
  WorkerID INT PRIMARY KEY, 
  Name VARCHAR(50), 
  Hours INT, 
  Leaves INT
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY,
  UserID INT,
  Status VARCHAR(50),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
);

CREATE TABLE OrderItem (
  OrderItemID INT PRIMARY KEY,
  OrderID INT,
  ProductID INT, 
  Status VARCHAR(50),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

# index 
CREATE INDEX idx_Products_Name ON Products(Name);
CREATE INDEX idx_Products_Type ON Products(Type);
CREATE INDEX idx_Products_Color ON Products(Color);
CREATE INDEX idx_User_Username ON Users(Username);

# random data 
INSERT INTO Category (CategoryID, CategoryName)
VALUES
    (1, 'Men'),
    (2, 'Women'),
    (3, 'Children');

INSERT INTO Products (ProductID, CategoryID, Name, Type, Description, Price, Color, Size, Amount, Image)
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

INSERT INTO Workers (WorkerID, Name, Hours, Leaves)
VALUES
    (1, 'Joe', 100);

```
