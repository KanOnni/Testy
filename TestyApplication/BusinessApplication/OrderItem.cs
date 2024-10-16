    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace BusinessApplication
    {
        public class OrderItem
        {
            [BsonId, BsonElement("Id"), BsonRepresentation(BsonType.ObjectId)]
            public ObjectId Id { get; set; }

            [BsonElement("orderId"), BsonRepresentation(BsonType.ObjectId)]
            public ObjectId OrderId { get; set; }

            [BsonElement("productId"), BsonRepresentation(BsonType.ObjectId)]
            public ObjectId ProductId { get; set; }

            [BsonElement("price"), BsonRepresentation(BsonType.Decimal128)]
            public decimal Price { get; set; }

            [BsonElement("discount"), BsonRepresentation(BsonType.Int32)]
            public int Discount { get; set; }

            [BsonElement("amount"), BsonRepresentation(BsonType.Int32)]
            public int Amount { get; set; }
        }
    }
