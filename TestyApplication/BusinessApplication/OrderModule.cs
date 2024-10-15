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
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ScrollBar;

namespace BusinessApplication
{
    public partial class OrderModule : Form
    {
        OrdersForm _ordersForm;
        Order order;
        IMongoCollection<Order> orderCollection;
        public OrderModule(OrdersForm ordersForm, Order Order, IMongoCollection<Order> OrderCollection)
        {
            InitializeComponent();
            this._ordersForm = ordersForm;
            order = Order;
            orderCollection = OrderCollection;

            statusBox.SelectedIndexChanged += new EventHandler(OnTextChanged);
        }

        private void OnTextChanged(object sender, EventArgs e)
        {
            saveButton.Enabled = true;
            saveButton.Visible = true;

            cancelButton.Visible = true;
            cancelButton.Enabled = true;
        }

        private void exitButton_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }

        private void saveButton_Click(object sender, EventArgs e)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Id, order.Id);
            var update = Builders<Order>.Update
                .Set(o => o.Status, statusBox.SelectedItem.ToString());
            orderCollection.UpdateOne(filter, update);

            _ordersForm.OrderLoad();
            this.Dispose();
        }

        private void cancelButton_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }
    }
}
