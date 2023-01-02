const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/signup.html")
})

mailchimp.setConfig({
	apiKey: "c41d16fa73a68a6ef6ad8905f68ab755-us21",
	server: "us21"
})

app.post("/", function(req, res) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const listID = "116c3f97a7";

	const subscribingUser = {
		firstName: firstName,
		lastName: lastName,
		email: email
	};

	async function run() {
		const response = await mailchimp.lists.addListMember (listID, {
			email_address: subscribingUser.email,
			status: "subscribed",
			merge_fields: {
				FNAME: subscribingUser.firstName,
				LNAME: subscribingUser.lastName
			}
		})
		res.sendFile(__dirname + "/success.html");
		console.log("Successfully added contact to your list. ID: " + email);
	}
	run().catch(e => res.sendFile(__dirname + "/failure.html"));
})

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is running on port 3000!");
})

//API Key
//c41d16fa73a68a6ef6ad8905f68ab755-us21
//List ID
//116c3f97a7