/*
 * @fileoverview Doclet describing API options should end with `@apioption` or
 * `@optionparent` tag, except for scope hints like `@private` for the class
 * reference.
 */
'use strict';

const message = 'Option doclet should end with @apioption, except @private follows.';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: message,
            category: 'Docs',
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function (context) {

        // variables should be defined here
        const code = context.getSourceCode().lines.join('\n');

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const program = (node) => {

            const regex = /@apioption[^\/]+@(\w+)[\s\S]+\*\//;

            if (regex.test(code)) {

                const match = regex.exec(code);

                if (match[1] === 'private') {
                    return;
                }

                const codeBefore = code.split(regex)[0];
                const linesBefore = codeBefore.split('\n');
                const loc = {
                    line: linesBefore.length,
                    column: linesBefore[linesBefore.length - 1].length + 2
                };

                context.report({
                    node: node,
                    loc: loc,
                    message: message
                });
            }
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {

            Program: program

        };
    }
};
