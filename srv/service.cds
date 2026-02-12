using { my.project as my } from '../db/schema';

service CatalogService {
    @restrict: [
        { grant: 'READ', to: 'Viewer' },
        { grant: '*',    to: 'Admin'  }
    ]
    entity Products as projection on my.Products;
}