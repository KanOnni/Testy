# Testy Applictaion

Testy Application is a business application created for a clothing store. With the app the user can manage products, orders, sales and users of the app.

## Database Structure

To use the app you need a MongoDB database with collections and datatypes like so: 

### Admins

```plaintext
admins:
    _id    ObjectID
    name    string
    password    string
```

### Workers

```plaintext
workers:
    _id ObjectID
    username    string
    email    string
    password    string
```

### Products

 ```plaintext   
products:
    _id    ObjectID
    category    string
    type    string
    name    string
    size    string
    color    string
    price    decimal128
    discount    int32
    amount    int32
    description    string
    image    binary
```

### Orders

```plaintext
orders:
    _id    ObjectID
    userID    ObjectID
    address    string
    date    date
    status    string
```

### OrderItems

```plaintext
orderitems:
    Id    ObjectID
    orderId    ObjectID
    productId    ObjectID
    price    decimal128
    discount    int32
    amount    int32
```

## Configuration Files

To use the app you also need to create 2 config files for storing the database connection string and registration key(for creating accounts) respectively. 
The files should look like this:

### File for the connection string:

```xml
<connectionStrings>
	<add name="DBconnection"
	connectionString="your-connetion-string"/>
</connectionStrings>
```

### File for the registration key:

```xml
<appSettings>
	<add key="RegistrationKey" value="registration-key"/>
</appSettings>
```
Make sure the .config files are in the same directory as the App.config file. Also change the "Copy to Output Directory" value of the config files to "Copy Always" or "Copy if newer" from the properties window.

Finally, edit the App.config to look like this:
```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
	<appSettings configSource="Key.config"/>
	<connectionStrings configSource="Connection.config"/>
    <startup> 
        <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.7.2" />
    </startup>
</configuration>
```
Change the Key.config and Connection.config to the names of your config files.
