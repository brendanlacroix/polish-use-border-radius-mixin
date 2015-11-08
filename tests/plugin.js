define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-use-border-radius-mixin',

    message: function () {
      assert.strictEqual(plugin.message, 'Border radius should not be set explicitly. Use "@include border-radius".');
    },

    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 10);
        assert.equal(errors[0].node.toString().trim(), 'border-radius: 13px');
        assert.equal(errors[1].node.toString().trim(), 'border-radius: 10%');
        assert.equal(errors[2].node.toString().trim(), 'border-top-left-radius: 10%');
        assert.equal(errors[3].node.toString().trim(), 'border-radius: 10px / 50px');
        assert.equal(errors[4].node.toString().trim(), 'border-radius: 0');
        assert.equal(errors[5].node.toString().trim(), 'border-radius: 13px');
        assert.equal(errors[6].node.toString().trim(), 'border-radius: 10%');
        assert.equal(errors[7].node.toString().trim(), 'border-top-left-radius: 10%');
        assert.equal(errors[8].node.toString().trim(), 'border-radius: 10px / 50px');
        assert.equal(errors[9].node.toString().trim(), 'border-radius: 0');
      }));
    }
  });
});