module.exports = function(sequelize, DataTypes){
    var about_ganmack = sequelize.define("about_ganmack",{
        no : { field: 'no', type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
        nickname : { field: 'nickname', type: DataTypes.STRING() },
        content : { field: 'content', type: DataTypes.STRING() },
        user_no : { field: 'user_no', type: DataTypes.INTEGER() },
        reg_date: { field: 'reg_date', type: DataTypes.DATE()},
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
        tableName: 'about_ganmack'
    });
    return about_ganmack;
};

