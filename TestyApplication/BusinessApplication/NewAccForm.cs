using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Configuration;

namespace BusinessApplication
{
    public partial class NewAccForm : Form
    {
        private MongoDbContext _dataBase;
        public bool AccountSuccessfullyCreated { get; private set; }
        public NewAccForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }

        private void RegisterUser()
        {
            string name = nameTextBox.Text;
            string email = emailTextBox.Text;
            string password = pwdTextBox.Text;
            string confirmPassword = pwdConfirmBox.Text;
            string userKey = keyTextBox.Text;

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword) || string.IsNullOrEmpty(userKey))
            {
                MessageBox.Show("Please fill all the boxes");
            } 
            else
            {
                // Validate password confirmation
                if (password != confirmPassword)
                {
                    MessageBox.Show("Passwords do not match.");
                    return;
                }

                string correctKey = ConfigurationManager.AppSettings["RegistrationKey"];
                if (userKey != correctKey)
                {
                    MessageBox.Show("Invalid registration key.");
                    return;
                }

                // Hash the password using BCrypt
                string hashedPassword = PasswordHandler.HashPassword(password);

                // Store user details in the database (pseudo code for storing in MongoDB)
                var user = new User
                {
                    Name = name,
                    Email = email,
                    Password = hashedPassword
                };

                _dataBase.GetCollection<User>("workers").InsertOne(user);
                MessageBox.Show("Account created successfully.");
                AccountSuccessfullyCreated = true;
            }
        }


        private void createAccButton_Click(object sender, EventArgs e)
        {
            RegisterUser();
            if (AccountSuccessfullyCreated)
            {
                this.Close();
            }
        }

        private void loginButton_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void nameTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                createAccButton_Click(sender, e);
            }
        }

        private void pwdTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                createAccButton_Click(sender, e);
            }
        }

        private void emailTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                createAccButton_Click(sender, e);
            }
        }

        private void pwdConfirmBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                createAccButton_Click(sender, e);
            }
        }

        private void keyTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                createAccButton_Click(sender, e);
            }
        }
    }
}
