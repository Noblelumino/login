const passport = require('passport');
const argon2 = require('argon2');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }
        console.log('User object:', user);

         // Check if the password hash is valid before verifying
         if (!user.password || typeof user.password !== 'string' || user.password.trim() === '') {
            return done(null, false, { message: 'Invalid or missing password hash' });
        }

        try {
            const isMatch = await argon2.verify(user.password, password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password is incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id); // Assuming `id` is a unique identifier for your users
    });

    passport.deserializeUser((id, done) => {
        // Fetch the user by `id` from the database
        // You'll need to implement this logic with your database
        // Example: getUserById(id) or whatever function you have to get the user by their ID
        return done(null, getUserById(id));
    });
}



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Call next() to continue to the next middleware if authenticated
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

// Middleware to restrict access to pages that don't need login when already logged in
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/'); // Redirect to home if authenticated
    }
    next(); // Call next() to continue to the next middleware if not authenticated
}

// Export all functions together
module.exports = {
    initialize,
    checkAuthenticated,
    checkNotAuthenticated
};