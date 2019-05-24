/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    var db;
    var dbName = 'petstore_demo';
    var dbPath = 'fs://petstore_demo.db';
    var tableName = 'shoppingCart';

    u.init = function(){
        if(db){
            return;
        }
        db = api.require("db");
    };

    u.open = function(){
        u.init();
        var ret = db.openDatabaseSync({
            name: dbName,
            path: dbPath
        });
        if(ret.status){
            db.executeSqlSync({
                name: dbName,
                sql: 'CREATE TABLE ' + tableName + '(wareId VARCHAR(32),wareCount INT)'
            });
        }
    }

    u.select = function(wareId_){
        u.init();
        var sql = 'SELECT * FROM ' + tableName;
        if(wareId_){
            sql = 'SELECT * FROM ' + tableName + ' WHERE wareId=\"' + wareId_ + '\"';
        }
        return db.selectSqlSync({
            name: dbName,
            sql: sql
        });
    }

    u.update = function(wareId_, wareCount_){
        u.init();
        return db.executeSqlSync({
            name: dbName,
            sql: 'UPDATE ' + tableName + ' SET wareCount=' + wareCount_ + ' WHERE wareId=\"' + wareId_ + '\"'
        });
    }

    u.insert = function(wareId_, wareCount_){
        u.init();
        return db.executeSqlSync({
            name: dbName,
            sql: 'INSERT INTO ' + tableName + '(wareId,wareCount) VALUES(\"' + wareId_ + '\",' + wareCount_ + ')'
        });
    }

    window.$db = u;

})(window);
