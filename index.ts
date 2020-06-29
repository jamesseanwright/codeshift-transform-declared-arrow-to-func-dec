import { Transform, ArrowFunctionExpression, Identifier, BlockStatement, VariableDeclarator } from 'jscodeshift';

const transform: Transform = (fileInfo, { jscodeshift }) =>
  jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(n => n.value.declarations[0].init.type === 'ArrowFunctionExpression')
    .replaceWith(n => {
      const declarator = n.value.declarations[0] as VariableDeclarator;

      const { params, body, generator, async } = declarator.init as ArrowFunctionExpression;

      return jscodeshift.functionDeclaration(
        jscodeshift.identifier((declarator.id as Identifier).name),
        params,
        body as BlockStatement,
        generator,
      );
    })
    .toSource();

export default transform;
