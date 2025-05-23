const CalculatorPlugin = {
  name: 'calc',
  pattern: /^\/calc\s+(.+)$/,
  
  async execute(expression) {
    try {
      console.log('Calculator Input:', expression);
      
      if (!expression) {
        throw new Error('Please provide a mathematical expression');
      }

      // Sanitize the expression to only allow basic math operations
      const sanitizedExpression = expression.replace(/[^0-9+\-*/().\s]/g, '');
      console.log('Sanitized Expression:', sanitizedExpression);
      
      if (!sanitizedExpression) {
        throw new Error('Invalid expression');
      }

      // Use Function constructor to evaluate the expression
      const result = new Function(`return ${sanitizedExpression}`)();
      console.log('Calculation Result:', result);
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid expression');
      }
      
      return {
        pluginName: 'calc',
        pluginData: {
          expression: expression,
          result: result
        }
      };
    } catch (error) {
      console.error('Calculator Error:', error);
      throw new Error('Invalid mathematical expression');
    }
  }
};

export default CalculatorPlugin; 