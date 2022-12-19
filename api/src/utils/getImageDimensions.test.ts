/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as sizeOfSync from 'image-size';
import { getImageDimensions } from './getImageDimensions';

jest.mock('image-size');

describe('That getImageDimensions', () => {
    it('calls imageSize with input path', async () => {
        const mockSizeOfSync = jest.spyOn(sizeOfSync, 'default');
        mockSizeOfSync.mockImplementation((input: any, callback: any) => callback(null, { width: 10, height: 20 }));

        await getImageDimensions('/path/to/image');

        const inputParam = mockSizeOfSync.mock.calls[0][0];
        expect(inputParam).toBe('/path/to/image');
    });

    it('returns the height and width returned from resize', async () => {
        const mockSizeOfSync = jest.spyOn(sizeOfSync, 'default');
        mockSizeOfSync.mockImplementation((input: any, callback: any) => callback(null, { width: 10, height: 20 }));
        
        const returnData = await getImageDimensions('/path/to/image');
        const expectedResult = { width: 10, height: 20 };
        expect(returnData).toStrictEqual(expectedResult);
    });
});
