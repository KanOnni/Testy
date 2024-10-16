using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Mysqlx.Crud;
using Microsoft.Build.Tasks.Deployment.Bootstrapper;


namespace BusinessApplication
{
    public partial class OrdersForm : Form
    {
        IMongoCollection<Order> orderCollection;
        IMongoCollection<OrderItem> orderItemCollection;
        IMongoCollection<User> userCollection;
        IMongoCollection<Product> productCollection;
        private MongoDbContext _dataBase;
        List<string[]> orderArray = new List<string[]>();
        List<string[]> cancelledOrderArray = new List<string[]>();
        List<string[]> deliveredOrderArray = new List<string[]>();
        // Flag to prevent TextChanged event from firing programatically
        private bool isTextChangedDisabled = false;
        private bool isTextChanged2Disabled = false;
        private bool isTextChanged3Disabled = false;
        // Flag to check if the searchBox text is the placeholder text or user input
        private bool isPlaceholderActive = true;
        private bool isPlaceholder2Active = true;
        private bool isPlaceholder3Active = true;
        public OrdersForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }
        private void OrdersForm_Load(object sender, EventArgs e)
        {
            OrderLoad();
        }

        public void OrderLoad()
        {
            LoadOrders();
            LoadCancelledOrders();
            LoadDeliveredOrders();
        }

        private void LoadOrders()
        {
            orderCollection = _dataBase.GetCollection<Order>("orders");
            orderItemCollection = _dataBase.GetCollection<OrderItem>("orderitems");
            userCollection = _dataBase.GetCollection<User>("users");

            var orders = orderCollection.Find(_ => true).ToList();

            orderArray.Clear();
            orderDataGV.Rows.Clear();

            foreach (var order in orders)
            {
                var filter = Builders<User>.Filter.Eq(u => u.Id, order.UserId);
                var user = userCollection.Find(filter).FirstOrDefault();

                var filter2 = Builders<OrderItem>.Filter.Eq(o => o.OrderId, order.Id);
                var orderItems = orderItemCollection.Find(filter2).ToList();

                decimal total = 0;

                foreach (var orderItem in orderItems)
                {
                    total += (orderItem.Price -  orderItem.Price * ((decimal)orderItem.Discount / 100));
                }

                string[] orderDetails = new string[]
                {
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                };

                orderArray.Add(orderDetails);

                orderDataGV.Rows.Add(
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                );
            }
        }

        private void LoadCancelledOrders()
        {
            orderCollection = _dataBase.GetCollection<Order>("orders");
            orderItemCollection = _dataBase.GetCollection<OrderItem>("orderitems");
            userCollection = _dataBase.GetCollection<User>("users");

            var orderFilter = Builders<Order>.Filter.Eq(o => o.Status, "Cancelled");
            var orders = orderCollection.Find(orderFilter).ToList();

            cancelledOrderArray.Clear();
            orderDataGV2.Rows.Clear();

            foreach (var order in orders)
            {
                var filter = Builders<User>.Filter.Eq(u => u.Id, order.UserId);
                var user = userCollection.Find(filter).FirstOrDefault();

                var filter2 = Builders<OrderItem>.Filter.Eq(o => o.OrderId, order.Id);
                var orderItems = orderItemCollection.Find(filter2).ToList();

                decimal total = 0;

                foreach (var orderItem in orderItems)
                {
                    total += (orderItem.Price - orderItem.Price * ((decimal)orderItem.Discount / 100));
                }

                string[] orderDetails = new string[]
                {
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                };

                cancelledOrderArray.Add(orderDetails);

                orderDataGV2.Rows.Add(
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                );
            }
        }

        private void LoadDeliveredOrders()
        {
            orderCollection = _dataBase.GetCollection<Order>("orders");
            orderItemCollection = _dataBase.GetCollection<OrderItem>("orderitems");
            userCollection = _dataBase.GetCollection<User>("users");

            var orderFilter = Builders<Order>.Filter.Eq(o => o.Status, "Arrived");
            var orders = orderCollection.Find(orderFilter).ToList();

            deliveredOrderArray.Clear();
            orderDataGV3.Rows.Clear();

            foreach (var order in orders)
            {
                var filter = Builders<User>.Filter.Eq(u => u.Id, order.UserId);
                var user = userCollection.Find(filter).FirstOrDefault();

                var filter2 = Builders<OrderItem>.Filter.Eq(o => o.OrderId, order.Id);
                var orderItems = orderItemCollection.Find(filter2).ToList();

                decimal total = 0;

                foreach (var orderItem in orderItems)
                {
                    total += (orderItem.Price - orderItem.Price * ((decimal)orderItem.Discount / 100));
                }

                string[] orderDetails = new string[]
                {
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                };

                deliveredOrderArray.Add(orderDetails);

                orderDataGV3.Rows.Add(
                    order.Id.ToString(),
                    user.Name,
                    order.Address,
                    orderItems.Count.ToString(),
                    total.ToString() + "€",
                    order.Date.ToString(),
                    order.Status
                );
            }
        }

        private void FilterOrderData(string searchQuery, DataGridView orderData, List<string[]>orderList)
        {
            orderData.Rows.Clear();

            string lcSearchQuery = searchQuery.ToLower();

            var filteredOrders = orderList.Where(order =>
                order[0].ToLower().Contains(lcSearchQuery) || // Order ID
                order[1].ToLower().Contains(lcSearchQuery) || // Username
                order[2].ToLower().Contains(lcSearchQuery) || // Address
                order[3].Contains(lcSearchQuery) || // Amount of items
                order[4].ToLower().Contains(lcSearchQuery) || // Total amount
                order[5].ToLower().Contains(lcSearchQuery) || // Date
                order[6].ToLower().Contains(lcSearchQuery) // Status
            ).ToList();

            foreach (var order in filteredOrders)
            {
                orderDataGV.Rows.Add(order);
            }
        }

        private void orderDataGV3_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int column = e.ColumnIndex;
            if (column == 7) // The View button (last column)
            {
                string orderID = orderDataGV3[0, e.RowIndex].Value.ToString();

                openOrderModule(orderID);
            }

            if (e.RowIndex >= 0)
            { 
                noLabel3.Text = noLabel3.Text + orderDataGV3[0, e.RowIndex].Value.ToString();
                nameBox3.Text = orderDataGV3[1, e.RowIndex].Value.ToString();
                addressBox3.Text = orderDataGV3[2, e.RowIndex].Value.ToString();
                quantityBox3.Text = orderDataGV3[3, e.RowIndex].Value.ToString();
                totalBox3.Text = orderDataGV3[4, e.RowIndex].Value.ToString();
                dateBox3.Text = orderDataGV3[5, e.RowIndex].Value.ToString();
                statusBox3.Text = orderDataGV3[6, e.RowIndex].Value.ToString();
            }
        }

        private void orderDataGV2_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int column = e.ColumnIndex;
            if (column == 7) // The View button (last column)
            {
                string orderID = orderDataGV2[0, e.RowIndex].Value.ToString();

                openOrderModule(orderID);
            }

            if (e.RowIndex >= 0)
            { 
                noLabel2.Text = noLabel2.Text + orderDataGV2[0, e.RowIndex].Value.ToString();
                nameBox2.Text = orderDataGV2[1, e.RowIndex].Value.ToString();
                addressBox2.Text = orderDataGV2[2, e.RowIndex].Value.ToString();
                quantityBox2.Text = orderDataGV2[3, e.RowIndex].Value.ToString();
                totalBox2.Text = orderDataGV2[4, e.RowIndex].Value.ToString();
                dateBox2.Text = orderDataGV2[5, e.RowIndex].Value.ToString();
                statusBox2.Text = orderDataGV2[6, e.RowIndex].Value.ToString();
            }
        }

        private void orderDataGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int column = e.ColumnIndex;
            if (column == 7) // The View button (last column)
            {
                string orderID = orderDataGV[0, e.RowIndex].Value.ToString();

                openOrderModule(orderID);
            }
            if (e.RowIndex >= 0)
            {
                noLabel.Text = noLabel.Text + orderDataGV[0, e.RowIndex].Value.ToString();
                nameBox.Text = orderDataGV[1, e.RowIndex].Value.ToString();
                addressBox.Text = orderDataGV[2, e.RowIndex].Value.ToString();
                quantityBox.Text = orderDataGV[3, e.RowIndex].Value.ToString();
                totalBox.Text = orderDataGV[4, e.RowIndex].Value.ToString();
                dateBox.Text = orderDataGV[5, e.RowIndex].Value.ToString();
                statusBox.Text = orderDataGV[6, e.RowIndex].Value.ToString();
            }
            
        }

        private void openOrderModule(string orderID)
        {
            orderCollection = _dataBase.GetCollection<Order>("orders");
            var filter = Builders<Order>.Filter.Eq(c => c.Id, ObjectId.Parse(orderID));
            var order = orderCollection.Find(filter).FirstOrDefault();


            orderItemCollection = _dataBase.GetCollection<OrderItem>("orderitems");
            var filter2 = Builders<OrderItem>.Filter.Eq(c => c.OrderId, order.Id);
            var orderItems = orderItemCollection.Find(filter2).ToList();

            userCollection = _dataBase.GetCollection<User>("users");
            var filter3 = Builders<User>.Filter.Eq(u => u.Id, order.UserId);
            var user = userCollection.Find(filter3).FirstOrDefault();

            productCollection = _dataBase.GetCollection<Product>("products");


            OrderModule orderModule = new OrderModule(this, order, orderCollection);

            decimal total = 0;

            foreach (var orderItem in orderItems)
            {
                total += (orderItem.Price - orderItem.Price * ((decimal)orderItem.Discount / 100));

                var filter4 = Builders<Product>.Filter.Eq(p => p.Id, orderItem.ProductId);
                Product product = productCollection.Find(filter4).FirstOrDefault();

                orderModule.productDataGV.Rows.Add(
                    product.Id.ToString(),
                    product.Name,
                    product.Size,
                    product.Color,
                    orderItem.Amount,
                    orderItem.Price.ToString() + "€",
                    orderItem.Discount.ToString() + "%"
                );
            }

            orderModule.orderNoBox.Text = order.Id.ToString();
            orderModule.nameBox.Text = user.Name;
            orderModule.addressBox.Text = order.Address;
            orderModule.priceBox.Text = total.ToString() + "€";
            orderModule.dateBox.Text = order.Date.ToString();
            orderModule.statusBox.SelectedItem = order.Status;

            orderModule.saveButton.Enabled = false;
            orderModule.saveButton.Visible = false;

            orderModule.cancelButton.Visible = false;
            orderModule.cancelButton.Enabled = false;

            orderModule.ShowDialog(this);
        }

        private void searchBox_TextChanged(object sender, EventArgs e)
        {
            if (isTextChangedDisabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox.Text))
            {
                LoadOrders();
            }
            else
            {
                FilterOrderData(searchBox.Text, orderDataGV, orderArray);
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

        private void searchBox2_Enter(object sender, EventArgs e)
        {
            if (isPlaceholder2Active)
            {
                isTextChanged2Disabled = true;
                searchBox2.Text = string.Empty;
                searchBox2.ForeColor = SystemColors.WindowText;
                isTextChanged2Disabled = false;
                isPlaceholder2Active = false;
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
                isPlaceholder2Active = true;
            }
        }

        private void searchBox3_Enter(object sender, EventArgs e)
        {
            if (isPlaceholder3Active)
            {
                isTextChanged3Disabled = true;
                searchBox3.Text = string.Empty;
                searchBox3.ForeColor = SystemColors.WindowText;
                isTextChanged3Disabled = false;
                isPlaceholder3Active = false;
            }
        }

        private void searchBox3_Leave(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(searchBox3.Text))
            {
                isTextChanged3Disabled = true;
                searchBox3.Text = "Search";
                searchBox3.ForeColor = SystemColors.GrayText;
                isTextChanged3Disabled = false;
                isPlaceholder3Active = true;
            }
        }

        private void searchBox2_TextChanged(object sender, EventArgs e)
        {
            if (isTextChanged2Disabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox2.Text))
            {
                LoadOrders();
            }
            else
            {
                FilterOrderData(searchBox2.Text, orderDataGV2, cancelledOrderArray);
            }
        }

        private void searchBox3_TextChanged(object sender, EventArgs e)
        {
            if (isTextChanged3Disabled)
                return;

            if (string.IsNullOrWhiteSpace(searchBox3.Text))
            {
                LoadOrders();
            }
            else
            {
                FilterOrderData(searchBox3.Text, orderDataGV3, deliveredOrderArray);
            }
        }

        private void updateButton_Click(object sender, EventArgs e)
        {
            OrderLoad();
        }
    }
}
