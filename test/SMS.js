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
const BulkSMSNigeria = require('../src/BulkSMSNigeria2');

(async () => {
    const SMS = new BulkSMSNigeria(
        'LW1S0Vty61rBnd14Hc9Qa6Qo25OFDIL06td3cNhl98XtCyALYJTu7hb1nP4L',
        'BulkSMSNG',
        '07065526016',
        'welcome',
        2
    );

    try {
        await SMS.sendSMS();
    } catch (e) {
        console.log(e);
    }
})();

// https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=LW1S0Vty61rBnd14Hc9Qa6Qo25OFDIL06td3cNhl98XtCyALYJTu7hb1nP4L&from=BulkSMSNG&to=07065526016&body=Welcome
