import { Transform, ArrowFunctionExpression, Identifier, BlockStatement, VariableDeclarator } from 'jscodeshift';

const transform: Transform = (fileInfo, { jscodeshift }) =>
  jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(n => n.value.declarations[0].init.type === 'ArrowFunctionExpression')
    .replaceWith(n => {
      const declarator = n.value.declarations[0] as VariableDeclarator;

      const { params, body, generator, async } = declarator.init as ArrowFunctionExpression;

      const declaration = jscodeshift.functionDeclaration(
        jscodeshift.identifier((declarator.id as Identifier).name),
        params,
        body as BlockStatement,
        generator,
      );

      /* There doesn't seem to be a parameter
       * for functionDeclaration() to create
       * async functions :/ */
      declaration.async = async;

      return declaration;
    })
    .toSource();

export default transform;
