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

var { Erroran } = require('erroran');

/**
 *Throw error when invalid phone is use
 *
 * @class BulkSMSNigeriaAPIError
 * @extends {Error}
 */
class BulkSMSNigeriaAPIError extends Erroran {
    constructor(message, error) {
        super(message);
        if (error) {
            this.error = error;
        }

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BulkSMSNigeriaAPIError;
