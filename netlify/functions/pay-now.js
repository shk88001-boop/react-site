const axios = require("axios");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const form = new URLSearchParams();
    form.append("transaction_id", Date.now().toString());
    form.append("sales_amount", body.amount);
    form.append("email", body.email);

    console.log("Form Data Sent:", form.toString());

    const response = await axios.post(
      "https://visiopt.com/app/webhook_capture_custom/MTA5MC00MjMtMTUzLVc=",
      form,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("Webhook Response:", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        status: response.status,
        sentForm: form.toString(),
        webhookResponseRaw: response.data
      })
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message
      })
    };
  }
};
