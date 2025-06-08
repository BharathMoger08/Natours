/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// ✅ Public test key from your Stripe dashboard
const stripe = Stripe(
  'pk_test_51RAoIaLZCUfoBXO0F9zBP6RnyPWtIUpXNQM6IHqZdk9ZRHTs54YKhGhJDzjp3lgMqdzu2MLskljgPPk693ezeT1m00Oqy74xvm'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from the server
    const sessionRes = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Redirect to Stripe Checkout
    await stripe.redirectToCheckout({
      sessionId: sessionRes.data.session.id
    });
  } catch (err) {
    console.error('Error redirecting to Stripe:', err);
    showAlert(
      'error',
      'Something went wrong while processing your payment. Please try again.'
    );
  }
};
