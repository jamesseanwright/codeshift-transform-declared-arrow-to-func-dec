import { Transform, ArrowFunctionExpression, Identifier, BlockStatement, VariableDeclarator, Literal, Node, JSCodeshift } from 'jscodeshift';

const isImpliedReturn = (body: Node) =>
  body.type !== 'BlockStatement';

const buildBlockStatement = (jscodeshift: JSCodeshift, impliedBody: Node) =>
  jscodeshift.blockStatement([
    jscodeshift.returnStatement(impliedBody),
  ]);

const transform: Transform = (fileInfo, { jscodeshift }) =>
  jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(n => n.value.declarations[0].init.type === 'ArrowFunctionExpression')
    .replaceWith(n => {
      const declarator = n.value.declarations[0] as VariableDeclarator;
      const { params, body: rawBody, generator, async } = declarator.init as ArrowFunctionExpression;

      const body = isImpliedReturn(rawBody)
        ? buildBlockStatement(jscodeshift, rawBody)
        : rawBody as BlockStatement;

      const declaration = jscodeshift.functionDeclaration(
        jscodeshift.identifier((declarator.id as Identifier).name),
        params,
        body,
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
