import {
  Transform,
  ArrowFunctionExpression,
  Identifier,
  BlockStatement,
  VariableDeclarator,
  Node,
  JSCodeshift,
} from 'jscodeshift';

const isImpliedReturn = (body: Node) => body.type !== 'BlockStatement';

/* Implied body could be more than just an identifier,
 * but interrop between the overlapping jscodeshift/
 * ast-types types is an absolute PITA. */
const buildBlockStatement = (
  jscodeshift: JSCodeshift,
  impliedBody: Identifier,
) => jscodeshift.blockStatement([jscodeshift.returnStatement(impliedBody)]);

const transform: Transform = (fileInfo, { jscodeshift }) =>
  jscodeshift(fileInfo.source)
    .find(jscodeshift.VariableDeclaration)
    .filter(
      n =>
        (n.value.declarations[0] as VariableDeclarator)?.init?.type ===
        'ArrowFunctionExpression',
    )
    .replaceWith(n => {
      const declarator = n.value.declarations[0] as VariableDeclarator;
      const {
        params,
        body: rawBody,
        generator,
        async,
      } = declarator.init as ArrowFunctionExpression;

      const body = isImpliedReturn(rawBody)
        ? buildBlockStatement(jscodeshift, rawBody as Identifier)
        : (rawBody as BlockStatement);

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
