const cds = require('@sap/cds');

module.exports = async (srv) => {
    srv.on('READ', 'Products', async (req, next) => {
        const items = await next(); // Get the data first

        // Programmatic check:
        if (req.user.is('Admin')) {
            console.log('🛡️ Admin access detected: Logging sensitive stock details...');
        } else {
            console.log('👤 Viewer access: Hiding internal notes.');
            // Example: Masking data for non-admins
            items.forEach(item => item.title += ' (Public View)');
        }

        return items;
    });
};