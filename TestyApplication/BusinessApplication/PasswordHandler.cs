using BCrypt.Net;

public class PasswordHandler
{
    // Hash password
    public static string HashPassword(string password)
    {
        // The higher the work factor, the more secure but slower the process. 10-12 is a good default.
        return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }
    // Verify password
    public static bool VerifyPassword(string enteredPassword, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
    }
}
