/*!
 * export-functions <https://github.com/AndreasPizsa/export-functions>
 *
 * Copyright (c) 2016, Andreas Pizsa.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * return an object with named functions.
 *
 * ```
 * function hello() { console.log('hello'); }
 * function world() { console.log('world'); }
 *
 * exportFunctions(module.exports,[
 *   hello,
 *   world
 * ]);
 *
 * // <- {
 * //      hello: hello,
 * //      world: world
 * //    }
 * ```
 *
 * @api public
 * @param functionsArray
 * @returns {*}
 */
function exportFunctions(targetObject,functionsArray)
{
  if(arguments.length === 1) {
    functionsArray= targetObject;
    targetObject  = {};
  }

  if(!Array.isArray(functionsArray)) throw new TypeError('Expected an array of functions');

  return functionsArray.reduce(function(result,currentFunction){
    if(typeof currentFunction !== 'function') throw new TypeError('all elements must be functions');
    if(!currentFunction.name) throw new Error('all functions must be named functions');

    result[currentFunction.name]=currentFunction;
    return result;
  }, targetObject);
}

module.exports = exportFunctions;
