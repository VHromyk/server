import calcWeightIndex from "./calcWeightIndex.js";

describe('test calcWeightIndex', ()=> {
    test('90, 1.9 => 24.93', ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
    })

    test('1.9, 90 => error weight must be 1 argument and height - 2', () => {
        expect(()=> calcWeightIndex(1.9, 90)).toThrow('weight must be 1 argument and height - 2')
    })

    it('=> weight and height are required', () => {
        expect(()=> calcWeightIndex()).toThrow('weight and height are required')
    })

    test("'1.9', '90' => error and height must be a number", () => {
        expect(()=> calcWeightIndex('1.9', '90')).toThrow('weight must be 1 argument and height - 2')
    })
})