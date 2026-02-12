using { my.project as my } from '../db/schema';

@requires: 'authenticated-user'
service CatalogService {
    entity Products as projection on my.Products;
}