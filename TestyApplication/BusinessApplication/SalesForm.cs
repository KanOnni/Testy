using MongoDB.Driver;
using Mysqlx.Crud;
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
    public partial class SalesForm : Form
    {
        IMongoCollection<Order> orderCollection;
        IMongoCollection<OrderItem> orderItemCollection;
        IMongoCollection<Product> productCollection;
        private MongoDbContext _dataBase;

        List<string[]> salesArray = new List<string[]>();

        private bool isDateChanged = false;
        // Flags for searchbar
        private bool isTextChangedDisabled = false;
        private bool isPlaceholderActive = true;
        public SalesForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }

        private void Sales_Load(object sender, EventArgs e)
        {
            LoadSales();
        }

        private void LoadSales()
        {
            orderCollection = _dataBase.GetCollection<Order>("orders");
            orderItemCollection = _dataBase.GetCollection<OrderItem>("orderitems");
            productCollection = _dataBase.GetCollection<Product>("products");

            var products = productCollection.Find(_ => true).ToList();

            if (!isDateChanged) // If the user hasn't changed the date, set dateTo to the earliest order and dateFrom to the current date
            {
                var orders = orderCollection.Find(_ => true).ToList();

                dateFromPicker.Value = orders.Min(o => o.Date); // Earliest date from the orders
                dateToPicker.Value = DateTime.Now;
            }

            salesArray.Clear();
            salesDataGV.Rows.Clear();

            decimal TotalRevenue = 0;

            foreach (var product in products) 
            {


                var orderItemFilter = Builders<OrderItem>.Filter.Eq(o => o.ProductId, product.Id);
                var orderItems = orderItemCollection.Find(orderItemFilter).ToList();                

                decimal revenue = 0;
                int productsSold = 0;

                foreach (var orderItem in orderItems) 
                {
                    var orderFilter = Builders<Order>.Filter.Eq(o => o.Id, orderItem.OrderId);
                    var order = orderCollection.Find(orderFilter).FirstOrDefault();

                    // Check if the order is in the range of dateFrom => dateTo. 
                    // dateFromPicker.Value.Date = the date at time 00:00:00
                    // dateToPicker.Value.Date.AddDays(1).AddTicks(-1) = the date +1 day -1 tick so it's the date at time 23:59:99999
                    if (order.Date.Date >= dateFromPicker.Value.Date &&  order.Date <= dateToPicker.Value.Date.AddDays(1).AddTicks(-1))
                    {
                        revenue += (orderItem.Price - orderItem.Price * ((decimal)orderItem.Discount / 100));
                        productsSold += orderItem.Amount;
                    }

                }

                TotalRevenue += revenue;

                string[] salesDetails = new string[]
                {
                    product.Id.ToString(),
                    product.Category,
                    product.Type,
                    product.Name,
                    product.Size,
                    product.Color,
                    productsSold.ToString(),
                    revenue.ToString() + "€"
                };

                salesDataGV.Rows.Add(
                    product.Id.ToString(),
                    product.Category,
                    product.Type,
                    product.Name,
                    product.Size,
                    product.Color,
                    productsSold,
                    revenue.ToString() + "€"
                );
            }

            revenueLabel.Text = TotalRevenue.ToString();
        }

        private void FilterSales(string searchQuery, DataGridView salesData, List<string[]> salesList)
        {
            // Clear the DataGridView before applying the new filter
            salesData.Rows.Clear();

            // Convert the search query to lower case for case-insensitive search
            string lcSearchQuery = searchQuery.ToLower();

            // Filter the sales list based on the search query
            var filteredSales = salesList.Where(sale =>
                sale[0].ToLower().Contains(lcSearchQuery) || // Product ID
                sale[1].ToLower().Contains(lcSearchQuery) || // Category
                sale[2].ToLower().Contains(lcSearchQuery) || // Type
                sale[3].ToLower().Contains(lcSearchQuery) || // Name
                sale[4].ToLower().Contains(lcSearchQuery) || // Size
                sale[5].ToLower().Contains(lcSearchQuery) || // Color
                sale[6].Contains(lcSearchQuery) ||           // Products Sold
                sale[7].ToLower().Contains(lcSearchQuery)    // Revenue
            ).ToList();

            // Add filtered sales data to the DataGridView
            foreach (var sale in filteredSales)
            {
                salesData.Rows.Add(sale);
            }
        }



        private void dateFromPicker_ValueChanged(object sender, EventArgs e)
        {
            isDateChanged = true;
            LoadSales();
        }

        private void dateToPicker_ValueChanged(object sender, EventArgs e)
        {
            isDateChanged = true;
            LoadSales();
        }

        private void reloadButton_Click(object sender, EventArgs e)
        {
            LoadSales();
        }

        private void searchBox_TextChanged(object sender, EventArgs e)
        {
            if (isTextChangedDisabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox.Text))
            {
                LoadSales();
            }
            else
            {
                FilterSales(searchBox.Text, salesDataGV, salesArray);
            }
        }

        private void searchBox_Enter(object sender, EventArgs e)
        {
            if (isPlaceholderActive)
            {
                isTextChangedDisabled = true;
                searchBox.Text = string.Empty;
                searchBox.ForeColor = SystemColors.WindowText;
                isTextChangedDisabled = false;
                isPlaceholderActive = false;
            }
        }

        private void searchBox_Leave(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(searchBox.Text))
            {
                isTextChangedDisabled = true;
                searchBox.Text = "Search";
                searchBox.ForeColor = SystemColors.GrayText;
                isTextChangedDisabled = false;
                isPlaceholderActive = true;
            }
        }
    }
}
