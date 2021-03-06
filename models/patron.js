'use strict';

module.exports = function(sequelize, DataTypes) {
    let Patron = sequelize.define('Patron', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'First Name is required.'
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Last Name is required'
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Address is required.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email is required.'
                },
                isEmail: {
                    msg: 'Email must be in a valid format ex. person@domain.com'
                }
            }
        },
        library_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Library Id is required.'
                }
            }
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Zip Code is required'
                },
                not: {
                    args: /[a-zA-Z!@#$%\^&*()_+=[\]{}:;'".,/\\?`~\-<>]/gim,
                    msg: 'Zip code must contain only numbers, 0-9'
                }
            }
        }
    }, {
        getterMethods: {
            full_name() {
                return `${ this.first_name } ${ this.last_name }`;
            }
        },
        setterMethods: {
            full_name(full_name) {
                var split = full_name.split('');
                this.first_name = split[0];
                this.last_name = split[1];
            }
        }
    });
    Patron.associate = function(models) {
        // associations can be defined here
        Patron.hasMany(models.Loan, { foreignKey: 'patron_id' });   // 1 patron.id has many instances in loans (1:many)
    };
    return Patron;
};
