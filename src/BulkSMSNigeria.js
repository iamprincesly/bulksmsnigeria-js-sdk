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
var helpers = require('./helpers');

var BASE_URL = 'https://www.bulksmsnigeria.com/api/v1/sms/create';

module.exports = class BulkSMSNigeria {
    constructor(apiKey, from, to, body, dnd = 2) {
        this.apiKey = apiKey || process.env.BULK_SMS_NIGERIA_API_KEY;
        this.from = from;
        this.to = to;
        this.body = body;
        this.dnd = dnd;
    }

    checkNumbers(numbers) {
        let validNumbers;

        if (typeof numbers === 'string') {
            var numbersArr = numbers.replace(/\s+/g, '').split(',');

            validNumbers = helpers.validatePhoneNumber(numbersArr);
        } else if (numbers instanceof Array) {
            numbers.forEach((num) => {
                if (typeof num === 'number') {
                    validNumbers = helpers.validatePhoneNumber(numbers);
                } else {
                    throw new BulkSMSNigeriaInvalidPhone(
                        'Number(s) should not contain a space or special characters'
                    );
                }
            });
        } else {
            throw new BulkSMSNigeriaInvalidPhone(
                'Pass phone number(s) as a string and seperate each with a comma or pass it as array of strings'
            );
        }

        return validNumbers;
    }

    sendSMS() {
        var url =
            BASE_URL +
            '?api_token=' +
            this.apiKey +
            '&from=' +
            this.from +
            '&to=' +
            this.checkNumbers(this.to) +
            '&body=' +
            this.body +
            '&dnd=' +
            this.dnd;

        var options = { url: url, method: 'GET' };

        return new Promise(async function (resolve, reject) {
            try {
                var response = await axios.request(options);

                if (!response.data) {
                    reject('Something went wrong, message not send!');
                }

                var successObject = {
                    msg: 'Message sent successfully',
                    data: response.data,
                };

                resolve(successObject);
            } catch (err) {
                reject(
                    new BulkSMSNigeriaAPIError(
                        'Error sending message',
                        err.errors
                    )
                );
            }
        });
    }
};

// https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=qV4YsDFLAfIgLg9p3wfeeF9ecL63Yc7O&from=BulkSMSNG&to=07037770033&body=Welcome
