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
var axios = require('axios');
var BulkSMSNigeriaInvalidPhone = require('./Exceptions/BulkSMSNigeriaInvalidPhone');
var BulkSMSNigeriaAPIError = require('./Exceptions/BulkSMSNigeriaAPIError');

var BASE_URL = 'https://www.bulksmsnigeria.com/api/v1/sms/create';

module.exports = class BulkSMSNigeria {
    constructor(apiKey, from, to, body, dnd = 2) {
        this.apiKey = apiKey || process.env.BULK_SMS_NIGERIA_API_KEY;
        this.from = from;
        this.to = to;
        this.body = body;
        this.dnd = dnd;
    }

    validatePhone(phone) {
        if (typeof phone === 'string') {
            var numbers = phone.replace(/\s+/g, '').split(',');

            var validNumber = [];

            numbers.forEach((number) => {
                if (
                    number.length === 10 ||
                    number.length === 11 ||
                    number.length === 13
                ) {
                    number.split('').forEach((num) => {
                        if (isNaN(num))
                            throw new BulkSMSNigeriaInvalidPhone(
                                'Phone number should not contain letter or any special characters'
                            );
                    });

                    validNumber.push(number);
                } else {
                    throw new BulkSMSNigeriaInvalidPhone(
                        'Invalid phone number(s)'
                    );
                }
            });
        } else {
            throw new BulkSMSNigeriaInvalidPhone(
                'Pass phone number(s) as a string and seperate each with a comma'
            );
        }

        return validNumber.toString();
    }

    sendSMS() {
        // Make a request

        var response;
        var link =
            BASE_URL +
            '?api_token=' +
            this.apiKey +
            '&from=' +
            this.from +
            '&to=' +
            this.validatePhone(this.to) +
            '&body=' +
            this.body +
            '&dnd=' +
            this.dnd;

        return new Promise(async function (resolve, reject) {
            try {
                var response = await axios.get(link);

                if (!response) {
                    reject('Something went wrong, message not send!');
                }

                var successObject = {
                    msg: 'Success',
                    data: response,
                };

                resolve(successObject);
            } catch (err) {
                reject(
                    new BulkSMSNigeriaAPIError(
                        err.response.data.error.message,
                        err.response.data.error
                    )
                );
            }
        });
    }
};

// https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=qV4YsDFLAfIgLg9p3wfeeF9ecL63Yc7O&from=BulkSMSNG&to=07037770033&body=Welcome
