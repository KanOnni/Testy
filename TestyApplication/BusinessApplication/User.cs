using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessApplication
{
    public class User
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("username"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string Email { get; set; }

        [BsonElement("password"), BsonRepresentation(BsonType.String)]
        public string Password { get; set; }
    }
}
