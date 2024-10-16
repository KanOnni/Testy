using Microsoft.Build.Tasks.Deployment.Bootstrapper;
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
using MongoDB.Bson;
using System.IO;

namespace BusinessApplication
{
    public partial class ProductModule : Form
    {
        private bool _isEditMode;
        private bool isLoadingData;
        IMongoCollection<Product> productCollection;
        ProductsForm _productForm;
        Product product;

        // Constructor for Add mode
        public ProductModule(ProductsForm productForm, IMongoCollection<Product> ProductCollection)
        {
            InitializeComponent();
            this._productForm = productForm;
            productCollection = ProductCollection;
            _isEditMode = false;

            saveButton.Enabled = true;
            saveButton.Visible = true;
        }

        // Constructor for Edit mode
        public ProductModule(ProductsForm productForm, Product Product, IMongoCollection<Product> ProductCollection)
        {
            InitializeComponent();
            this._productForm = productForm;
            productCollection = ProductCollection;
            product = Product;
            _isEditMode = true;

            isLoadingData = true;
            LoadProductData();
            isLoadingData = false;

            saveButton.Enabled = false;
            saveButton.Visible = false;

            AttachTextChangedEvents();
        }

        private void LoadProductData()
        {
            isLoadingData = true;

            if (product != null)
            {
                categoryBox.SelectedItem = product.Category;
                typeBox.SelectedItem = product.Type;
                nameTextBox.Text = product.Name;
                sizeBox.SelectedItem = product.Size;
                colorBox.Text = product.Color;
                priceTextBox.Text = product.Price.ToString();
                discountTextBox.Text = product.Discount.ToString();
                stockTextBox.Text = product.Stock.ToString();
                descriptionTextBox.Text = product.Description;
                idLabel.Text = "ID: " + product.Id.ToString();
                productPictureBox.Image = ByteArrayToImage(product.Image);
            }

            isLoadingData = false;
        }


        // Attach TextChanged event to all the input fields to detect changes
        private void AttachTextChangedEvents()
        {
            nameTextBox.TextChanged += new EventHandler(OnTextChanged);
            categoryBox.SelectedIndexChanged += new EventHandler(OnTextChanged);
            typeBox.SelectedIndexChanged += new EventHandler(OnTextChanged);
            sizeBox.SelectedIndexChanged += new EventHandler(OnTextChanged);
            colorBox.TextChanged += new EventHandler(OnTextChanged);
            priceTextBox.TextChanged += new EventHandler(OnTextChanged);
            discountTextBox.TextChanged += new EventHandler(OnTextChanged);
            stockTextBox.TextChanged += new EventHandler(OnTextChanged);
            descriptionTextBox.TextChanged += new EventHandler(OnTextChanged);
        }

        // Event handler to enable save button when any input changes
        private void OnTextChanged(object sender, EventArgs e)
        {
            if (_isEditMode)
            {
                saveButton.Enabled = true;
                saveButton.Visible = true;
            }
        }

        private void exitButton_Click(object sender, EventArgs e)
        {

            this.Dispose();
        }

        private void cancelButton_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }

        private void saveButton_Click(object sender, EventArgs e)
        {
            if (_isEditMode)
            {
                var filter = Builders<Product>.Filter.Eq(c => c.Id, product.Id);
                var update = Builders<Product>.Update
                    .Set(c => c.Category, categoryBox.SelectedItem.ToString())
                    .Set(c => c.Type, typeBox.SelectedItem.ToString())
                    .Set(c => c.Name, nameTextBox.Text)
                    .Set(c => c.Size, sizeBox.SelectedItem.ToString())
                    .Set(c => c.Color, colorBox.Text)
                    .Set(c => c.Price, decimal.Parse(priceTextBox.Text))
                    .Set(c => c.Discount, int.Parse(discountTextBox.Text))
                    .Set(c => c.Stock, int.Parse(stockTextBox.Text))
                    .Set(c => c.Description, descriptionTextBox.Text)
                    .Set(c => c.Image, ImageToByteArray(productPictureBox.Image));

                productCollection.UpdateOne(filter, update);
            }
            else
            {
                var product = new Product
                {
                    Category = categoryBox.SelectedItem.ToString(),
                    Type = typeBox.SelectedItem.ToString(),
                    Name = nameTextBox.Text,
                    Size = sizeBox.SelectedItem.ToString(),
                    Color = colorBox.Text,
                    Price = decimal.Parse(priceTextBox.Text),
                    Discount = int.Parse(discountTextBox.Text),
                    Stock = int.Parse(stockTextBox.Text),
                    Description = descriptionTextBox.Text,
                    Image = ImageToByteArray(productPictureBox.Image)
                };
                productCollection.InsertOne(product);
            }
            _productForm.LoadProducts();
            this.Dispose();
        }

        private void priceTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Get a reference to the TextBox
            TextBox textBox = sender as TextBox;

            // Check if the key pressed is a control key (i.e., Backspace)
            if (e.KeyChar == (char)Keys.Back)
            {
                return; // Allow control keys
            }

            // Allow only digits
            if (char.IsDigit(e.KeyChar))
            {
                // Check if there is a decimal point
                if (textBox.Text.Contains(","))
                {
                    // Count digits after the decimal point
                    int decimalIndex = textBox.Text.IndexOf(',');
                    int digitsAfterDecimal = textBox.Text.Length - decimalIndex - 1;

                    // Allow only two digits after the decimal point
                    if (digitsAfterDecimal >= 2)
                    {
                        e.Handled = true; // Suppress the key press
                        return;
                    }
                }
                return; // Allow digit input
            }

            // Allow only one decimal point
            if (e.KeyChar == ',' && textBox.Text.IndexOf(',') == -1)
            {
                return; // Accept decimal point if not already present
            }

            // If we reach here, suppress the key press
            e.Handled = true; // Suppress invalid input
        }

        private void discountTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Check if the key pressed is a control key (like Backspace)
            if (e.KeyChar == (char)Keys.Back)
            {
                return; // Allow control keys
            }

            // Check if the character is a digit
            if (!char.IsDigit(e.KeyChar))
            {
                e.Handled = true; // Suppress the key press
                return;
            }

            // If the length of the current text is already 3, suppress any additional input
            if ((sender as TextBox).Text.Length >= 3)
            {
                e.Handled = true; // Suppress the key press
            }
        }

        private void stockTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            // Check if the entered character is not a digit and not the backspace key
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)Keys.Back)
            {
                // If it's not, cancel the event
                e.Handled = true;
            }
        }

        private void changeImage_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog()) 
            {
                openFileDialog.Filter = "Image Files|*.bmp; *jpeg; *.jpg; *.png";
                openFileDialog.Title = "Select Product Image";

                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    // Load the image into the PictureBox
                    string filePath = openFileDialog.FileName;
                    Image img = Image.FromFile(filePath);
                    productPictureBox.Image = img;
                }
            }
        }

        // Convert Image to byte array
        public byte[] ImageToByteArray(Image image)
        {
            if (image == null)
            {
                // Use Path.Combine to get the relative path to the images folder
                string placeholderImgPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory,
                                                         "..",
                                                         "..",
                                                         "ProductImages",
                                                         "placeholder.jpg");

                // Get the full path
                placeholderImgPath = Path.GetFullPath(placeholderImgPath);

                image = Image.FromFile(placeholderImgPath);
            } 

            using (MemoryStream ms = new MemoryStream())
            {
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Png); // You can change the format if needed
                return ms.ToArray();
            }
        }

        // Convert byte array to Image
        public Image ByteArrayToImage(byte[] byteArray)
        {
            if (byteArray == null || byteArray.Length == 0) return null; // Handle null byte array case

            using (MemoryStream ms = new MemoryStream(byteArray))
            {
                return Image.FromStream(ms);
            }
        }

        private void productPictureBox_Paint(object sender, PaintEventArgs e)
        {
            // Only call OnTextChanged if we're not currently loading data
            if (!isLoadingData)
            {
                OnTextChanged(sender, e);
            }
        }
    }
}