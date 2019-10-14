const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },
  async signup(parent, args, ctx, info) {
    // lowercase email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);

    // create user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //create jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set jtw as cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 // 2 month
    });
    //return user to browser
    return user;
  }
};

module.exports = Mutations;
