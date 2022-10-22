/**
 * @description: custom function which have fire function after a time
 * @param  {} method
 * @param  {} delay
 * @return none
 */

export const debounce = (method, delay) => {
  clearTimeout(method._tId);
  method._tId = setTimeout(function () {
    method();
  }, delay);
};

/**
 *
 * @param {Object} obj
 * @param {String} key
 * key contain dot like "address.country.city.ward" => obj.address.country.city.ward
 * @returns {*}
 */
export function getNestedValue(obj, key) {
  try {
    const KEY_SEPARATE_CHARACTER = ".";
    if (key.includes(KEY_SEPARATE_CHARACTER)) {
      return key.split(KEY_SEPARATE_CHARACTER).reduce((acc, cur) => {
        return acc ? acc[cur] : "";
      }, obj);
    } else {
      return obj[key];
    }
  } catch (error) {
    console.log(error);
  }
}
