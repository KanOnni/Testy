using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BusinessApplication
{
    public partial class RemoveStock : Form
    {
        private List<Product> Products;
        private MongoDbContext _dataBase;
        private IMongoCollection<Product> productCollection;
        public RemoveStock(List<Product> products, MongoDbContext dataBase)
        {
            InitializeComponent();
            Products = products;
            _dataBase = dataBase;
        }

        private void RemoveStock_Load(object sender, EventArgs e)
        {
            LoadSelectedProducts();
        }
        private void LoadSelectedProducts()
        {
            removeStockDataGV.Rows.Clear();

            foreach (var product in Products)
            {
                productCollection = _dataBase.GetCollection<Product>("products");
                var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);
                var Product = productCollection.Find(filter).FirstOrDefault();

                if (Product != null)
                {
                    removeStockDataGV.Rows.Add(
                        product.Id.ToString(),
                        product.Name,
                        product.Size,
                        product.Color,
                        product.Stock
                    );
                }
            }
        }

        private void removeButton_Click(object sender, EventArgs e)
        {
            if (removeStockDataGV.SelectedRows == null)
            {
                MessageBox.Show("Please select a product.");
            }
            else if (string.IsNullOrEmpty(inputBox.Text))
            {
                MessageBox.Show("Please input an amount to decrease by.");
            }
            else
            {
                int decrease = int.Parse(inputBox.Text);

                foreach (DataGridViewRow row in removeStockDataGV.SelectedRows)
                {
                    string productId = row.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();
                    var update = Builders<Product>.Update
                        .Set(p => p.Stock, product.Stock -= int.Parse(inputBox.Text));

                    productCollection.UpdateOne(filter, update);
                }

                LoadSelectedProducts();
                MessageBox.Show($"Stock decreased by: {decrease}");
            }
        }

        private void cancelButton_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }

        private void inputBox_KeyPress1(object sender, KeyPressEventArgs e)
        {
            // Check if the entered character is not a digit and not the backspace key
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)Keys.Back)
            {
                // If it's not, cancel the event
                e.Handled = true;
            }
        }

        private void inputBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Check if the entered character is not a digit and not the backspace key
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)Keys.Back)
            {
                // If it's not, cancel the event
                e.Handled = true;
            }
        }
    }
}
