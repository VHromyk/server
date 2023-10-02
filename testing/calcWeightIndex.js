const calcWeightIndex = (weight, height) => {
        if(weight < height) {
               throw new Error('weight must be 1 argument and height - 2')
        }

        if(!weight || !height) {
                throw new Error('weight and height are required')
        }

        if(typeof weight !== 'number' || typeof height !== 'number') {
                throw new Error('weight must be 1 argument and height - 2')
        }

        const result = (weight / (height ** 2)).toFixed(2);

        return Number(result);
}

export default calcWeightIndex;