namespace BusinessApplication
{
    partial class LoginForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LoginForm));
            this.createAccButton = new System.Windows.Forms.Button();
            this.loginButton = new System.Windows.Forms.Button();
            this.pwdTextBox = new System.Windows.Forms.TextBox();
            this.emailTextBox = new System.Windows.Forms.TextBox();
            this.pwordLabel = new System.Windows.Forms.Label();
            this.emailLabel = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // createAccButton
            // 
            this.createAccButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.createAccButton.Location = new System.Drawing.Point(97, 362);
            this.createAccButton.Margin = new System.Windows.Forms.Padding(2);
            this.createAccButton.Name = "createAccButton";
            this.createAccButton.Size = new System.Drawing.Size(133, 30);
            this.createAccButton.TabIndex = 11;
            this.createAccButton.Text = "Create account";
            this.createAccButton.UseVisualStyleBackColor = true;
            this.createAccButton.Click += new System.EventHandler(this.createAccButton_Click);
            // 
            // loginButton
            // 
            this.loginButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.loginButton.Location = new System.Drawing.Point(118, 317);
            this.loginButton.Margin = new System.Windows.Forms.Padding(2);
            this.loginButton.Name = "loginButton";
            this.loginButton.Size = new System.Drawing.Size(87, 30);
            this.loginButton.TabIndex = 10;
            this.loginButton.Text = "Login";
            this.loginButton.UseVisualStyleBackColor = true;
            this.loginButton.Click += new System.EventHandler(this.loginButton_Click);
            // 
            // pwdTextBox
            // 
            this.pwdTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.pwdTextBox.Location = new System.Drawing.Point(66, 263);
            this.pwdTextBox.Margin = new System.Windows.Forms.Padding(2);
            this.pwdTextBox.Multiline = true;
            this.pwdTextBox.Name = "pwdTextBox";
            this.pwdTextBox.PasswordChar = '●';
            this.pwdTextBox.Size = new System.Drawing.Size(188, 28);
            this.pwdTextBox.TabIndex = 9;
            this.pwdTextBox.WordWrap = false;
            this.pwdTextBox.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.pwdTextBox_KeyPress);
            // 
            // emailTextBox
            // 
            this.emailTextBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.emailTextBox.Location = new System.Drawing.Point(66, 193);
            this.emailTextBox.Margin = new System.Windows.Forms.Padding(2);
            this.emailTextBox.Multiline = true;
            this.emailTextBox.Name = "emailTextBox";
            this.emailTextBox.Size = new System.Drawing.Size(188, 28);
            this.emailTextBox.TabIndex = 8;
            this.emailTextBox.WordWrap = false;
            this.emailTextBox.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.emailTextBox_KeyPress);
            // 
            // pwordLabel
            // 
            this.pwordLabel.AutoSize = true;
            this.pwordLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.pwordLabel.Location = new System.Drawing.Point(62, 241);
            this.pwordLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.pwordLabel.Name = "pwordLabel";
            this.pwordLabel.Size = new System.Drawing.Size(78, 20);
            this.pwordLabel.TabIndex = 7;
            this.pwordLabel.Text = "Password";
            // 
            // emailLabel
            // 
            this.emailLabel.AutoSize = true;
            this.emailLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.emailLabel.Location = new System.Drawing.Point(62, 171);
            this.emailLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.emailLabel.Name = "emailLabel";
            this.emailLabel.Size = new System.Drawing.Size(48, 20);
            this.emailLabel.TabIndex = 6;
            this.emailLabel.Text = "Email";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(35, 20);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(257, 142);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 12;
            this.pictureBox1.TabStop = false;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(107)))), ((int)(((byte)(106)))));
            this.ClientSize = new System.Drawing.Size(327, 454);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.createAccButton);
            this.Controls.Add(this.loginButton);
            this.Controls.Add(this.pwdTextBox);
            this.Controls.Add(this.emailTextBox);
            this.Controls.Add(this.pwordLabel);
            this.Controls.Add(this.emailLabel);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.MinimumSize = new System.Drawing.Size(343, 443);
            this.Name = "LoginForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Login";
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button createAccButton;
        private System.Windows.Forms.Button loginButton;
        private System.Windows.Forms.TextBox pwdTextBox;
        private System.Windows.Forms.TextBox emailTextBox;
        private System.Windows.Forms.Label pwordLabel;
        private System.Windows.Forms.Label emailLabel;
        private System.Windows.Forms.PictureBox pictureBox1;
    }
}

