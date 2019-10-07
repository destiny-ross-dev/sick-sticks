const Mutations = {
  async createItem(parent, args, ctx, info) {
    //todo check if logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );

    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // copy updates
    const updates = { ...args };
    // remove id from updates
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    // find item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // check if own item or have permissions to delete
    // delete

    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
