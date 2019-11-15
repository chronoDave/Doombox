module.exports = {
  validationString: context => ({ id: 'validation:string', context }),
  validationRequired: 'validation:required',
  validationNumber: context => ({ id: 'validation:number', context }),
  validationFile: context => ({ id: 'validation:file', context })
};
