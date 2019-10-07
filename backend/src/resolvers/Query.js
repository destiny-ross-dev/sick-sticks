const { forwardTo } = require("prisma-binding");

const Query = {
  // async items(parent, args, ctx, info) {
  //   const itemsList = await ctx.db.query.items();
  //   return itemsList;
  // }
  items: forwardTo("db"),
  item: forwardTo("db")
};

module.exports = Query;
