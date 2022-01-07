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
const axios = require('axios');
const BulkSMSNigeriaInvalidPhone = require('./Exceptions/BulkSMSNigeriaInvalidPhone');
const BulkSMSNigeriaAPIError = require('./Exceptions/BulkSMSNigeriaAPIError');

const BASE_URL = 'https://www.bulksmsnigeria.com/api/v1/sms/create';

module.exports = class BulkSMSNigeria {
    constructor(apiKey, from, to, body, dnd = 2) {
        this.apiKey = apiKey;
        this.from = from;
        this.to = to;
        this.body = body;
        this.dnd = dnd;
    }

    validatePhone(phone) {
        let numbers;
        // if (typeof phone === 'object') {
        //     numbers = phone.toString();
        // } else if (
        //     typeof phone === 'number' &&
        //     !phone.length > 13 &&
        //     !phone.length < 10
        // ) {
        //     numbers = phone;
        // } else {
        //     throw new BulkSMSNigeriaInvalidPhone('Invalid phone number(s)');
        // }

        return phone;
    }

    sendSMS() {
        // Make a request

        let response;
        const link =
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
                const response = await axios.get(link);

                if (!response) {
                    reject('Something went wrong, message not send!');
                }
                
                const successObject = {
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
