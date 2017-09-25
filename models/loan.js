'use strict';
const moment    = require('moment');
const yesterday = moment().subtract(1, 'days').format('YYYY[-]MM[-]DD');

module.exports = function(sequelize, DataTypes) {
    var Loan = sequelize.define('Loan', {
        book_id: {
            type: DataTypes.INTEGER,
            validate: {
                isNotNull: {
                    msg: 'Book Id is required.'
                }
            }
        },
        patron_id: {
            type: DataTypes.INTEGER,
            validate: {
                isNotNull: {
                    msg: 'Patron Id is required.'
                }
            }
        },
        loaned_on: {
            type: DataTypes.DATEONLY,
            validate: {
                isNotNull: {
                    msg: 'Loaned On Date is required.'
                },
                isDate: {
                    msg: 'Loaned On Date must be a valid date in the format; YYYY-MM-DD'
                },
                isAfter: {
                    args: yesterday,
                    msg: 'Loaned On Date must be later than yesterday.'
                }
            }
        },
        return_by: {
            type: DataTypes.DATEONLY,
            validate: {
                isNotNull: {
                    msg: 'Return By Date is required.'
                },
                isDate: {
                    msg: 'Return By Date must be in the correct format. ex. YYYY-MM-DD'
                },
                isAfter: {
                    Instance:prototype.getDataValue = function(loaned_on) {
                        return this.dataValues[loaned_on].add(6, 'days').format('YYYY[-]MM[-]DD');
                    },
                    msg: 'Return By Date must be at least a week after Loaned By Date'
                }
            }
        },
        returned_on: {
            type: DataTypes.DATEONLY
        }
    });
    Loan.associate = function(models) {
        // associations can be defined here
        Loan.belongsTo(models.Book, { foreignKey: "book_id" });
        Loan.belongsTo(models.Patron, { foreignKey: "patron_id" });
    };

    return Loan;
};
