const { contactUsEmail } = require("../mails/templates/contactFormRes");
const { mailSender } = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, phoneNo, countrycode, message } =
    req.body;

  try {
    const emailRes = await mailSender(
      email,
      "Your Email send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    console.log(emailRes);
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error);
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
