using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using System.Windows.Forms;

namespace BusinessApplication
{
    public class MongoDbContext
    {
        private IMongoDatabase _database;

        // Constructor to initialize the MongoDB connection using connectionString from App.config
        public MongoDbContext(string databaseName) {
            
            string connectionString = ConfigurationManager.ConnectionStrings["DBconnection"].ConnectionString;
            //Environment.GetEnvironmentVariable("REGISTRATION_KEY");
            //MessageBox.Show(connectionString);

            var settings = MongoClientSettings.FromConnectionString(connectionString);
            // Set the ServerApi field of the settings object to set the version of the Stable API on the client
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            // Create a new client and connect to the server
            var client = new MongoClient(settings);

            _database = client.GetDatabase(databaseName);
        }

        // Generic method to get a MongoDB collection of any type
        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }
    }
}
