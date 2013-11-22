// Blanket configuration.
// --------------

// Specify code coverage files.
require('blanket')({
    // Only files that match the pattern will be instrumented
    pattern: ['/handler/', '/service/', '/model/', '/common/', '/middleware/'],
    'data-cover-never': 'node_modules'
});
