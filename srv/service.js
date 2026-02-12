const cds = require('@sap/cds');

module.exports = async (srv) => {
    // 1. Connect to the external service defined in package.json
    const api = await cds.connect.to('RemoteService');

    srv.on('READ', 'Products', async (req) => {
        try {
            console.log(`🔍 Request by: ${req.user.id}`);
            console.log('🔗 Calling Destination: my-external-api...');
            
            // 2. Instead of 'await next()', fetch from the external API
            const response = await api.get('/posts'); 

            // 3. Map the external data to your CAP entity structure
            const items = response.map(post => ({
                ID: post.id,
                title: post.title,
                stock: 50 // Default stock
            }));

            // 4. Your existing Programmatic check:
            if (req.user.is('Admin')) {
                console.log('🛡️ Admin access detected: Logging sensitive stock details...');
            } else {
                console.log('👤 Viewer access: Hiding internal notes.');
                items.forEach(item => item.title += ' (Public View)');
            }

            return items;

        } catch (error) {
            console.error('❌ Error:', error.message);
            req.error(500, `Connectivity Error: ${error.message}`);
        }
    });
};