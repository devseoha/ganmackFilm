module.exports = function(sequelize, DataTypes){
    var user = sequelize.define("user",{
        no : { field: 'no', type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
        id : { field: 'id', type: DataTypes.STRING() },
        password : { field: 'password', type: DataTypes.STRING() },
        token : { field: 'token', type: DataTypes.STRING() },
        last_login_date: { field: 'last_login_date', type: DataTypes.DATE()},
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'user'
    });
    return user;
};

