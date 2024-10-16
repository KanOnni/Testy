using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Configuration;
using System.Runtime.CompilerServices;

namespace BusinessApplication
{
    public partial class MainForm : Form
    {
        private MongoDbContext _dataBase;
        // Constructor if user is an Admin
        public MainForm(Admin admin)
        {
            InitializeComponent();
            _dataBase = new MongoDbContext("testy");
            nameLabel.Text += admin.Name;
            roleLabel.Text += "Admin";
            usersButton.Visible = true;
            usersButton.Enabled = true;
            openChildForm(new ProductsForm(_dataBase));
        }

        // Constructor if user is an Employee
        public MainForm(User user)
        {
            InitializeComponent();
            _dataBase = new MongoDbContext("testy");
            nameLabel.Text += user.Name;
            roleLabel.Text += "Employee";
            usersButton.Visible = false;
            usersButton.Enabled = false;
            openChildForm(new ProductsForm(_dataBase));
        }

        private Form activeForm = null;
        public void openChildForm(Form childForm)
        {
            if (activeForm != null)
            {
                activeForm.Close();
            }
            activeForm = childForm;
            childForm.TopLevel = false;
            childForm.FormBorderStyle = FormBorderStyle.None;
            childForm.Dock = DockStyle.Fill;
            titleLabel.Text = childForm.Text;
            panelMain.Controls.Add(childForm);
            panelMain.Tag = childForm;
            childForm.BringToFront();
            childForm.Show();
        }

        private void logoutButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void productButton_Click(object sender, EventArgs e)
        {
            openChildForm(new ProductsForm(_dataBase));
        }

        private void stockButton_Click(object sender, EventArgs e)
        {
            openChildForm(new StockForm(_dataBase));
        }

        private void ordersButton_Click(object sender, EventArgs e)
        {
            openChildForm(new OrdersForm(_dataBase));
        }

        private void salesButton_Click(object sender, EventArgs e)
        {
            openChildForm(new SalesForm(_dataBase));
        }
        private void usersButton_Click(object sender, EventArgs e)
        {
            openChildForm(new UsersForm(_dataBase));
        }
    }
}
