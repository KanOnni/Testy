using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BusinessApplication 
{ 
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            while (true)
            {
                
                LoginForm loginForm = new LoginForm();
                Application.Run(loginForm);

                if (loginForm.UserSuccessfullyAuthenticated)
                {
                    if (loginForm.isAdmin)
                    {
                        MainForm mainForm = new MainForm(loginForm.loggedInAdmin);
                        Application.Run(mainForm);
                    }
                    else
                    {
                        MainForm mainForm = new MainForm(loginForm.loggedInUser);
                        Application.Run(mainForm);
                    }   
                }
                else
                {
                    break; // Exit the loop if login was not successful
                }
            }
        }
    }
}
