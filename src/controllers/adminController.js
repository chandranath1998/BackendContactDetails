const contactModel = require("../models/contactModel")
const adminModel = require("../models/adminModel")
const validation = require("../validation/validation")
const bcrypt = require("bcrypt")

exports.createAdmin = async (req,res) =>{
    try {
        let data = req.body;
        console.log(data)
    
        let {  email, password } = data;
    
        //body validation
    
        if ( !email || !password) {
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

        if (!validation.isValidPassword(password)) {
          return res
            .status(400)
            .send({
              status: false,
              Error: "INVALID password - Password should be in this format 1 lower case, 1 upper case, 1 special, 1 number with minimum 8 characters ",
            });
        }
        // hashing the password
        data.password = await bcrypt.hash(password, 10);
        // making email to lowercase
        email = email.toLowerCase();
        let createdContact = await adminModel.create(data);
        res.status(201).send({ status: true, Data: createdContact });
      } catch (err) {
        res.status(500).send({ status: false, Error: err.message });
      }
    };
    

exports.getContactDetails  = async (req,res) => {
   try {
    let data = req.body
    let {email, password} = data

    if ( !email || !password) {
      return res
        .status(400)
        .send({ status: false, Error: "user's all data is mandatory"});
    }
     // check email
    let adminCheck = await adminModel.findOne({email:email})
    if(!adminCheck){return res.status(404).send({status:false, Error:"Wrong email or password" })}

    // password check
    let passCheck = await bcrypt.compare(password, data.password);
    if(!passCheck){
        return res.status(400).send({status : false, message : "Wrong email or password"})
    }
   
   if(adminCheck && passCheck){

    // given data to the user
     let contactData = await contactModel.find()
     if(contactData.length==0){return res.status(404).send({status:false, message:"No data found"})}

     return res.status(200).send({status:true, Data : contactData})
   }
   } catch (error) {
    res.status(500).send({ status: false, Error: err.message });

   }
}
