import { createPaymentService } from "./payment.service.js";

export const createPayment = async (req, res, next) => {
  try {
    // Destructure fields from requset body
    const { reservation_id, amount, payment_method } = req.body;

    // Call service to create payment
    const newPayment = await createPaymentService(reservation_id, amount, payment_method);

    // Success response
    res.status(200).json({newPayment});
  } catch (err) {
    // Pass to middleware
    return next(err);
  }
}