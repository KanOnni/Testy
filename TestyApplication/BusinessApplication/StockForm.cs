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

namespace BusinessApplication
{
    public partial class StockForm : Form
    {
        IMongoCollection<Product> productCollection;
        private MongoDbContext _dataBase;
        private List<Product> criticalStockProducts = new List<Product>();
        private List<Product> stockProducts = new List<Product>();
        // Flag to prevent TextChanged event from firing programatically
        private bool isTextChangedDisabled = false;
        private bool isTextChanged2Disabled = false;
        // Flag to check if the searchBox text is the placeholder text or user input
        private bool isPlaceholderActive = true;
        private bool isPlaceholderActive2 = true;
        public StockForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }

        private void StockForm_Load(object sender, EventArgs e)
        {
            LoadProducts();
        }

        public void LoadProducts()
        {
            LoadStock();
            LoadCriticalStock();
        }

        public void LoadStock()
        {
            productCollection = _dataBase.GetCollection<Product>("products");
            stockDataGV.Rows.Clear();
            stockProducts.Clear();

            var products = productCollection.Find(_ => true).ToList();

            foreach (var product in products)
            {
                stockProducts.Add(product);
                stockDataGV.Rows.Add(
                    product.Id.ToString(),
                    product.Category,
                    product.Type,
                    product.Name,
                    product.Size,
                    product.Color,
                    product.Stock
                );
            }
        }

        public void LoadCriticalStock()
        {
            productCollection = _dataBase.GetCollection<Product>("products");
            stockDataGV2.Rows.Clear();
            criticalStockProducts.Clear();

            var filter = Builders<Product>.Filter.Lte(p => p.Stock, 10);
            var products = productCollection.Find(filter).ToList();

            foreach (var product in products)
            {
                if (product != null)
                {
                    criticalStockProducts.Add(product);
                    stockDataGV2.Rows.Add(
                        product.Id.ToString(),
                        product.Category,
                        product.Type,
                        product.Name,
                        product.Size,
                        product.Color,
                        product.Stock
                    );
                }
            }
        }

        private void FilterStockData(string searchQuery, DataGridView stockData, List<Product>Products)
        {
            stockData.Rows.Clear();

            // Change searchQuery to lower case
            string lcSearchQuery = searchQuery.ToLower(); 

            // Change product attributes to lower case before comparison with lcSearchQuery
            // This way the searchQuery casing doesn't matter for the search results
            var filteredProducts = Products.Where(product =>
                product.Id.ToString().ToLower().Contains(lcSearchQuery) ||
                product.Category.ToLower().Contains(lcSearchQuery) ||
                product.Type.ToLower().Contains(lcSearchQuery) ||
                product.Name.ToLower().Contains(lcSearchQuery) ||
                product.Size.ToLower().Contains(lcSearchQuery) ||
                product.Color.ToLower().Contains(lcSearchQuery) ||
                product.Stock.ToString().Contains(lcSearchQuery)
            ).ToList();

            foreach (var product in filteredProducts)
            {
                stockData.Rows.Add(
                    product.Id.ToString(),
                    product.Category,
                    product.Type,
                    product.Name,
                    product.Size,
                    product.Color,
                    product.Stock
                );
            }
        }

        private void stockDataGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                idLabel.Text = "ID: " + stockDataGV[0, e.RowIndex].Value.ToString();
                nameBox.Text = stockDataGV[3, e.RowIndex].Value.ToString();
                categoryBox.Text = stockDataGV[1, e.RowIndex].Value.ToString();
                typeBox.Text = stockDataGV[2, e.RowIndex].Value.ToString();
                colorBox.Text = stockDataGV[5, e.RowIndex].Value.ToString();
                sizeBox.Text = stockDataGV[4, e.RowIndex].Value.ToString();
                stockBox.Text = stockDataGV[6, e.RowIndex].Value.ToString();
            }
        }

        private void stockDataGV2_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            { 
                idLabel2.Text = "ID: " + stockDataGV2[0, e.RowIndex].Value.ToString();
                nameBox2.Text = stockDataGV2[3, e.RowIndex].Value.ToString();
                categoryBox2.Text = stockDataGV2[1, e.RowIndex].Value.ToString();
                typeBox2.Text = stockDataGV2[2, e.RowIndex].Value.ToString();
                colorBox2.Text = stockDataGV2[5, e.RowIndex].Value.ToString();
                sizeBox2.Text = stockDataGV2[4, e.RowIndex].Value.ToString();
                stockBox2.Text = stockDataGV2[6, e.RowIndex].Value.ToString();
            }
        }

        private void addButton_Click(object sender, EventArgs e)
        {
            if (stockDataGV.SelectedRows != null)
            {
                List<Product> Products = new List<Product>();

                foreach (DataGridViewRow selectedRow in stockDataGV.SelectedRows)
                {
                    string productId = selectedRow.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();

                    Products.Add(product);
                }

                using (AddStock addStock = new AddStock(Products, _dataBase))
                {
                    addStock.ShowDialog();
                    LoadStock();
                }
            }   
        }


        private void decreaseButton_Click(object sender, EventArgs e)
        {
            if (stockDataGV.SelectedRows != null)
            {
                List<Product> Products = new List<Product>();

                foreach (DataGridViewRow selectedRow in stockDataGV.SelectedRows)
                {
                    string productId = selectedRow.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();

                    Products.Add(product);
                }

                using (RemoveStock decreaseStock = new RemoveStock(Products, _dataBase))
                {
                    decreaseStock.ShowDialog();
                    LoadStock();
                }
            }
        }

        private void addButton2_Click(object sender, EventArgs e)
        {
            if (stockDataGV2.SelectedRows != null)
            {
                List<Product> Products = new List<Product>();

                foreach (DataGridViewRow selectedRow in stockDataGV2.SelectedRows)
                {
                    string productId = selectedRow.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();

                    Products.Add(product);
                }

                using (AddStock addStock = new AddStock(Products, _dataBase))
                {
                    addStock.ShowDialog();
                    LoadStock();
                }
            }
        }

        private void decreaseButton2_Click(object sender, EventArgs e)
        {
            if (stockDataGV2.SelectedRows != null)
            {
                List<Product> Products = new List<Product>();

                foreach (DataGridViewRow selectedRow in stockDataGV2.SelectedRows)
                {
                    string productId = selectedRow.Cells[0].Value.ToString();

                    var filter = Builders<Product>.Filter.Eq(p => p.Id, ObjectId.Parse(productId));
                    var product = productCollection.Find(filter).FirstOrDefault();

                    Products.Add(product);
                }

                using (RemoveStock decreaseStock = new RemoveStock(Products, _dataBase))
                {
                    decreaseStock.ShowDialog();
                    LoadStock();
                }
            }
        }

        private void updateButton_Click(object sender, EventArgs e)
        {
            LoadProducts();
        }

        private void searchBox_TextChanged(object sender, EventArgs e)
        {
            if (isTextChangedDisabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox.Text))
            {
                LoadStock();
            } 
            else
            {
                FilterStockData(searchBox.Text, stockDataGV, stockProducts);
            }
        }

        private void searchBox2_TextChanged(object sender, EventArgs e)
        {
            if (isTextChanged2Disabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox2.Text))
            {
                LoadCriticalStock();
            }
            else
            {
                FilterStockData(searchBox2.Text, stockDataGV2, criticalStockProducts);
            }
        }

        private void searchBox_Enter(object sender, EventArgs e)
        {
            if (isPlaceholderActive)
            {
                isTextChangedDisabled = true; // prevent TextChanged event
                searchBox.Text = string.Empty;
                searchBox.ForeColor = SystemColors.WindowText;
                isTextChangedDisabled = false; // re-enable TextChanged event
                isPlaceholderActive = false;
            }
        }

        private void searchBox_Leave(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(searchBox.Text))
            {
                isTextChangedDisabled = true; // prevent TextChanged event
                searchBox.Text = "Search";
                searchBox.ForeColor = SystemColors.GrayText;
                isTextChangedDisabled = false; // re-enable TextChanged event
                isPlaceholderActive = true;
            }
        }

        private void searchBox2_Enter(object sender, EventArgs e)
        {
            if (isPlaceholderActive2)
            {
                isTextChanged2Disabled = true;
                searchBox2.Text = string.Empty;
                searchBox2.ForeColor = SystemColors.WindowText;
                isTextChanged2Disabled = false;
                isPlaceholderActive = false;
            }
        }

        private void searchBox2_Leave(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(searchBox2.Text))
            {
                isTextChanged2Disabled = true;
                searchBox2.Text = "Search";
                searchBox2.ForeColor = SystemColors.GrayText;
                isTextChanged2Disabled = false;
                isPlaceholderActive = true;
            }
        }
    }
}
