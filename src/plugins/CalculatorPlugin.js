const CalculatorPlugin = {
  name: 'calc',
  pattern: /^\/calc\s+(.+)$/,

  async execute(expression) {
    try {
      console.log('Calculator Input:', expression);

      if (!expression) {
        throw new Error('Please provide a mathematical expression');
      }

      const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, '');
      console.log('Sanitized Expression:', sanitizedExpression);

      if (!sanitizedExpression) {
        throw new Error('Invalid expression');
      }

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${sanitizedExpression}`)();
      console.log('Calculation Result:', result);

      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid expression or calculation result');
      }

      return {
        pluginName: 'calc',
        pluginData: {
          expression,
          result
        }
      };
    } catch (error) {
      console.error('Calculator Plugin execution error:', error);
      throw new Error(`Calculator error: ${error.message}`);
    }
  }
};

export default CalculatorPlugin;
