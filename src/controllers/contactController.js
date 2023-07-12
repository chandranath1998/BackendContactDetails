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

exports.getByDate = async (req,res) => {
  try {
  const filter = req.params.filter;

  let startDate;
  let endDate = new Date();
// for Today
  switch (filter) {
    case "today":
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      break;

      // For yesterday
    case "yesterday":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "15days":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 15);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      return res.status(400).json({ error: "Invalid filter" });
  }

 // filtering the data
 
    const contacts = await contactModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    // send data to Client
    res.status(200).send({status:true, Message: "Success", Data:contacts})

  } catch (error) {
    res.status(500).send({ status: false, error: message.error });
  }
}


