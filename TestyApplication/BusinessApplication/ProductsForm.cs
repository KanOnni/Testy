using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MongoDB.Bson;

namespace BusinessApplication
{
    public partial class ProductsForm : Form
    {
        IMongoCollection<Product> productCollection;
        private MongoDbContext _dataBase;
        public ProductsForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }
        private void ProductsForm_Load(object sender, EventArgs e)
        {
            LoadProducts();
        }


        public void LoadProducts()
        {
            productCollection = _dataBase.GetCollection<Product>("products");
            productDataGV.Rows.Clear();

            var products = productCollection.Find(_ => true).ToList();

            foreach (var product in products)
            {
                if (product != null)
                {
                    productDataGV.Rows.Add(
                        product.Id.ToString(),
                        product.Category,
                        product.Type,
                        product.Name,
                        product.Size,
                        product.Color,
                        product.Price,
                        product.Discount.ToString() + "%",
                        product.Stock
                    );
                }
            }
        }

        private void addButton_Click(object sender, EventArgs e)
        {
            ProductModule productModule = new ProductModule(this, productCollection);
            productModule.idLabel.Text = null;
            //productModule.idLabel.Visible = false;
            productModule.ShowDialog();
        }

        private void productDataGridView_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            string column = productDataGV.Columns[e.ColumnIndex].Name;
            if (column == "Delete")
            {
                string pID = productDataGV[0, e.RowIndex].Value.ToString();
                string pName = productDataGV[3, e.RowIndex].Value.ToString();

                if(MessageBox.Show($"Are you sure you want to delete this product?\n PID: {pID}\n Name: {pName}", "Delete",MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                {
                    try
                    {
                        var filter = Builders<Product>.Filter.Eq(c => c.Id, ObjectId.Parse(productDataGV[0, e.RowIndex].Value.ToString()));
                        productCollection.DeleteOne(filter);
                        LoadProducts();
                        MessageBox.Show($"Product successfully deleted \n PID: {pID}\n Name: {pName}");
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.ToString());
                    }
                    
                }
            }
            else if (column == "Edit")
            {
                var filter = Builders<Product>.Filter.Eq(c => c.Id, ObjectId.Parse(productDataGV[0, e.RowIndex].Value.ToString()));
                var product = productCollection.Find(filter).FirstOrDefault();

                ProductModule productModule = new ProductModule(this, product, productCollection);

                productModule.ShowDialog(this);
            }
        }

        private void updateButton_Click(object sender, EventArgs e)
        {
            LoadProducts();
        }
    }
}
