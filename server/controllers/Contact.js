const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../mail/templates/contactFormRes");
const contactUs = async (req, res) => {
  try {
    //fetch data
    const { firstName, lastName, email, phoneNumber, message, countryCode } =
      req.body;
    //validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !message ||
      !countryCode
    ) {
      return res.status(401).json({
        success: false,
        message: `All fields are required`,
      });
    }

    //send mail
    try {
      //send mail to user
      const emailToUser = await mailSender(
        email,
        "Got your email, we will contact you soon",
        contactUsEmail(
          email,
          firstName,
          lastName,
          message,
          phoneNumber,
          countryCode
        )
      );
      //send mail to Admin
      const emailToAdmin = await mailSender(
        "9386407478aaa@gmail.com",
        `Got a query email from ${firstName + lastName}`,
        ` userEmail: ${email}, userName: ${
          firstName + lastName
        }, ${message}, ${phoneNumber})`
      );

      console.log("emailToUser ", emailToUser);
      console.log("emailToAdmin ", emailToAdmin);
      return res.status(200).json({
        success: true,
        message: "Email send successfully to user and admin",
      });
    } catch (error) {
      console.log("Error", error);
      console.log("Error message :", error.message);
      return res.json({
        success: false,
        message: "Something went wrong while sending email",
      });
    }
  } catch (error) {
    console.log("Error", error);
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong while fetching data and sending email",
    });
  }
};

module.exports = { contactUs };
