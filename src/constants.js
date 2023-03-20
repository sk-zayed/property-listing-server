const Errors = {
    BadRequest: "BadRequest",
    NotFound: "NotFound",
    ValidationError: "ValidationError",
    MongoServerError: "MongoServerError",
    UnAuthorized: "UnAuthorized",
    InternalServerError: "InternalServerError",
    Forbidden: "Forbidden",
};

const Plans = {
    BASIC: {
        name: "Basic plan",
        price: 19900,
        valid: 1
    },
    PRO: {
        name: "Pro plan",
        price: 29900,
        valid: 3
    }
};

module.exports = {
    Errors,
    Plans
};


// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51Mn5efSHsghl0djFCtTT8xDTvf5VZ3OAIezMy7Qo3pwEIcuCIAudUjo7UB9EkdWmEdyfW4Hm8iVLC1u1qz5pIwCT00GdDr6hkY');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));
