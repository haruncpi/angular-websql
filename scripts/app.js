var myApp = angular.module("myApp", ["ngWebSql", "ui.router"]);
myApp.constant("DB_CONFIG", {
    name: "angular_websql",
    logging: true,
    tables: [{
        name: "todos",
        columns: [{
            name: "id",
            type: "INTEGER",
            is_null: false
        }, {
            name: "task",
            type: "TEXT",
            is_null: false
        }, {
            name: "status",
            type: "BOOLEAN",
            is_null: false
        }],
        primary_key: ["id"]
    }]
});

myApp.run( function( $db, DB_CONFIG ){
    // initialize the database
    $db
        .init( DB_CONFIG )
        .then( function() {
            console.log( "database ready" );
        } )
    return;
});