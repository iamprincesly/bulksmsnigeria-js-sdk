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

/**
 *Throw error when invalid phone is use
 *
 * @class BulkSMSNigeriaInvalidPhone
 * @extends {Error}
 */
class BulkSMSNigeriaInvalidPhone extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BulkSMSNigeriaInvalidPhone;
