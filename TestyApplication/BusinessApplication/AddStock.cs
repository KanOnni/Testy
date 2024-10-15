using Microsoft.Build.Tasks.Deployment.Bootstrapper;
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
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace BusinessApplication
{
    public partial class AddStock : Form
    {
        private List<Product> Products;
        private MongoDbContext _dataBase;
        IMongoCollection<Product> productCollection;
        public AddStock(List<Product> products, MongoDbContext dataBase)
        {
            InitializeComponent();
            Products = products;
            _dataBase = dataBase;
        }

        private void AddStock_Load(object sender, EventArgs e)
        {
            LoadSelectedProducts();
        }

        private void LoadSelectedProducts()
        {
            addStockDataGV.Rows.Clear();

            foreach (var product in Products)
            {
                productCollection = _dataBase.GetCollection<Product>("products");
                var filter = Builders<Product>.Filter.Eq(p => p.Id, product.Id);
                var Product = productCollection.Find(filter).FirstOrDefault();

                if (Product != null)
                {
                    addStockDataGV.Rows.Add(
                        product.Id.ToString(),
                        product.Name,
                        product.Size,
                        product.Color,
                        product.Stock
                    );
                }
            }
        }

        private void addButton_Click(object sender, EventArgs e)
        {
            if (addStockDataGV.SelectedRows == null)
            {
                MessageBox.Show("Please select a product.");
            }
            else if (string.IsNullOrEmpty(inputBox.Text))
            {
                MessageBox.Show("Please input an amount to increase by.");
            }
            else
            {
                int increase = int.Parse(inputBox.Text);

                foreach (DataGridViewRow row in addStockDataGV.SelectedRows)
                {
                    string productId = row.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();
                    var update = Builders<Product>.Update
                        .Set(p => p.Stock, product.Stock += int.Parse(inputBox.Text));

                    productCollection.UpdateOne(filter, update);
                }

                LoadSelectedProducts();
                MessageBox.Show($"Stock increased by: {increase}");
            }
        }

        private void cancelButton_Click(object sender, EventArgs e)
        {
            this.Dispose();
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
