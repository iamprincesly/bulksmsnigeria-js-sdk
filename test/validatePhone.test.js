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
var BulkSMSNigeria = require('../src/BulkSMSNigeria');

var SMS = new BulkSMSNigeria(
    'LW1S0Vty61rBnd14Hc9Qa6Qo25OFDIL06td3cNhl98XtCyALYJTu7hb1nP4L',
    'BulkSMSNG',
    '07065526016',
    'welcome',
    2
);

describe('Validat Phone', () => {
    it('Should throw error for invalid phone number', () => {
        expect(() => {
            SMS.validatePhone('701234567867,07065561062341,234706106');
        }).toThrow();
    });

    it('Should throw error for containing letters and special characters', () => {
        expect(() => {
            SMS.validatePhone('7065526f06,07012]45678,23470655-106');
        }).toThrow();
    });

    it('Should throw error because numbers are not pass as string', () => {
        expect(() => {
            SMS.validatePhone(['7012345678','07012345678','2347012345678']);
        }).toThrow();

        expect(() => {
            SMS.validatePhone(2347012345678);
        }).toThrow();
    });

    it('Should return valid phone numbers seperated with a comma', () => {
        var result = SMS.validatePhone('7012345678,07012345678,2347012345678');
        expect(result).toBe('7012345678,07012345678,2347012345678');
    });
});
