const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        hooks: {
            // Hash password before creating a user
            beforeCreate: async (user) => {
                if (user.password_hash) {
                    const salt = await bcrypt.genSalt(12);
                    user.password_hash = await bcrypt.hash(user.password_hash, salt);
                }
            },
            // Hash password before updating if it was changed
            beforeUpdate: async (user) => {
                if (user.changed('password_hash')) {
                    const salt = await bcrypt.genSalt(12);
                    user.password_hash = await bcrypt.hash(user.password_hash, salt);
                }
            }
        }
    });

    // Instance method to check password validity
    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password_hash);
    };

    // Instance method to update password
    User.prototype.updatePassword = async function(newPassword) {
        this.password_hash = newPassword;
        await this.save();
    };

    return User;
};
