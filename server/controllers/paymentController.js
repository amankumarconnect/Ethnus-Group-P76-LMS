import Stripe from 'stripe';
import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.user._id;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            // Pass metadata so we can verify it later if needed
            metadata: { 
                courseId: course._id.toString(),
                userId: userId.toString(),
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: course.title },
                        unit_amount: Math.round(course.price * 100),
                    },
                    quantity: 1,
                },
            ],
            // THIS IS THE KEY CHANGE
            // We redirect to a new verification page with the session ID
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/course/${courseId}`,
        });

        res.json({ url: session.url });
    } catch (error) {
        next(error);
    }
};

// NEW FUNCTION to verify payment from the frontend
const verifySession = async (req, res, next) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was successful
        if (session.payment_status === 'paid') {
            const { userId, courseId } = session.metadata;

            // Security check: ensure the user verifying is the one who paid
            if (userId !== req.user._id.toString()) {
                res.status(403);
                throw new Error('User does not match the session.');
            }

            const user = await User.findById(userId);
            const course = await Course.findById(courseId);

            // Enroll the user if not already enrolled
            if (user && course && !user.enrolledCourses.includes(courseId)) {
                user.enrolledCourses.push(courseId);
                course.students.push(userId);
                await user.save();
                await course.save();
            }
            
            return res.status(200).json({ message: 'Payment verified and user enrolled.' });
        } else {
            res.status(400);
            throw new Error('Payment not successful.');
        }
    } catch (error) {
        next(error);
    }
};


// You can now delete the stripeWebhook function
export { createCheckoutSession, verifySession };