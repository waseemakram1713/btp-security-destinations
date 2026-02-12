const cds = require('@sap/cds');

module.exports = async (srv) => {
    // 1. Connect to the external service
    const api = await cds.connect.to('RemoteService');

    // NEW: JWT / Service-to-Service Inspection Helper
    srv.before('READ', 'Products', (req) => {
        // Simulate checking for a Bearer Token in the headers
        const authHeader = req.http?.req?.headers.authorization;
        if (authHeader && authHeader.startsWith('Basic aW50ZXJuYWwtdG9vbDo=')) { // Base64 for internal-tool
            console.log('🎫 System-to-Service call detected via Technical User.');
        }
    });

    srv.on('READ', 'Products', async (req) => {
        try {
            console.log(`🔍 Request by: ${req.user.id} | Roles: ${req.user.roles}`);
            console.log('🔗 Calling Destination: my-external-api...');
            
            const response = await api.get('/posts'); 

            const items = response.map(post => ({
                ID: post.id,
                title: post.title,
                stock: 50 
            }));

            // UPDATED: Logic for Admin, Viewer, AND System/Service roles
            if (req.user.is('Admin')) {
                console.log('🛡️ Admin: Full Access Granted.');
            } else if (req.user.is('SystemAPI')) {
                console.log('⚙️ System-to-Service: Returning raw data for processing.');
                // System users often get the data without "Public View" formatting
            } else {
                console.log('👤 Viewer: Applying data masking.');
                items.forEach(item => item.title += ' (Public View)');
                // Security: Hide stock for casual viewers
                items.forEach(item => delete item.stock);
            }

            return items;

        } catch (error) {
            console.error('❌ Error:', error.message);
            req.error(500, `Connectivity Error: ${error.message}`);
        }
    });
};