/**
 * ----------------------------------------------------------------
 * This file is part of the Bulk SMS Nigeria JS SDK.
 *
 * (c) Sylvanus Etim <iamprincesly@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * ----------------------------------------------------------------
 */
var BulkSMSNigeriaInvalidPhone = require('./Exceptions/BulkSMSNigeriaInvalidPhone');

module.exports = { validatePhoneNumber };

/**
 * Validate Phone numbers
 *
 * @param {Number} numbers
 * @return {Number} validNumbers
 */
function validatePhoneNumber(numbers) {
    var validNumbers = [];

    numbers.forEach((number) => {
        var length = number.length;

        if (length === 10 || length === 11 || length === 13) {
            number.split('').forEach((num) => {
                if (isNaN(num))
                    throw new BulkSMSNigeriaInvalidPhone(
                        'Phone number should not contain letter or any special characters'
                    );
            });

            validNumbers.push(number);
        } else {
            throw new BulkSMSNigeriaInvalidPhone('Invalid phone number(s)');
        }
    });

    return validNumbers.toString();
}
