module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Category,
      { foreignKey: 'userId', as: 'users'});
  };

  // BlogPost.associate = (models) => {
  //   BlogPost.belongsToMany(models.Category,
  //     { foreignKey: 'userId', as: 'users'});
  // };

  return BlogPost;
};