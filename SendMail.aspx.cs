using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Net.Mail;

public partial class SendMail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string name = String.Format("{0}", Request.Form["c_name"]);
        string email = String.Format("{0}", Request.Form["c_email"]);
        string message = String.Format("{0}", Request.Form["c_message"]);
        
        if (message != string.Empty)
        {
            string fromMailAddress = "xcuse.ffr@gmail.com";
            string toMailAddress = "rabbyalone@gmail.com";

            string toMailSubject = "Mail From: " + name;
            string mailBody = "++++**** MESSAGE FROM PERSONAL WEBSITE****++++ <br/>" + "____" + email + "____" + message;

            //Mail Client Configuration 
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(fromMailAddress);
            msg.To.Add(toMailAddress);
            msg.Body = mailBody;
            msg.IsBodyHtml = true;
            msg.Subject = toMailSubject;

            //Mail Configuration 
            #region abc
            string password = "!Rumirh!";
            #endregion
            SmtpClient smt = new SmtpClient("smtp.gmail.com");
            smt.Port = 587;
            smt.EnableSsl = true;
            smt.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            smt.UseDefaultCredentials = false;
            smt.Credentials = new NetworkCredential(fromMailAddress, password);
            smt.Send(msg);
            string script = "<script>alert('Mail Sent Successfully');self.close();</script>";
            this.ClientScript.RegisterClientScriptBlock(this.GetType(), "sendMail", script);
        }

    }

    [System.Web.Services.WebMethod]
    public static string FormData(fd obj)
    {

        return string.Empty;
    }
}

public class fd
{
    public string  c_name{ get; set; }
    public string  c_email{ get; set; }
    public string  c_message{ get; set; }
}