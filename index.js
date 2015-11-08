module.exports = {
  name: 'use-border-radius-mixin',
  message: 'Border radius should not be set explicitly. Use "@include border-radius".',
  test: function(ast){
    var errors = [];

    ast.traverse(function(declaration) {
      if (declaration.type !== 'declaration') {
        return;
      }

      declaration.traverse(function (ident, position, parent) {
        var string,
            percent;

        if (ident.type !== 'ident') {
          return;
        }

        /*
         * border-radius values of 50%+ are common for creating circles,
         * so here we check for the presence of a percentage inside of the
         * declaration, then see if it is between 50% and 100%.
         */
        percent = declaration.first('value').first('percentage');
        percent = percent && percent.first('number').toString();

        if (percent && 50 <= percent && percent <= 100) {
          return;
        }

        string = ident.toString();

        if (string.indexOf('radius') !== -1 && string.indexOf('border') === 0) {
          errors.push({
            node: declaration
          });
        }
      });
    });

    return errors;
  }
};
