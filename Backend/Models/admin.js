const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin'],
    },
    permissions: {
        type: Map,
        of: Boolean,
        default: { manageUsers: true, viewReports: true }, // Example permissions
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
    try {
        if (this.isModified('passwordHash')) {
            const salt = await bcrypt.genSalt(10);
            this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        }
        this.updatedAt = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});

// Method to validate password
adminSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
