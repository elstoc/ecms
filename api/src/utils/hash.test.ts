/* eslint-disable  @typescript-eslint/no-explicit-any */

import { hashPassword, verifyPasswordWithHash } from './hash';

describe('That hash', () => {
    it('correctly verifies a valid password', async () => {
        const hash = await hashPassword('ThisPassword');
        const verified = await verifyPasswordWithHash('ThisPassword', hash);
        expect(verified).toBe(true);
    });

    it('correctly fails to verify an invalid password', async () => {
        const hash = await hashPassword('ThisPassword');
        const verified = await verifyPasswordWithHash('ThatPassword', hash);
        expect(verified).toBe(false);
    });
});
