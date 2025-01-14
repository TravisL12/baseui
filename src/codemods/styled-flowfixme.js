/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */

// @flow

function getStyledImportName(j, root) {
  const baseImports = root.find(j.ImportDeclaration, {
    source: {value: 'baseui'},
  });
  if (baseImports.length) {
    const styledImports = baseImports.find(j.ImportSpecifier, {
      imported: {name: 'styled'},
    });

    if (styledImports.length) {
      return styledImports.get(0).node.local.name;
    }
  }
  return null;
}

function containsFlowComment(j, root) {
  const getBodyNode = () => root.find(j.Program).get('body', 0).node;
  const comments = getBodyNode().comments || [];
  return comments.filter(e => e.value.indexOf('@flow') !== -1).length > 0;
}

module.exports = function(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  if (containsFlowComment(j, root)) {
    const styledImportName = getStyledImportName(j, root);
    if (styledImportName) {
      const comment = j.commentLine(' $FlowFixMe', true, false);
      const styledComponents = root.find(j.VariableDeclaration).filter(path => {
        const calls = j(path).find(j.CallExpression, {
          callee: {name: styledImportName},
        });
        return Boolean(calls.length);
      });

      styledComponents.forEach(path => {
        path.node.comments = path.node.comments || [];
        path.node.comments.push(comment);
      });
    }
  }

  return root.toSource();
};

module.exports.parser = 'flow';
