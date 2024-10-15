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
    public partial class UsersForm : Form
    {
        MongoDbContext _dataBase;
        IMongoCollection<User> userCollection;
        public UsersForm(MongoDbContext dataBase)
        {
            InitializeComponent();
            _dataBase = dataBase;
        }
        private void UsersForm_Load(object sender, EventArgs e)
        {
            LoadUsers();
        }

        private void LoadUsers()
        {
            userCollection = _dataBase.GetCollection<User>("workers");
            userDataGV.Rows.Clear();

            var users = userCollection.Find(_ => true).ToList();

            foreach (var user in users)
            {
                if (user != null)
                {
                    userDataGV.Rows.Add(
                        user.Id.ToString(),
                        user.Name,
                        user.Email
                    );
                }
            }
        }

        private void userDataGV_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            string column = userDataGV.Columns[e.ColumnIndex].Name;
            if (column == "Delete")
            {
                string userID = userDataGV[0, e.RowIndex].Value.ToString();
                string userName = userDataGV[1, e.RowIndex].Value.ToString();

                if (MessageBox.Show($"Are you sure you want to delete this user?\n ID: {userID}\n Name: {userName}", "Delete", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                {
                    try
                    {
                        var filter = Builders<User>.Filter.Eq(c => c.Id, ObjectId.Parse(userDataGV[0, e.RowIndex].Value.ToString()));
                        userCollection.DeleteOne(filter);
                        LoadUsers();
                        MessageBox.Show($"User successfully deleted \n PID: {userID}\n Name: {userName}");
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.ToString());
                    }
                }
            }
        }
        private void updateButton_Click(object sender, EventArgs e)
        {
            LoadUsers();
        }
    }
}
