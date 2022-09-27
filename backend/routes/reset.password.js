const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const PasswordReset = express.Router();

const tokenGenerator = require("../middleware/token.generator");
const emailCheckresSetPassword = require("../middleware/reset.mail");
const tokenDecrypt = require("../middleware/token.decrypt");
const UserModel = require("../usermodel/User.Model");
const fs = require("fs");

PasswordReset.post("/password/success", tokenDecrypt,passwordEncrypt, async (req, res) => {
  const { email ,password} = req.body;
  const user = await UserModel.updateOne({email},{password:password});
  console.log(user);
if(user.matchedCount==1){
  res.send({message:"password update successfull " ,status:true});
}
else{
  res.send({message:'something is wrong' ,status:false})
}
});

PasswordReset.get("/success", (req, res) => {
  // console.log(req,'get wala');
  res.send("done");
});

PasswordReset.get("/password/new", (req, res) => {
  const { token } = req?.query;

  jwt.verify(token, "mernapp", function (err, decoded) {
    if (err) {
      return res.send({ message: "expire time", status: false });
    }

    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <input type="password" placeholder="new password" id="primary" />
        <input type="password" placeholder="confirm password" id="newpass" />
        <button onclick="final()">submit</button>
      </body>
    </html>
    
    <script>
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

      function final() {
        const input = document.querySelector("#newpass").value;
        const primary = document.querySelector("#primary").value;
        let data={
          password:input
         
        }
        fetch("https://floating-waters-51705.herokuapp.com/reset/password/success", {
          method:"POST",
          headers: {'Content-Type': 'application/json',
          'authentication':params.token
        },
          body:JSON.stringify(data)
 
        }).then((res)=>{
          res.json()
        }).then((res)=>{
          window.location.href="https://floating-waters-51705.herokuapp.com/reset/success"
        })
      }
    </script>
    `);
  });
});

PasswordReset.post(
  "/password",
  emailCheckresSetPassword,
  tokenGenerator,
  async (req, res) => {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "viralforyou4@gmail.com",
        pass: "zkouajgkbybhjarx",
      },
    });

    var mailOptions = {
      from: "'Mocker API'viralforyou4@gmail.com",
      to: req.body?.email,
      subject: "Password reset Request",
      text: "That was easy!",
      html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password Notification</title>
        <style>
          .name,
          .button,
          footer {
            text-align: center;
            align-items: center;
          }
          footer{
            padding-top:25px;
          }
          .button button {
            background: rgb(83, 194, 238);
            border: none;
            color: #fff;
            padding: 10px 18px 10px 18px;
            border-radius: 5px;
          }
          .main {
            max-width: 95%;
            margin: auto;
            padding: 25px;
            border:1px solid;
          }
          .hight {
            margin-bottom: 35px;
          }
          @media (min-width: 415px) and (max-width: 80px) {
            .main {
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="name">
          <h1>App build</h1>
        </div>
        <div class="main">
          <div class="container">
            <h3>Hello!</h3>
            <p>
              You are receiving this email because we received a password reset
              request for your account
            </p>
          </div>
          <div>
            <div class="button"
            
            ><button><a href="https://floating-waters-51705.herokuapp.com/reset/password/new/?token=${req.body?.token}">Reset Password</a></button></div>
            <div class="hight">
              <p>
                if you did not request a password reset, no futher action is
                required.
              </p>
            </div>
            <p>Regards,</p>
            <p>App Build</p>
          </div>
         
        </div>
        <footer>@ 2020 app build. All rights reserved.</footer>
      </body>
    </html>
    
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("Email sent: " + info.response);
        res.send({
          message: "Email is send please check email box",
          status: true,
        });
      }
    });
  }
);

module.exports = PasswordReset;
