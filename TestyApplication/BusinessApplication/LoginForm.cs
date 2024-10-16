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
    public partial class LoginForm : Form
    {
        private MongoDbContext _dataBase;
        IMongoCollection<User> userCollection;
        IMongoCollection<Admin> adminCollection;
        public bool UserSuccessfullyAuthenticated { get; private set; }
        public bool isAdmin { get; private set; }
        public User loggedInUser { get; private set; }
        public Admin loggedInAdmin { get; private set; }
        public LoginForm()
        {
            InitializeComponent();
            _dataBase = new MongoDbContext("testy");
        }

        private void LoginUser()
        {
            string email = emailTextBox.Text;
            string password = pwdTextBox.Text;

            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter your email address and password");
                return;
            }

            if (string.IsNullOrEmpty(email)) 
            {
                MessageBox.Show("Please enter an email address");
                return;
            }
            if (string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter your password");
                return;
            }

            userCollection = _dataBase.GetCollection<User>("workers");
            adminCollection = _dataBase.GetCollection<Admin>("admins");

            var userFilter = Builders<User>.Filter.Eq(u => u.Email, email);
            var users = userCollection.Find(userFilter).ToList();

            var adminFilter = Builders<Admin>.Filter.Eq(a => a.Name, email);
            var admins = adminCollection.Find(adminFilter).ToList();

            if (users.Count > 0) 
            {
                foreach (User user in users) {

                    bool isPasswordValid = PasswordHandler.VerifyPassword(password, user.Password);

                    if (isPasswordValid) 
                    {
                        MessageBox.Show("Login successful");
                        loggedInUser = user;
                        isAdmin = false;
                        UserSuccessfullyAuthenticated = true;
                        return;
                    }
                }
                // If this point is reached the password didn't match
                MessageBox.Show("Invalid password");
            }
            else if (admins.Count > 0)
            {
                foreach (Admin admin in admins)
                {
                    bool isPasswordValid = PasswordHandler.VerifyPassword(password, admin.Password);

                    if (isPasswordValid)
                    {
                        MessageBox.Show("Login successful");
                        loggedInAdmin = admin;
                        isAdmin = true;
                        UserSuccessfullyAuthenticated = true;
                        return;
                    }
                }
                  MessageBox.Show("Invalid password");
            }
            else
            {
                MessageBox.Show("User not found");
            }
        }

        
        private void loginButton_Click(object sender, EventArgs e)
        {
            LoginUser();
            if (UserSuccessfullyAuthenticated)
            {
                Close();
            }

        }

        private void createAccButton_Click(object sender, EventArgs e)
        {
            NewAccForm newAccForm = new NewAccForm(_dataBase);
            this.Hide();
            newAccForm.ShowDialog();
            this.Show();
        }

        private void pwdTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Space)
            {
                e.Handled = true;
            }

            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                loginButton_Click(sender, e);
            }
        }

        private void emailTextBox_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Space)
            {
                e.Handled = true;
            }

            if (e.KeyChar == (char)Keys.Enter)
            {
                // Suppress the default behavior of the Enter key
                e.Handled = true;

                loginButton_Click(sender, e);
            }
        }
    }
}
