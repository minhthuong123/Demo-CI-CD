const { assert } = require('chai');

class Assert {
  async true(boolean_actual, prefix = '') {
    let message = prefix + 'Actual: ' + boolean_actual + ' | Expect: true | message ';
    assert.equal(boolean_actual, true, message);
  }

  async false(boolean_actual, prefix = '') {
    let message = prefix + 'Actual: ' + boolean_actual + ' | Expect: false| message ';
    assert.equal(boolean_actual, false, message);
  }

  async equal(actual_value, expected_value, prefix = '') {
    let message = prefix + 'Actual: ' + actual_value + ' | Expect: ' + expected_value;
    assert.equal(actual_value, expected_value, message);
  }
}

module.exports = new Assert();
