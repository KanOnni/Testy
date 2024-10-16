using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BusinessApplication
{
    public class Product
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("category"), BsonRepresentation(BsonType.String)]
        public string Category { get; set; }

        [BsonElement("type"), BsonRepresentation(BsonType.String)]
        public string Type { get; set; }

        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("size"), BsonRepresentation(BsonType.String)]
        public string Size { get; set; }

        [BsonElement("color"), BsonRepresentation(BsonType.String)]
        public string Color { get; set; }

        [BsonElement("price"), BsonRepresentation(BsonType.Decimal128)]
        public decimal Price { get; set; }

        [BsonElement("discount"), BsonRepresentation(BsonType.Int32)]
        public int Discount { get; set; }

        [BsonElement("amount"), BsonRepresentation(BsonType.Int32)]
        public int Stock { get; set; }

        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; }

        [BsonElement("image"), BsonRepresentation(BsonType.Binary)]
        public byte[] Image { get; set; }
    }
}
