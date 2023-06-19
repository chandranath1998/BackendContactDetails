const contactModel = require("../models/contactModel");
const validation = require("../validation/validation")

exports.createContact = async  (req, res) => {
  try {
    let data = req.body;
    console.log(data)

    let { name, email, phone } = data;

    //body validation

    if (!name || !email || !phone) {
      return res
        .status(400)
        .send({ status: false, Error: "user's all data is mandatory"});
    }

    // email syntax validation
    if (!validation.isValidEmail(email)) {
      return res
        .status(400)
        .send({
          status: false,
          Error: "INVALID EMAIL - Email should be in this format (abc@gmail.com)",
        });
    }

    // phone number syntax validation 

    if (!validation.checkPHnumber(phone)) {
      return res
        .status(400)
        .send({
          status: false,
          Error: "Invalid mobile number - Should be a 10-digit number starting with a digit from 6 to 9.",
        });
    }


    // making email to lowercase
    email = email.toLowerCase();

   

    let createdContact = await contactModel.create(data);
    res.status(201).send({ status: true, Data: createdContact });
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};
